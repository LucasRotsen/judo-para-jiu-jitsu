/* Contratos de técnica: o que TEM que ser verdade no movimento, em partes do corpo, conferido quadro a quadro.
   Os medidores de diagnostico.js dizem se algo atravessa; não dizem se a técnica é a técnica.
   Cada técnica declara `contratos:[...]` (dados puros; o motor ignora). Regras:
     {c:'contato', a:'T.joelhoR', b:'U.peito', s, e, tol=.04, frac=.8}   a encosta em b (folga ≤ tol) em ≥ frac dos quadros
     {c:'longe',   a, b, s, e, min=.10, frac=1}                          a fica a ≥ min de b
     {c:'lado',    a:'T.cabeca', de:'U.cabeca', lado:'direita'|'esquerda'|'frente'|'tras'|'acima'|'abaixo', s, e, min=0, frac=.9}
                                                                         a está daquele lado de `de`, nos eixos do dono de `de`
     {c:'giro',    a:'T.cabeca', centro:'U.quadril', s, e, volta=25}      a gira em volta do centro (visto de cima) sem voltar mais que `volta` graus
   E uma regra que vale para toda técnica, sem declarar: ninguém fica de ponta-cabeça com a cabeça perto do chão (pilão).
     {c:'pilao', cabeca:.38, txt}  exceção declarada (limite de altura da cabeça menor), com o motivo
   Partes: cabeca pescoco peito barriga tronco quadril, e com lado R/L: ombro coxa joelho canela pe braco cotovelo antebraco mao.
   Uso: node tools/contratos.js [-v] [--portao] [id ...]
        node tools/contratos.js --historico   (erros já apontados pelo usuário, em versões antigas do git, têm que falhar) */
const fs = require('fs'), path = require('path'), vm = require('vm'), os = require('os'), { execSync } = require('child_process');
const RAIZ = path.join(__dirname, '..');

function carregar(assets, assado = false) {
  const ctx = { window: {}, atob, console: { ...console, log() {}, warn() {} } }; ctx.window.window = ctx.window; vm.createContext(ctx);
  const run = (f) => vm.runInContext(fs.readFileSync(path.join(assets, f), 'utf8'), ctx, { filename: f });
  ctx.matchMedia = () => ({ matches: false }); ctx.document = {}; ctx.location = { hash: '' };
  vm.runInContext('var Judo;', ctx);
  run('catalog.js'); vm.runInContext('var JUDO_CATALOG=window.JUDO_CATALOG;', ctx);
  run('engine.js'); vm.runInContext('Judo=window.Judo;', ctx); run('engine3d.js'); run('fisica.js');
  for (const f of fs.readdirSync(path.join(assets, 'tecnicas'))) run('tecnicas/' + f);
  /* --assado: usa as poses já assadas (o build acabou de gerá-las); sem isso, assa em memória (lento, sempre fresco) */
  if (assado) for (const f of fs.readdirSync(path.join(assets, 'assado'))) if (f !== 'capas.js') run('assado/' + f);
  ctx.window.Judo.__vm = ctx; /* para ferramentas que recarregam uma técnica alterada no mesmo contexto */
  return ctx.window.Judo;
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const len = (a) => Math.hypot(a[0], a[1], a[2]), lerp = (a, b, k) => add(a, mul(sub(b, a), k));
function segDist(p1, q1, p2, q2) {
  const d1 = sub(q1, p1), d2 = sub(q2, p2), r = sub(p1, p2), a = dot(d1, d1), e = dot(d2, d2), f = dot(d2, r);
  if (a < 1e-12 && e < 1e-12) return len(r);
  let s, t; const c = dot(d1, r), bb = dot(d1, d2), den = a * e - bb * bb;
  if (a < 1e-12) { s = 0; t = Math.min(1, Math.max(0, f / e)); }
  else if (e < 1e-12) { t = 0; s = Math.min(1, Math.max(0, -c / a)); }
  else { s = den > 1e-9 ? Math.min(1, Math.max(0, (bb * f - c * e) / den)) : 0;
    t = (bb * s + f) / e; if (t < 0) { t = 0; s = Math.min(1, Math.max(0, -c / a)); } else if (t > 1) { t = 1; s = Math.min(1, Math.max(0, (bb - c) / a)); } }
  return len(sub(add(p1, mul(d1, s)), add(p2, mul(d2, t))));
}

/* parte do corpo → [ponta a, ponta b, raio] (ponto quando a = b) */
const LADOS = { R: 'R', L: 'L' };
function parte(F, nome) {
  const m = /^([TU])\.([a-z]+?)([RL])?$/.exec(nome); if (!m) throw new Error('parte inválida: ' + nome);
  const o = F[m[1] === 'T' ? 'tori' : 'uke'], k = m[2], s = m[3], meio = lerp(o.sh, o.hip, .45);
  const P = (p, r) => [p, p, r], S = (a, b, r) => [a, b, r];
  const lado = () => { if (!LADOS[s]) throw new Error(`${nome}: falta o lado (R/L)`); return s; };
  switch (k) {
    case 'cabeca': return P(o.head, .11);
    case 'pescoco': return S(o.neck, lerp(o.neck, o.head, .5), .06);
    case 'peito': return S(o.sh, meio, .14);
    case 'barriga': return S(meio, o.hip, .14);
    case 'tronco': return S(o.sh, o.hip, .14);
    case 'quadril': return P(o.hip, .15);
    case 'ombro': return P(o['sh' + lado()], .07);
    case 'coxa': { const l = o['leg' + lado()]; return S(l.root, l.E, .08); }
    case 'joelho': return P(o['leg' + lado()].E, .07);
    case 'canela': { const l = o['leg' + lado()]; return S(l.E, l.H, .055); }
    case 'pe': { const l = o['leg' + lado()]; return S(l.heel, l.toe, .05); }
    case 'braco': { const a = o['arm' + lado()]; return S(a.root, a.E, .055); }
    case 'cotovelo': return P(o['arm' + lado()].E, .05);
    case 'antebraco': { const a = o['arm' + lado()]; return S(a.E, a.H, .045); }
    case 'mao': return P(o['arm' + lado()].H, .05);
  }
  throw new Error('parte desconhecida: ' + nome);
}
const centro = (p) => lerp(p[0], p[1], .5);
const folga = (F, a, b) => { const A = parte(F, a), B = parte(F, b); return segDist(A[0], A[1], B[0], B[1]) - A[2] - B[2]; };
const EIXO = { direita: ['r', 1], esquerda: ['r', -1], frente: ['f', 1], tras: ['f', -1], acima: ['u', 1], abaixo: ['u', -1] };
const dono = (nome) => (nome[0] === 'T' ? 'tori' : 'uke');

const DT = .02;
const tempos = (def, c) => { const s = c.s ?? 0, e = c.e === undefined || c.e === 'fim' ? def.end : c.e, ts = []; for (let t = s; t <= e + 1e-9; t += DT) ts.push(+t.toFixed(4)); return ts; };

/* devolve {ok, valor, pior:{t,v}, txt} */
function avaliar(J, def, c) {
  const ts = tempos(def, c), F = (t) => J.solve(def, t);
  if (c.c === 'contato' || c.c === 'longe') {
    const tol = c.c === 'contato' ? c.tol ?? .04 : c.min ?? .10, frac = c.frac ?? (c.c === 'contato' ? .8 : 1);
    let bons = 0, pior = { t: 0, v: c.c === 'contato' ? -1e9 : 1e9 };
    for (const t of ts) { const g = folga(F(t), c.a, c.b), bom = c.c === 'contato' ? g <= tol : g >= tol; if (bom) bons++;
      if (c.c === 'contato' ? g > pior.v : g < pior.v) pior = { t, v: g }; }
    const f = bons / ts.length;
    return { ok: f >= frac - 1e-9, valor: f, pior, txt: `${(f * 100).toFixed(0)}% dos quadros (exige ${(frac * 100).toFixed(0)}%); ${c.c === 'contato' ? 'maior folga' : 'menor distância'} ${(pior.v * 100).toFixed(0)} cm @${pior.t.toFixed(2)}s` };
  }
  if (c.c === 'lado') {
    const [ax, sg] = EIXO[c.lado], min = c.min ?? 0, frac = c.frac ?? .9; let bons = 0, pior = { t: 0, v: 1e9 };
    for (const t of ts) { const Fr = F(t), o = Fr[dono(c.de)], v = sg * dot(sub(centro(parte(Fr, c.a)), centro(parte(Fr, c.de))), o[ax]);
      if (v >= min) bons++; if (v < pior.v) pior = { t, v }; }
    const f = bons / ts.length;
    return { ok: f >= frac - 1e-9, valor: f, pior, txt: `${(f * 100).toFixed(0)}% dos quadros do lado ${c.lado} (exige ${(frac * 100).toFixed(0)}%); pior ${(pior.v * 100).toFixed(0)} cm @${pior.t.toFixed(2)}s` };
  }
  if (c.c === 'giro') {
    /* ângulo no plano do chão, desdobrado; o sentido é o do saldo; mede o maior recuo contra esse sentido */
    const ang = []; let prev = null, acc = 0;
    for (const t of ts) { const Fr = F(t), p = sub(centro(parte(Fr, c.a)), centro(parte(Fr, c.centro))); let a = Math.atan2(p[2], p[0]) * 180 / Math.PI;
      if (prev !== null) { let d = a - prev; while (d > 180) d -= 360; while (d < -180) d += 360; acc += d; } prev = a; ang.push(acc); }
    const sent = Math.sign(ang[ang.length - 1] - ang[0]) || 1; let ext = ang[0], recuo = 0, tr = ts[0];
    ang.forEach((a, i) => { if (sent * (a - ext) > 0) ext = a; const r = sent * (ext - a); if (r > recuo) { recuo = r; tr = ts[i]; } });
    const volta = c.volta ?? 25;
    return { ok: recuo <= volta, valor: recuo, pior: { t: tr, v: recuo }, txt: `giro de ${Math.abs(ang[ang.length - 1] - ang[0]).toFixed(0)}°, maior volta ${recuo.toFixed(0)}° @${tr.toFixed(2)}s (aceita ${volta}°)` };
  }
  throw new Error('regra desconhecida: ' + c.c);
}

/* regra global: cabeça abaixo de 0,5 m com o tronco mais de 45° de cabeça para baixo (u.y < -0,7) = queda de cabeça.
   A ponte (upa) tem a cabeça no chão e o tronco a ~33°: não conta. */
function pilao(J, def) {
  /* exceção declarada pela técnica: {c:'pilao', cabeca:.38, txt:'por quê'} (projeção de sacrifício: Uke passa invertido
     apoiado no pé de Tori, sem cair de cabeça). Fica visível na lista de contratos. */
  const ex = (def.contratos || []).find((c) => c.c === 'pilao'), lim = ex && ex.cabeca !== undefined ? ex.cabeca : .5;
  const out = [];
  for (const w of ['tori', 'uke']) { let n = 0, pior = { t: 0, v: 0 };
    for (let t = 0; t <= def.end + 1e-9; t += DT) { const o = J.solve(def, t)[w];
      if (o.head[1] < lim && o.u[1] < -.7) { n++; if (-o.u[1] > pior.v) pior = { t, v: -o.u[1] }; } }
    /* 0,1 s de passagem é tolerado (rolamento) */
    if (n * DT > .1) out.push({ txt: `${w === 'tori' ? 'Tori' : 'Uke'} de ponta-cabeça com a cabeça perto do chão por ${(n * DT).toFixed(2)} s (pior @${pior.t.toFixed(2)}s)`, ok: false, pior }); }
  return out;
}

function verificar(J, def, contratos) {
  const res = (contratos || []).filter((c) => c.c !== 'pilao').map((c) => { try { return { c, ...avaliar(J, def, c) }; } catch (e) { return { c, ok: false, txt: 'erro: ' + e.message }; } });
  return res.concat(pilao(J, def).map((r) => ({ c: { c: 'pilao', txt: 'ninguém cai de cabeça' }, ...r })));
}
const rotulo = (c) => c.txt || `${c.c} ${c.a || ''}${c.b ? ' × ' + c.b : ''}${c.de ? ' (' + c.lado + ' de ' + c.de + ')' : ''}${c.centro ? ' em volta de ' + c.centro : ''}`;

/* erros reais já apontados, em versões antigas: o contrato ATUAL da técnica tem que pegar cada um */
const HISTORICO = [
  { id: 'raspagem-de-tesoura', commit: 'a1c33a1', erro: 'canela atravessada no peito em vez do joelho (15/11)' },
  { id: 'kata-gatame', commit: '1f58843', erro: 'cabeça de Tori e desmontada do lado errado (14/11)' },
  { id: 'sankaku-jime', commit: '4ffa025', erro: 'corretor empurrava a perna para longe do pescoço (14/11)' },
  { id: 'omoplata', commit: 'a3de539', erro: 'cabeça de Tori ia até o lado e voltava (15/11)' },
  { id: 'koshi-guruma', commit: 'b0bb766', erro: 'no giro, a cabeça de Uke ia para trás do ombro esquerdo de Tori (20/11)' },
];

function main() {
  const args = process.argv.slice(2), verbose = args.includes('-v'), portao = args.includes('--portao'), only = args.filter((a) => a[0] !== '-');
  const J = carregar(path.join(RAIZ, 'site', 'assets'), args.includes('--assado'));
  if (args.includes('--historico')) {
    let falhas = 0;
    for (const h of HISTORICO) {
      const atual = J.techs[h.id], dir = fs.mkdtempSync(path.join(os.tmpdir(), 'contrato-'));
      execSync(`git archive ${h.commit} site/assets | tar -x -C ${dir}`, { cwd: RAIZ });
      const V = carregar(path.join(dir, 'site', 'assets')), velho = V.techs[h.id];
      const rn = verificar(J, atual, atual.contratos).filter((r) => r.c.c !== 'pilao'), rv = verificar(V, velho, atual.contratos).filter((r) => r.c.c !== 'pilao');
      const atualOk = rn.length && rn.every((r) => r.ok), pegou = rv.some((r) => !r.ok);
      if (!atualOk || !pegou) falhas++;
      console.log(`${pegou && atualOk ? 'ok ' : 'XX '} ${h.id} @${h.commit}: ${h.erro}`);
      console.log(`     atual: ${atualOk ? 'passa' : 'FALHA'} · versão com o erro: ${pegou ? 'pega (' + rv.filter((r) => !r.ok).map((r) => rotulo(r.c)).join('; ') + ')' : 'NÃO PEGA'}`);
      if (verbose) for (const r of rv) console.log(`       ${r.ok ? '·' : '✗'} ${rotulo(r.c)}: ${r.txt}`);
      fs.rmSync(dir, { recursive: true, force: true });
    }
    console.log(falhas ? `${falhas} erro(s) histórico(s) não pegos` : 'todos os erros históricos são pegos pelos contratos');
    process.exit(falhas ? 1 : 0);
  }
  let quebrados = 0, comContrato = 0, n = 0; const falhas = [];
  for (const c of J.CATALOG) {
    const def = J.techs[c.id]; if (!def || !def.is3d || def.trechos || (only.length && !only.includes(c.id))) continue;
    n++; if (def.contratos && def.contratos.length) comContrato++;
    const rs = verificar(J, def, def.contratos), ruins = rs.filter((r) => !r.ok); quebrados += ruins.length;
    for (const r of ruins) falhas.push({ id: c.id, regra: r.c.c === 'pilao' ? 'pilao' : rotulo(r.c) });
    if (ruins.length || verbose) {
      console.log(`${ruins.length ? 'XX ' : 'ok '} ${c.id}`);
      for (const r of verbose ? rs : ruins) console.log(`     ${r.ok ? '·' : '✗'} ${rotulo(r.c)}: ${r.txt}`);
    }
  }
  /* catraca: quedas de cabeça já conhecidas ficam em contratos-pendentes.json até serem corrigidas; nenhuma nova entra */
  const PEND = path.join(__dirname, 'contratos-pendentes.json'), pend = fs.existsSync(PEND) ? JSON.parse(fs.readFileSync(PEND, 'utf8')) : {};
  const novos = falhas.filter((f) => !(pend[f.id] || []).includes(f.regra)), resolvidos = Object.entries(pend).filter(([id]) => !only.length || only.includes(id)).flatMap(([id, rs]) => rs.filter((r) => !falhas.some((f) => f.id === id && f.regra === r)).map((r) => `${id}: ${r}`));
  console.log(`${n} técnicas, ${comContrato} com contrato próprio; ${quebrados} contrato(s) quebrado(s), ${quebrados - novos.length} já pendente(s)`);
  if (resolvidos.length) console.log('resolvido(s), tire de contratos-pendentes.json: ' + resolvidos.join('; '));
  if (portao && (novos.length || resolvidos.length)) process.exit(1);
}
if (require.main === module) main();
module.exports = { carregar, verificar, avaliar, folga, parte };
