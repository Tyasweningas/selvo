import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false, // Serukan sequential untuk menghindari collision di database/registrasi
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Hanya gunakan 1 worker agar registrasi tidak balapan
  reporter: 'list', // Output list sederhana agar mudah dibaca di terminal
  use: {
    baseURL: 'https://selvo.web.id',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Ambil tangkapan layar jika tes gagal
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
