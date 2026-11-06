const { test, expect } = require('@playwright/test');

test('manifest válido com ícones', async ({ request }) => {
  const res = await request.get('/manifest.webmanifest');
  expect(res.ok()).toBeTruthy();
  const m = await res.json();
  expect(m.display).toBe('standalone');
  for (const icon of m.icons) expect((await request.get(`/${icon.src}`)).ok()).toBeTruthy();
});

test('depois da primeira visita, abre outra técnica offline', async ({ page, context }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.goto('/hadaka-jime.html');
  await expect(page.locator('h1')).toContainText('Hadaka');
  await page.evaluate(() => window.JudoPlayer.seek(5));
  expect(errors).toEqual([]);
});
