import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    testMatch: "**/*.spec.js",
    use: {
        baseURL: "https://localhost:3000",
        ignoreHTTPSErrors: true
    },
    webServer: {
        command: "node server.js",
        url: "https://localhost:3000",
        reuseExistingServer: true,
        ignoreHTTPSErrors: true,
    }
});