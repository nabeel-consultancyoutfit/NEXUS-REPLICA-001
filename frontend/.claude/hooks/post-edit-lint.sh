#!/bin/bash
# Post-edit hook: lints and type-checks the file that was just edited
# Usage: ./post-edit-lint.sh <filepath>

set -e

FILE=$1

if [ -z "$FILE" ]; then
  echo "No file specified. Skipping lint."
  exit 0
fi

echo "Linting: $FILE"
npx eslint "$FILE" --fix --max-warnings=0

echo "Type checking..."
npx tsc --noEmit

echo "Post-edit checks passed for: $FILE"
