#!/bin/bash
# open-link.sh


URL="http://localhost:4321/test_ecgc_2/"

if command -v open &>/dev/null; then
  open $URL
elif command -v xdg-open &>/dev/null; then
  xdg-open $URL
elif command -v start &>/dev/null; then
  start $URL
else
  echo "No suitable command to open the browser found."
fi
