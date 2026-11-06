#!/bin/bash
# Uso: tools/floorcheck.sh <id> <t1,...> — lista joelhos/cotovelos/mãos/pés abaixo do tatame (y < 0.02)
DIR=$(cd "$(dirname "$0")/.." && pwd)
"$DIR/tools/probe.sh" "$1" "$2" | awk '/^t=/{t=$1} /^(tori|uke)/{w=$1} /^  (leg|arm)/{split($5,e,",");split($7,h,",");
 if(e[2]<0.02) print t, w, $1, "E", $5; if(h[2]<0.02) print t, w, $1, "H", $7}'
