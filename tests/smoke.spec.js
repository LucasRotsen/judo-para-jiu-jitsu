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

/* Conta cores distintas do que está desenhado (canvas 2D ou WebGL com preserveDrawingBuffer). */
async function canvasHasInk(locator) {
  return locator.evaluate((c) => {
    const k = document.createElement('canvas'); k.width = c.width; k.height = c.height;
    const x = k.getContext('2d'); x.drawImage(c, 0, 0);
    const d = x.getImageData(0, 0, k.width, k.height).data;
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
    await page.waitForTimeout(300);
    const stage = page.locator('.cv-wrap canvas:visible').first();
    for (const t of [0.5, 3, 6]) {
      await page.evaluate((x) => window.JudoPlayer.seek(x), t);
      expect(await canvasHasInk(stage)).toBeGreaterThan(8);
    }
    expect(errors).toEqual([]);
  });
}

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
