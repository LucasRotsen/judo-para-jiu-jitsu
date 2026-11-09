const { defineConfig, devices } = require('@playwright/test');

// Porta própria por checkout: worktrees paralelos não reaproveitam o servidor um do outro.
const PORT = Number(process.env.PORT) || 8100 + (require('crypto').createHash('md5').update(__dirname).digest()[0] % 200);

module.exports = defineConfig({
  testDir: 'tests',
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    // Localmente usa o Chrome instalado; o Chromium do Playwright nem sempre abre no macOS novo.
    channel: process.env.CI ? undefined : 'chrome',
    // WebGL por software para testar o palco 3D também em máquinas/CI sem GPU.
    launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
  },
  webServer: {
    command: `python3 -m http.server -d site ${PORT} --bind 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'ignore',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
