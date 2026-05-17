#!/usr/bin/env bash
set -euo pipefail

node "$(dirname "$0")/scripts/install.mjs" "$@"
