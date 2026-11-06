const { test, expect } = require('@playwright/test');

const clock = (page) => page.locator('#clock').innerText().then((s) => parseFloat(s.replace(',', '.')));

test('arrastar no palco avança o tempo e pausa', async ({ page }) => {
  await page.goto('/sankaku-jime.html');
  await page.evaluate(() => window.JudoPlayer.seek(2));
  const box = await page.locator('#cv').boundingBox();
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width * 0.3, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.6, y, { steps: 6 });
  await page.mouse.up();
  const t = await clock(page);
  expect(t).toBeGreaterThan(4);
  await expect(page.locator('#playTxt')).toHaveText('Animar');
});

test('toque simples no palco alterna play/pausa', async ({ page }) => {
  await page.goto('/o-goshi.html');
  await page.evaluate(() => window.JudoPlayer.seek(1));
  await page.locator('#cv').click();
  await expect(page.locator('#playTxt')).toHaveText('Pausar');
});
