#!/bin/bash
# Maiores problemas de movimento em todas as técnicas. Uso: tools/top.sh [segundos mínimos] [categorias]
node "$(dirname "$0")/diagnostico.js" -v | python3 -c "
import sys,re
mn=float(sys.argv[1]) if len(sys.argv)>1 else .5; cats=(sys.argv[2] if len(sys.argv)>2 else 'cruza,erro,salto').split(',')
cur='';rows=[]
for l in sys.stdin:
    if l.startswith('TOTAL'): print(l.strip())
    if not l.startswith(' '): cur=l.split()[0]; continue
    m=re.search(r'\(([\d.]+)s\)',l)
    if m and l.split()[0] in cats and float(m.group(1))>=mn: rows.append((float(m.group(1)),cur,l.strip()[:118]))
for d,c,l in sorted(rows,reverse=True)[:60]: print(c[:14].ljust(15),l)
" "$@"
