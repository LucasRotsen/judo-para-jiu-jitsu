const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const CATALOG = require('./catalog');

const SITE = path.join(__dirname, '..', 'site');
const TECHS = CATALOG.map((c) => c.id);

test('catálogo e arquivos de técnica batem', () => {
  const files = fs.readdirSync(path.join(SITE, 'assets', 'tecnicas')).map((f) => f.replace(/\.js$/, ''));
  expect(files.sort()).toEqual([...TECHS].sort());
});

function collectErrors(page) {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.g/.test(m.text())) errors.push(m.text()); });
  return errors;
}

async function canvasHasInk(locator) {
  return locator.evaluate((c) => {
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    const seen = new Set();
    for (let i = 0; i < d.length; i += 4 * 97) seen.add(`${d[i]},${d[i + 1]},${d[i + 2]}`);
    return seen.size;
  });
}

test('índice lista as técnicas e desenha os cards', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/');
  const cards = page.locator('#grid a');
  await expect(cards).toHaveCount(TECHS.length);
  expect(await canvasHasInk(cards.first().locator('canvas'))).toBeGreaterThan(8);
  expect(errors).toEqual([]);
});

for (const id of TECHS) {
  test(`página ${id} anima sem erros`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(`/${id}.html`);
    await expect(page.locator('h1')).toBeVisible();
    const stage = page.locator('canvas').first();
    for (const t of [0.5, 3, 6]) {
      await page.evaluate((x) => window.JudoPlayer.seek(x), t);
      expect(await canvasHasInk(stage)).toBeGreaterThan(8);
    }
    expect(errors).toEqual([]);
  });
}

test('corpo humano em WebGL está ativo e desenha no palco', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/o-soto-gari.html');
  expect(await page.evaluate(() => window.Judo.gl.ok)).toBe(true);
  await page.evaluate(() => window.JudoPlayer.seek(4.4));
  // tons de pele e de gi sombreados só existem no desenho novo: bem mais cores que as cápsulas chapadas
  expect(await canvasHasInk(page.locator('#cv'))).toBeGreaterThan(12);
  expect(errors).toEqual([]);
});

test('sem WebGL a página cai nas cápsulas e continua desenhando', async ({ page }) => {
  await page.addInitScript(() => { const g = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { return /webgl/.test(t) ? null : g.call(this, t, ...a); }; });
  await page.goto('/o-soto-gari.html');
  expect(await page.evaluate(() => window.Judo.gl.ok)).toBe(false);
  expect(await canvasHasInk(page.locator('#cv'))).toBeGreaterThan(8);
});

test('pose física vem assada com a página: coxa, canela e braços de Tori ficam fora do tronco de Uke', async ({ page }) => {
  await page.goto('/raspagem-de-tesoura.html');
  const pior = await page.evaluate(() => {
    const J = window.Judo, def = J.techs['raspagem-de-tesoura'], f = J.fisica; let pior = 0;
    if (!def._assado) return 99;
    for (let t = 0; t <= def.end; t += .1) { const F = J.solve(def, t), A = f.capsulas(F.tori), B = f.capsulas(F.uke).filter((c) => c.g === 'tronco');
      for (const a of A) { if (a.g === 'tronco' || a.g === 'cabeca' || a.s === 2) continue; /* a ponta do pé ainda entra por instantes: está no orçamento */ for (const b of B) pior = Math.max(pior, a.r + b.r - f.seg(a.a, a.b, b.a, b.b)); } }
    return pior;
  });
  // 9 cm: tolera o aperto de um instante (hoje 7,6 cm por 0,06 s); antes da pose física a canela ficava 18 cm dentro por segundos
  expect(pior).toBeLessThan(0.09);
});

test('filtro de grupo esconde os cards do outro grupo', async ({ page }) => {
  await page.goto('/');
  await page.locator('.chip[data-g="ne"]').click();
  await expect(page.locator('a.tcard:visible')).toHaveCount(CATALOG.filter((c) => c.group === 'ne').length);
});

test('link direto para uma fase abre a animação nela', async ({ page }) => {
  await page.goto('/tate-shiho-gatame.html#fase=Upa');
  await expect(page.locator('#pht')).toContainText('Upa');
  await page.goto('/sankaku-jime.html#fase=4');
  await expect(page.locator('#phn')).toHaveText(/Fase 4 de/);
});

test('simulador linka o upa direto na fase', async ({ page }) => {
  await page.goto('/simulador.html#pos=montada-baixo&R=gola-esq&L=livre&f=alto');
  const link = page.locator('#ops [data-id="upa"] a.op-link');
  await expect(link).toHaveAttribute('href', 'tate-shiho-gatame.html#fase=Upa');
});

test('busca acha técnica pelo nome no jiu-jitsu, sem acento', async ({ page }) => {
  await page.goto('/');
  await page.locator('#q').fill('triangulo');
  await expect(page.locator('a.tcard:visible h3', { hasText: 'Sankaku Jime' })).toBeVisible();
  await expect(page.locator('a.tcard:visible h3', { hasText: 'Kata Gatame' })).toBeVisible();
  await expect(page.locator('a.tcard:visible h3', { hasText: 'Ippon Seoi Nage' })).toHaveCount(0);
  await page.locator('#q').fill('mata-leao');
  await expect(page.locator('a.tcard:visible')).toHaveCount(1);
  await expect(page.locator('a.tcard:visible h3')).toContainText('Hadaka Jime');
  await page.locator('#q').fill('xyz123');
  await expect(page.locator('#qempty')).toBeVisible();
  await page.locator('#q').fill('');
  await page.locator('.chip[data-g="ne"]').click();
  await page.locator('#q').fill('gatame');
  await expect(page.locator('a.tcard:visible')).toHaveCount(4);
});

test('câmera livre: com Girar ligado, arrastar o palco muda o ângulo sem pausar', async ({ page }) => {
  await page.goto('/o-goshi.html');
  const cv = page.locator('#cv'); await expect(cv).toBeVisible();
  await expect(page.locator('#vname')).not.toHaveText('Câmera livre');
  await page.locator('#orbita').click();
  const b = await cv.boundingBox();
  await page.mouse.move(b.x + b.width * .5, b.y + b.height * .5); await page.mouse.down();
  await page.mouse.move(b.x + b.width * .8, b.y + b.height * .3, { steps: 8 }); await page.mouse.up();
  await expect(page.locator('#vname')).toHaveText('Câmera livre');
  await page.locator('#orbita').click();
  await expect(page.locator('#vname')).not.toHaveText('Câmera livre');
});
