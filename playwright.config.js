import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.js",
  use: {
    baseURL: "https://localhost:3000",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: "node server.js",
    url: "https://localhost:3000",
    reuseExistingServer: true,
    ignoreHTTPSErrors: true,
  },
});
