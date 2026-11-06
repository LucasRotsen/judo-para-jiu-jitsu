const { test, expect } = require('@playwright/test');

const avaliar = (page, s) => page.evaluate((st) => window.JudoSim.avaliar(window.JudoSim.normalizar(st)).map((o) => o.id), s);

test('regras: cada situação clássica traz a resposta esperada no topo', async ({ page }) => {
  await page.goto('/simulador.html');
  const puxando = await avaliar(page, { pos: 'em-pe', R: 'gola-esq', L: 'manga-dir', f: 'puxando' });
  expect(puxando.slice(0, 3)).toContain('o-uchi-gari');
  expect(puxando).toContain('quebrar-pegada');
  expect((await avaliar(page, { pos: 'em-pe', R: 'gola-esq', L: 'manga-dir', f: 'empurrando' }))[0]).toBe('ippon-seoi-nage');
  expect((await avaliar(page, { pos: 'guarda-baixo', R: 'faixa', L: 'livre', f: 'curvado' }))[0]).toBe('sankaku-jime');
  expect((await avaliar(page, { pos: 'guarda-baixo', R: 'faixa', L: 'faixa', f: 'ereto' }))[0]).toBe('juji-gatame');
  expect((await avaliar(page, { pos: 'montada-baixo', R: 'gola-esq', L: 'gola-dir', f: 'alto' }))[0]).toBe('defesa-estrangulamento');
  expect((await avaliar(page, { pos: 'guarda-cima', R: 'gola-esq', L: 'manga-dir', f: 'puxando' }))[0]).toBe('postura-guarda');
});

test('toda opção que aponta para uma técnica aponta para uma que existe', async ({ page }) => {
  await page.goto('/simulador.html');
  const missing = await page.evaluate(() => {
    const ids = new Set(window.Judo.CATALOG.map((c) => c.id));
    return window.JudoSim.OPCOES.filter((o) => o.tech && !ids.has(o.tech)).map((o) => o.id);
  });
  expect(missing).toEqual([]);
});

test('arrastar a mão do oponente até a nuca muda a pegada, a URL e as opções', async ({ page }) => {
  await page.goto('/simulador.html#pos=em-pe&R=gola-esq&L=manga-dir&f=curvado');
  await page.waitForTimeout(600);
  const box = await page.locator('#cv').boundingBox();
  const [hx, hy] = await page.evaluate(() => window.JudoSimUI.handScreen('R'));
  const [gx, gy] = await page.evaluate(() => window.JudoSimUI.gripScreen('nuca', 'R'));
  await page.mouse.move(box.x + hx, box.y + hy);
  await page.mouse.down();
  await page.mouse.move(box.x + gx, box.y + gy, { steps: 8 });
  await page.mouse.up();
  await expect.poll(() => page.evaluate(() => window.JudoSimUI.state().R)).toBe('nuca');
  expect(page.url()).toContain('R=nuca');
  await expect(page.locator('#selR')).toHaveValue('nuca');
  await expect(page.locator('#ops [data-id="postura-nuca"]')).toBeVisible();
});

test('estado vem da URL e os selects funcionam sem mouse', async ({ page }) => {
  await page.goto('/simulador.html#pos=montada-baixo&R=gola-esq&L=gola-dir&f=alto');
  await expect(page.locator('#selR')).toHaveValue('gola-esq');
  await expect(page.locator('#ops li.op').first()).toContainText('estrangulamento');
  await page.locator('#selL').selectOption('livre');
  await expect.poll(() => page.evaluate(() => window.JudoSimUI.state().L)).toBe('livre');
  await page.getByRole('button', { name: 'Em pé' }).click();
  await expect.poll(() => page.evaluate(() => window.JudoSimUI.state().pos)).toBe('em-pe');
});

test('base dele só aparece em pé e vai para a URL', async ({ page }) => {
  await page.goto('/simulador.html#pos=em-pe&R=gola-esq&L=manga-dir&f=parado');
  await page.getByRole('button', { name: 'Pé direito à frente' }).click();
  await expect.poll(() => page.url()).toContain('b=dir');
  await page.getByRole('button', { name: 'Montada (você por baixo)' }).click();
  await expect(page.locator('#base')).toBeHidden();
});

test('em pé, arrastar a sua mão até a gola alta dele muda as suas pegadas', async ({ page }) => {
  await page.goto('/simulador.html#pos=em-pe&R=gola-esq&L=manga-dir&f=empurrando');
  await page.waitForTimeout(600);
  const box = await page.locator('#cv').boundingBox();
  const [hx, hy] = await page.evaluate(() => window.JudoSimUI.handScreen('mR'));
  const [gx, gy] = await page.evaluate(() => window.JudoSimUI.gripScreen('gola-alta', 'mR'));
  await page.mouse.move(box.x + hx, box.y + hy);
  await page.mouse.down();
  await page.mouse.move(box.x + gx, box.y + gy, { steps: 8 });
  await page.mouse.up();
  await expect.poll(() => page.evaluate(() => window.JudoSimUI.state().mR)).toBe('gola-alta');
  expect(page.url()).toContain('mR=gola-alta');
  await expect(page.locator('#selmR')).toHaveValue('gola-alta');
});
