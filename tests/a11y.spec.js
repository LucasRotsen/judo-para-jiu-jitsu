const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

for (const url of ['/', '/ippon-seoi-nage.html', '/sankaku-jime.html']) {
  test(`sem violações de acessibilidade em ${url}`, async ({ page }) => {
    await page.goto(url);
    await page.evaluate(() => window.JudoPlayer && window.JudoPlayer.seek(3));
    const r = await new AxeBuilder({ page }).analyze();
    const bad = r.violations;
    expect(bad.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
  });
}
