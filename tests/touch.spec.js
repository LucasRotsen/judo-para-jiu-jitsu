const { test, expect } = require('@playwright/test');

const clock = (page) => page.locator('#clock').innerText().then((s) => parseFloat(s.replace(',', '.')));

test('arrastar no palco avança o tempo e pausa', async ({ page }) => {
  await page.goto('/ippon-seoi-nage.html');
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
  await page.goto('/tomoe-nage.html');
  await page.evaluate(() => window.JudoPlayer.seek(1));
  await page.locator('#cv').click();
  await expect(page.locator('#playTxt')).toHaveText('Pausar');
});

test('técnica 3D: arrastar no palco gira a câmera (quando há WebGL)', async ({ page }) => {
  await page.goto('/sankaku-jime.html');
  const hasGL = await page.waitForFunction(() => window.JudoPlayer && window.JudoPlayer.gl, null, { timeout: 8000 }).then(() => true).catch(() => false);
  test.skip(!hasGL, 'navegador sem WebGL: fica o palco em canvas');
  const before = await page.evaluate(() => window.JudoPlayer.gl.camera.position.toArray());
  const box = await page.locator('.cv-wrap').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 160, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => window.JudoPlayer.gl.camera.position.toArray());
  expect(Math.hypot(after[0] - before[0], after[2] - before[2])).toBeGreaterThan(0.3);
  await page.getByRole('button', { name: 'De cima' }).click();
  await expect(page.locator('#vname')).toHaveText('De cima');
});
