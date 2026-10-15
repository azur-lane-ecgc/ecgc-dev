#!/usr/bin/env bash

# Runs the public website E2E flow with an isolated Astro dev server.
# The run records a local MP4 and reads no private configuration.
set -Eeuo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
work_directory=""
dev_server_pid=""
recording_started=0
browser_session="ecgc-website-e2e-$$"
agent_browser_binary=""
base_url=""

fail_website_e2e() {
  printf 'Website E2E failure: %s\n' "$1" >&2
  exit 1
}

stop_isolated_dev_server() {
  if [[ -n "$dev_server_pid" ]] && kill -0 "$dev_server_pid" 2>/dev/null; then
    local child_pid wait_count=0
    while read -r child_pid; do
      kill -TERM "$child_pid" 2>/dev/null || true
    done < <(pgrep -P "$dev_server_pid" 2>/dev/null || true)

    kill -TERM "$dev_server_pid" 2>/dev/null || true
    while kill -0 "$dev_server_pid" 2>/dev/null && ((wait_count < 30)); do
      sleep 0.1
      wait_count=$((wait_count + 1))
    done

    while read -r child_pid; do
      kill -KILL "$child_pid" 2>/dev/null || true
    done < <(pgrep -P "$dev_server_pid" 2>/dev/null || true)
    kill -KILL "$dev_server_pid" 2>/dev/null || true
    wait "$dev_server_pid" 2>/dev/null || true
  fi
  dev_server_pid=""
}

cleanup_website_e2e() {
  local exit_code=$?
  trap - EXIT INT TERM

  if [[ "$recording_started" == "1" && -n "$agent_browser_binary" ]]; then
    "$agent_browser_binary" record stop >/dev/null 2>&1 || true
    recording_started=0
  fi

  if [[ -n "$agent_browser_binary" ]]; then
    "$agent_browser_binary" close >/dev/null 2>&1 || true
  fi

  stop_isolated_dev_server

  if [[ -n "$work_directory" && -d "$work_directory" ]]; then
    rm -rf "$work_directory"
  fi

  exit "$exit_code"
}
trap cleanup_website_e2e EXIT INT TERM

copy_local_agent_browser() {
  local operating_system machine_architecture source_binary
  operating_system="$(uname -s)"
  machine_architecture="$(uname -m)"

  case "${operating_system}:${machine_architecture}" in
    Darwin:arm64) machine_architecture="darwin-arm64" ;;
    Darwin:x86_64) machine_architecture="darwin-x64" ;;
    Linux:arm64|Linux:aarch64) machine_architecture="linux-arm64" ;;
    Linux:x86_64) machine_architecture="linux-x64" ;;
    *) fail_website_e2e "unsupported platform for local agent-browser" ;;
  esac

  source_binary="$repo_root/packages/image-downloader/node_modules/agent-browser/bin/agent-browser-$machine_architecture"
  [[ -f "$source_binary" ]] || fail_website_e2e "local agent-browser binary is missing; run bun install"

  agent_browser_binary="$work_directory/agent-browser"
  cp "$source_binary" "$agent_browser_binary"
  chmod 700 "$agent_browser_binary"
}

choose_isolated_dev_server_port() {
  local candidate attempt
  for attempt in $(seq 1 100); do
    candidate=$((20000 + RANDOM % 20000))
    if ! lsof -nP -iTCP:"$candidate" -sTCP:LISTEN >/dev/null 2>&1; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  fail_website_e2e "could not find a free isolated dev-server port"
}

start_isolated_dev_server() {
  local dev_server_port dev_server_log wait_attempt
  dev_server_port="$(choose_isolated_dev_server_port)"
  base_url="http://127.0.0.1:$dev_server_port"
  dev_server_log="$work_directory/dev-server.log"

  (
    cd "$repo_root"
    exec bun --filter frontend dev -- --host 127.0.0.1 --port "$dev_server_port" --ignore-lock
  ) >"$dev_server_log" 2>&1 &
  dev_server_pid=$!

  for wait_attempt in $(seq 1 120); do
    if ! kill -0 "$dev_server_pid" 2>/dev/null; then
      fail_website_e2e "isolated dev server exited before becoming ready"
    fi
    if curl --silent --fail --max-time 1 "$base_url/" >/dev/null 2>&1; then
      printf 'Isolated dev server ready on port %s.\n' "$dev_server_port"
      return 0
    fi
    sleep 0.5
  done

  fail_website_e2e "isolated dev server did not become ready"
}

browser_command() {
  "$agent_browser_binary" "$@"
}

assert_browser_condition() {
  local condition_name="$1" javascript="$2" result
  result="$(browser_command eval "$javascript" 2>/dev/null)" || fail_website_e2e "$condition_name"
  case "$result" in
    true|'"true"') ;;
    *) fail_website_e2e "$condition_name" ;;
  esac
}

open_website_route() {
  local route_path="$1"
  browser_command open "$base_url$route_path" >/dev/null
  browser_command wait --load networkidle >/dev/null
  sleep 0.25
}

scroll_website_route_to_footer() {
  local scroll_steps scroll_index scroll_count_text settle_attempt reached_footer
  scroll_count_text="$(browser_command eval "Math.ceil(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) / 1600)")"
  scroll_steps="${scroll_count_text//[^0-9]/}"
  [[ "$scroll_steps" =~ ^[0-9]+$ ]] || fail_website_e2e "could not calculate page height"
  ((scroll_steps > 0 && scroll_steps <= 80)) || fail_website_e2e "page height is outside the tested range"

  for scroll_index in $(seq 1 "$scroll_steps"); do
    browser_command scroll down 1600 >/dev/null
    sleep 0.08
  done

  for settle_attempt in $(seq 1 6); do
    browser_command eval "(() => {
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.scrollBehavior = 'auto'
      window.scrollTo(0, document.documentElement.scrollHeight)
      return true
    })()" >/dev/null
    sleep 0.2
    reached_footer="$(browser_command eval "window.innerHeight + window.scrollY + 2 >= document.documentElement.scrollHeight")"
    if [[ "$reached_footer" == true || "$reached_footer" == '"true"' ]]; then
      return 0
    fi
  done

  fail_website_e2e "page did not settle at its footer"
}

verify_website_route() {
  local route_path="$1" expected_text="$2"
  printf 'Checking route %s\n' "$route_path"
  open_website_route "$route_path"

  assert_browser_condition \
    "route metadata and layout for $route_path" \
    "(() => {
      const hasTitle = document.title.trim().length > 0
      const hasDescription = Boolean(document.querySelector('meta[name=\"description\"]'))
      const hasCanonical = Boolean(document.querySelector('link[rel=\"canonical\"]'))
      const hasMainHeading = Boolean(document.querySelector('h1, h2, h3'))
      const hasExpectedText = document.body.textContent.includes('$expected_text')
      const hasHorizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth
      const brokenImages = [...document.images].filter(image => image.complete && image.naturalWidth === 0).length
      const invalidLinks = [...document.querySelectorAll('a[href]')].filter(link => {
        const href = link.getAttribute('href')
        return href === 'undefined' || href === 'null' || href === ''
      }).length
      return hasTitle && hasDescription && hasCanonical && hasMainHeading && hasExpectedText &&
        !hasHorizontalOverflow && brokenImages === 0 && invalidLinks === 0
    })()"

  scroll_website_route_to_footer

  assert_browser_condition \
    "full-page scroll and lazy images for $route_path" \
    "(() => {
      const documentElement = document.documentElement
      const reachedFooter = window.innerHeight + window.scrollY + 2 >= documentElement.scrollHeight
      const brokenImages = [...document.images].filter(image => image.complete && image.naturalWidth === 0).length
      return reachedFooter && brokenImages === 0
    })()"
}

select_combobox_option() {
  local combobox_name="$1" option_name="$2" option_marker="$3"
  browser_command click "[id='${combobox_name}_input']" >/dev/null
  sleep 0.2

  assert_browser_condition \
    "combobox option $option_name exists" \
    "(() => {
      const searchInput = document.getElementById('${combobox_name}ComboBoxDesktop')
      const optionContainer = searchInput ? searchInput.nextElementSibling : null
      const options = optionContainer ? [...optionContainer.children] : []
      const option = options.find(item => item.textContent.trim().startsWith('$option_name'))
      option?.setAttribute('data-e2e-option', '$option_marker')
      return Boolean(option)
    })()"

  browser_command click "[data-e2e-option='$option_marker']" >/dev/null
  sleep 0.3
}

mark_ranking_sort_direction() {
  assert_browser_condition \
    "ranking sort direction control exists" \
    "(() => {
      const directionButton = [...document.querySelectorAll('button')]
        .find(button => ['↑', '↓'].includes(button.textContent.trim()))
      directionButton?.setAttribute('data-e2e-option', 'ranking-direction')
      return Boolean(directionButton)
    })()"
}

set_ranking_sort_direction() {
  local wanted_direction="$1" current_direction
  mark_ranking_sort_direction
  current_direction="$(browser_command eval "[...document.querySelectorAll('button')].find(button => ['↑', '↓'].includes(button.textContent.trim()))?.textContent.trim()")"
  current_direction="${current_direction//[^↑↓]/}"
  if [[ "$current_direction" != "$wanted_direction" ]]; then
    browser_command click "[data-e2e-option='ranking-direction']" >/dev/null
    sleep 0.6
  fi
}

verify_common_resource_interactions() {
  printf 'Checking Common Resource modal and filters\n'
  open_website_route /common_resource/
  sleep 0.5

  browser_command click '[aria-label="Open modal for Coins"]' >/dev/null
  browser_command wait '[role="dialog"]' >/dev/null
  assert_browser_condition \
    "Common Resource modal opens" \
    "(() => {
      const dialog = document.querySelector('[role=\"dialog\"]')
      return Boolean(dialog && dialog.textContent.includes('Coins'))
    })()"
  browser_command click '[role="dialog"] button' >/dev/null
  sleep 0.3

  select_combobox_option Category Currency currency
  select_combobox_option Timeframe Daily daily-timeframe
  assert_browser_condition \
    "Common Resource currency and daily filters update values" \
    "(() => {
      const category = document.querySelector('[id=\"Category_input\"]')?.textContent
      const timeframe = document.querySelector('[id=\"Timeframe_input\"]')?.textContent
      const resourceText = [...document.querySelectorAll('[role=\"button\"]')].map(button => button.textContent).join(' ')
      return category === 'Currency' && timeframe === 'Daily' && resourceText.includes('12436 / Day')
    })()"
}

verify_samvaluation_interactions() {
  printf 'Checking Samvaluation modal, filters, and sorting\n'
  open_website_route /samvaluation/
  sleep 0.8

  printf 'Waiting for Samvaluation modal trigger\n'
  browser_command wait '[aria-label="Open modal for Universal Bulin"]' >/dev/null
  printf 'Opening Samvaluation modal\n'
  browser_command find role button click --name 'Open modal for Universal Bulin' >/dev/null
  browser_command wait '[role="dialog"]' >/dev/null
  assert_browser_condition \
    "Samvaluation ship modal opens" \
    "(() => {
      const dialog = document.querySelector('[role=\"dialog\"]')
      return Boolean(dialog && dialog.textContent.includes('Universal Bulin'))
    })()"
  browser_command click '[role="dialog"] button' >/dev/null
  sleep 0.3

  printf 'Selecting Samvaluation fleet and ranking filters\n'
  select_combobox_option 'Fleet Type' 'Main Fleet' main-fleet
  select_combobox_option 'Ranking Sort' 'Light DMG' light-damage

  printf 'Checking both Samvaluation sort directions\n'
  set_ranking_sort_direction ↓
  assert_browser_condition \
    "descending light damage starts with SS ranks" \
    "(() => {
      const ships = [...document.querySelectorAll('[aria-label^=\"Open modal for \"]')].slice(0, 5)
      return ships.length === 5 && ships.every(ship => ship.textContent.includes('Rank: SS'))
    })()"

  set_ranking_sort_direction ↑
  assert_browser_condition \
    "ascending light damage starts with D ranks" \
    "(() => {
      const ships = [...document.querySelectorAll('[aria-label^=\"Open modal for \"]')].slice(0, 5)
      return ships.length === 5 && ships.every(ship => ship.textContent.includes('Rank: D'))
    })()"

  browser_command fill 'input[placeholder="Base Name ONLY"]' 'Baltimore' >/dev/null
  sleep 0.5
  printf 'Checking Samvaluation name filter\n'
  assert_browser_condition \
    "Samvaluation base-name filter narrows ships" \
    "(() => {
      const ships = [...document.querySelectorAll('[aria-label^=\"Open modal for \"]')]
      return ships.length > 0 && ships.every(ship => ship.getAttribute('aria-label').includes('Baltimore'))
    })()"
  browser_command find text 'Clear Filters' click --exact >/dev/null
  sleep 0.3
}

verify_tools_filter() {
  printf 'Checking Tools category filter\n'
  open_website_route /tools/
  select_combobox_option Category Data tool-data
  assert_browser_condition \
    "Tools Data category filter updates the table" \
    "(() => {
      const category = document.querySelector('[id=\"Category_input\"]')?.textContent
      const tools = [...document.querySelectorAll('tbody tr')].map(row => row.cells[0]?.textContent.trim()).filter(Boolean)
      return category === 'Data' && tools.length >= 10 && tools.includes('AA Sheet')
    })()"
}

verify_mobile_navigation() {
  printf 'Checking mobile navigation dropdowns\n'
  browser_command set viewport 390 844 >/dev/null
  open_website_route /

  browser_command click 'button.md\:hidden' >/dev/null
  sleep 0.2
  assert_browser_condition \
    "mobile navigation controls are visible" \
    "(() => {
      const controls = [...document.querySelectorAll('button.navbar-link.w-full')]
      controls[0]?.setAttribute('data-e2e-option', 'mobile-gameplay')
      controls[1]?.setAttribute('data-e2e-option', 'mobile-resource')
      return controls.length === 2
    })()"

  browser_command click "[data-e2e-option='mobile-gameplay']" >/dev/null
  sleep 0.3
  assert_browser_condition \
    "mobile Gameplay dropdown lists guide routes" \
    "(() => {
      const visibleLinks = [...document.querySelectorAll('a')].filter(link => link.offsetParent !== null).map(link => link.getAttribute('href'))
      const requiredRoutes = ['early_ship_recommendations', 'equipment', 'farming', 'fleetbuilding', 'fleet_technology', 'research', 'samvaluation']
      return requiredRoutes.every(route => visibleLinks.includes(route))
    })()"

  browser_command click "[data-e2e-option='mobile-resource']" >/dev/null
  sleep 0.3
  assert_browser_condition \
    "mobile Resource dropdown lists resource routes" \
    "(() => {
      const visibleLinks = [...document.querySelectorAll('a')].filter(link => link.offsetParent !== null).map(link => link.getAttribute('href'))
      const requiredRoutes = ['common_resource', 'shop_priority', 'tools']
      return requiredRoutes.every(route => visibleLinks.includes(route))
    })()"
}

main() {
  local video_path video_relative_path

  [[ -x "$(command -v bun)" ]] || fail_website_e2e "bun is not installed"
  [[ -x "$(command -v curl)" ]] || fail_website_e2e "curl is not installed"
  [[ -x "$(command -v lsof)" ]] || fail_website_e2e "lsof is not installed"
  [[ -x "$(command -v pgrep)" ]] || fail_website_e2e "pgrep is not installed"

  work_directory="$(mktemp -d "${TMPDIR:-/tmp}/ecgc-website-e2e.XXXXXX")"
  copy_local_agent_browser
  export AGENT_BROWSER_SESSION="$browser_session"

  video_relative_path=".agents/evidence/e2e/website-$(date +%Y%m%d-%H%M%S)-$$.mp4"
  video_path="$repo_root/$video_relative_path"
  mkdir -p "$(dirname "$video_path")"
  git -C "$repo_root" check-ignore -q "$video_relative_path" ||
    fail_website_e2e "recording directory is not ignored by Git"

  start_isolated_dev_server

  browser_command set viewport 1920 1080 >/dev/null
  browser_command open "$base_url/" >/dev/null
  browser_command wait --load networkidle >/dev/null
  browser_command record start "$video_path" "$base_url/" --fps 10 >/dev/null
  recording_started=1
  browser_command set viewport 1920 1080 >/dev/null
  sleep 0.5

  local website_routes=(
    '/|Azur Lane'
    '/changelog/|Changelog'
    '/changelog/2023/|2023'
    '/changelog/2024/|2024'
    '/changelog/2025/|2025'
    '/changelog/2026/|2026'
    '/common_resource/|Common Resource'
    '/contributors/|Contributors'
    '/early_ship_recommendations/|Early Ship'
    '/equipment/|Equipment'
    '/farming/|Farming'
    '/fleet_technology/|Fleet Technology'
    '/fleetbuilding/|Fleetbuilding'
    '/newbie_tips/|Newbie Tips'
    '/research/|Research'
    '/samvaluation/|Samvaluation'
    '/shop_priority/|Shop Priority'
    '/tools/|Tools'
  )

  local route_entry route_path expected_text
  for route_entry in "${website_routes[@]}"; do
    route_path="${route_entry%%|*}"
    expected_text="${route_entry#*|}"
    verify_website_route "$route_path" "$expected_text"
  done

  verify_common_resource_interactions
  verify_samvaluation_interactions
  verify_tools_filter
  verify_mobile_navigation

  local page_errors
  browser_command console --json >"$work_directory/browser-console.json" 2>/dev/null
  E2E_BROWSER_CONSOLE_JSON="$work_directory/browser-console.json" bun -e '
    const fs = require("node:fs")
    const payload = JSON.parse(fs.readFileSync(process.env.E2E_BROWSER_CONSOLE_JSON, "utf8"))
    const messages = payload.data?.messages ?? []
    const hasDisallowedMessage = messages.some(message => message.type === "warning" || message.type === "error")
    process.exit(hasDisallowedMessage ? 1 : 0)
  ' || fail_website_e2e "browser console has warnings or errors"
  page_errors="$(browser_command errors 2>/dev/null)"
  [[ -z "$page_errors" ]] || fail_website_e2e "browser has page errors"

  browser_command record stop >/dev/null
  recording_started=0
  [[ -s "$video_path" ]] || fail_website_e2e "recording is empty"

  browser_command close >/dev/null
  stop_isolated_dev_server
  rm -rf "$work_directory"
  work_directory=""

  printf 'Website E2E passed.\n'
  printf 'Local recording: %s\n' "$video_relative_path"
}

main "$@"
