#!/bin/bash
# open-link.sh

if [ -z "$1" ]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

URL="$1"

if command -v open &>/dev/null; then
  open $URL
elif command -v xdg-open &>/dev/null; then
  xdg-open $URL
elif command -v start &>/dev/null; then
  start $URL
else
  echo "No suitable command to open the browser found."
fi
