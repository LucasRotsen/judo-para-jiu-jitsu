#!/bin/bash
# Uso: tools/sheet.sh <id> <t1,t2,...> [saida.png] [params extras: annot=0&w=600&cols=3&view=x0,y0,w,h]
DIR=$(cd "$(dirname "$0")/.." && pwd)
ID=$1; TS=$2; OUT=${3:-$DIR/out/$ID.png}; EXTRA=$4
N=$(echo "$TS" | tr ',' '\n' | wc -l | tr -d ' ')
W=$(echo "$EXTRA" | sed -n 's/.*w=\([0-9]*\).*/\1/p'); W=${W:-600}
COLS=$(echo "$EXTRA" | sed -n 's/.*cols=\([0-9]*\).*/\1/p'); COLS=${COLS:-3}
case "$EXTRA" in *views=1*) N=$((N*3));; esac
ROWS=$(( (N + COLS - 1) / COLS ))
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$(mktemp -d)" \
  --window-size=$((W*COLS)),$((ROWS*W*2/3 + 10)) --virtual-time-budget=3000 \
  --screenshot="$OUT" "file://$DIR/tools/sheet.html#id=$ID&t=$TS&$EXTRA" 2>/dev/null
echo "$OUT"
