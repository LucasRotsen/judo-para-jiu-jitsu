#!/bin/bash
# Uso: tools/probe.sh <id> <t1,t2,...>  — imprime posições 3D das articulações (técnicas 3D)
DIR=$(cd "$(dirname "$0")/.." && pwd)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --user-data-dir="$(mktemp -d)" --disable-gpu \
  --virtual-time-budget=2000 --dump-dom "file://$DIR/tools/probe.html#id=$1&t=$2" 2>/dev/null \
  | sed -n '/<pre id="o">/,/<\/pre>/p' | sed 's/<[^>]*>//g'
