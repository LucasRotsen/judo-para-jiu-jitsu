# Lessons

## 2026-11-06 — Sankaku jime ilegível em 2D
- Erro: aceitei uma técnica cuja mecânica acontece em profundidade (triângulo: canela atravessando a nuca, figura-4 das pernas) num rig 2D de perfil. O fork relatou "joelho cobre a cabeça" e eu publiquei mesmo assim.
- Regra: antes de animar, perguntar "a ação principal acontece no plano da câmera?". Se não, usar o motor 3D com múltiplos ângulos, ou não incluir a técnica.
- Regra: fraquezas visuais relatadas por subagentes que atingem o *ponto principal* da técnica bloqueiam a publicação; só fraquezas periféricas podem ir para o relatório.

## 2026-11-06 — Merge antes da CI registrar
- Erro: `gh pr checks --watch && gh pr merge` fez merge quando a CI ainda não tinha aparecido ("no checks reported" não falha o `&&` como esperado).
- Regra: esperar explicitamente até existir um check com `pass` (`until gh pr checks N | grep -q pass`) antes de mergear.

## 2026-11-06 — `[hidden]` vencido por `display`
- Erro: `.tcard{display:grid}` anulava o atributo `hidden`; o filtro do índice nunca funcionou e ninguém viu porque não havia teste.
- Regra: todo controle de UI que esconde/mostra coisas ganha um teste de visibilidade; CSS base tem `[hidden]{display:none!important}`.

## 2026-11-06 — CI travando no apt
- Erro: `playwright install --with-deps` trava às vezes no apt do runner; cache dos browsers não resolve porque o apt continua rodando.
- Regra: rodar Playwright no container oficial `mcr.microsoft.com/playwright:<versão>` com a mesma versão do package.json.

## 2026-11-06 — Arquivos gerados em PRs paralelos
- Erro: rebase automático de PRs paralelos duplicou uma entrada do `catalog.js` (cada fork já trazia a do outro).
- Regra: ao resolver conflito em lista de dados, deduplicar por id; o teste "catálogo e arquivos batem" é a rede de segurança. `index.html`/`sw.js` nunca se resolvem à mão: regenerar com `tools/build.py`.

## 2026-11-06 — Prioridade em regras do simulador
- Erro: empate de pontuação deixou o "upa" acima de "defender o estrangulamento" com as duas golas presas.
- Regra: toda situação de perigo imediato (estrangulamento, chave encaixada) tem pontuação estritamente maior que qualquer ataque/fuga; cada situação clássica ganha um caso em `tests/simulador.spec.js`.
