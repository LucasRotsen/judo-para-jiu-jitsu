const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'site');
const TECHS = fs.readdirSync(path.join(SITE, 'assets', 'tecnicas')).map((f) => f.replace(/\.js$/, ''));

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
