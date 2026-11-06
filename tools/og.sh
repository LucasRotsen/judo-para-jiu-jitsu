#!/bin/bash
# Gera site/og/<id>.png (1200x630) para prévias de compartilhamento. Uso: tools/og.sh [chrome]
set -euo pipefail
DIR=$(cd "$(dirname "$0")/.." && pwd)
CHROME=${1:-${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}}
mkdir -p "$DIR/site/og"
IDS=$(python3 -c "import sys;sys.path.insert(0,'$DIR/tools');import build;print(' '.join(t for t,_ in build.CATALOG))")
for ID in index $IDS; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$(mktemp -d)" \
    --window-size=1200,630 --virtual-time-budget=5000 \
    --screenshot="$DIR/site/og/$ID.png" "file://$DIR/tools/og.html#$ID" 2>/dev/null
  echo "og/$ID.png"
done
