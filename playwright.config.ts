import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 120000, // Global test timeout (120 seconds per test)
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on failure */
  retries: process.env.CI ? 2 : 1,
  /* Workers: Use WORKERS env var, or default to 4 in CI, or auto-detect locally */
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS) : (process.env.CI ? 4 : undefined),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],  // Real-time console output
    ['html', { open: 'never' }],  // Don't auto-open report (keeps Docker from hanging)
    ['allure-playwright', { outputDir: 'allure-results' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://demo.suiteondemand.com',
    ignoreHTTPSErrors: true, // Ignore SSL certificate errors
    screenshot:'only-on-failure',
    video:'retain-on-failure',

    /* Timeouts */
    navigationTimeout: 60000, // Timeout for page.goto(), page.goBack(), etc. (60 seconds)
    actionTimeout: 10000,     // Timeout for actions like click, fill, etc. (10 seconds)

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name:'setup',
      testMatch:/.*\.setup\.ts/,

    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false, // Always headed (xvfb provides virtual display in CI/Docker)
        storageState:'playwright/.auth/user.json'
      },
      dependencies:['setup'],
    },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
