const { test, expect } = require('@playwright/test');
const CATALOG = require('./catalog');

test('marcar estudada e favorita aparece no índice e persiste', async ({ page }) => {
  await page.goto('/o-goshi.html');
  await page.locator('#done').click();
  await page.locator('#fav').click();
  await expect(page.locator('#done')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.speed button[data-s="0.5"]').click();

  await page.goto('/');
  const card = page.locator('a.tcard[href="o-goshi.html"]');
  await expect(card.locator('.badge.done')).toBeVisible();
  await expect(page.locator('#progress')).toContainText(`1 de ${CATALOG.length}`);
  await page.locator('.chip[data-g="fav"]').click();
  await expect(page.locator('a.tcard:visible')).toHaveCount(1);

  await page.goto('/o-goshi.html');
  await expect(page.locator('#fav')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.speed button[data-s="0.5"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#done').click();
  await expect(page.locator('#done .lbl')).toHaveText('Marcar como estudada');
});

test('sem localStorage a página continua funcionando', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('bloqueado'); } });
  });
  await page.goto('/sankaku-jime.html');
  await page.locator('#fav').click();
  await page.goto('/');
  await expect(page.locator('#grid a')).toHaveCount(CATALOG.length);
  expect(errors).toEqual([]);
});
