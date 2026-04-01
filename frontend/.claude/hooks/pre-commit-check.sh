#!/bin/bash
# Pre-commit hook: runs lint-staged checks before Claude commits changes
# This mirrors the Husky pre-commit setup in .lintstagedrc

set -e

echo "Running lint-staged checks..."
npx lint-staged

echo "Pre-commit checks passed."
