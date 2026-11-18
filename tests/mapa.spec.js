const { test, expect } = require('@playwright/test');

test('mapa abre na guarda fechada por baixo, com as técnicas e o destino de cada uma', async ({ page }) => {
  const erros = []; page.on('pageerror', (e) => erros.push(e.message));
  await page.goto('/mapa.html');
  await expect(page.locator('#mtit')).toHaveText('Na guarda fechada, por baixo');
  await expect(page.locator('#mops a[href="kimura.html"]').first()).toBeVisible();
  await expect(page.locator('#mops a[href="drill-quadril-kimura-guilhotina.html"]').first()).toBeVisible();
  // raspagem leva à montada, por cima: o destino troca a posição e o lado
  await page.locator('#mops article:has(a[href="raspagem-de-tesoura.html"]) .m-dest').click();
  await expect(page.locator('#mtit')).toHaveText('Montado');
  await expect(page).toHaveURL(/#pos=montada&lado=cima/);
  await expect(page.locator('#mops a[href="juji-gatame.html"]').first()).toBeVisible();
  // o outro lado aparece como "cuidado": embaixo da montada, o upa
  await expect(page.locator('#mcontra a[href="saida-da-montada.html"]').first()).toBeVisible();
  await page.goBack();
  await expect(page.locator('#mtit')).toHaveText('Na guarda fechada, por baixo');
  expect(erros).toEqual([]);
});

test('mapa: link direto e clique no diagrama', async ({ page }) => {
  await page.goto('/mapa.html#pos=guarda-aberta&lado=cima');
  await expect(page.locator('#mops a[href="passagem-toreando.html"]').first()).toBeVisible();
  await page.locator('.m-no[data-p="em-pe"]').click();
  await expect(page.locator('#mtit')).toHaveText('Em pé, com pegada');
  await expect(page.locator('#mcontra-s')).toBeHidden();
  await expect(page.locator('#mops a[href="o-goshi.html"]').first()).toBeVisible();
});

test('mapa não cria rolagem horizontal na página', async ({ page }) => {
  await page.goto('/mapa.html');
  const w = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(w).toBeLessThanOrEqual(0);
});
