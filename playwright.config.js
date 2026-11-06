const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:8123',
    // Localmente usa o Chrome instalado; o Chromium do Playwright nem sempre abre no macOS novo.
    channel: process.env.CI ? undefined : 'chrome',
  },
  webServer: {
    command: 'python3 -m http.server -d site 8123 --bind 127.0.0.1',
    url: 'http://127.0.0.1:8123/',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'ignore',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
