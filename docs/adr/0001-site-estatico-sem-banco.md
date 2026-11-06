# ADR 0001 — Site estático, PWA, sem banco de dados

Data: 2026-11-06 · Status: aceita

## Contexto

O objetivo é distribuir o catálogo animado para praticantes de jiu-jitsu, na web e no celular.
O conteúdo (técnicas, fases, textos) muda pouco e é escrito por nós.

## Decisão

1. **Sem backend e sem banco de dados.** O conteúdo vive no repositório, versionado em git, como
   arquivos de dados JS. Revisão de conteúdo acontece por pull request.
2. **Estado do usuário fica no aparelho** (`localStorage`): técnicas estudadas, favoritas,
   velocidade preferida. Não há conta, login nem dado pessoal coletado.
3. **PWA** (manifest + service worker) para instalar no celular e funcionar offline no tatame.
4. **Hospedagem no GitHub Pages**, publicada por GitHub Actions a cada merge na `main`.

## Consequências

- Custo zero, nada para operar, sem LGPD a gerir.
- Progresso não sincroniza entre aparelhos.

## Quando revisitar

Adicionar backend (ex.: Supabase/Postgres) só se surgir uma destas necessidades:
sincronizar progresso entre aparelhos, contas de professor com turmas, comentários ou
conteúdo enviado por usuários.
