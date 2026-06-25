import { test, expect } from '@playwright/test';

test.describe('Selvo E2E Testing', () => {
  
  test('Skenario 1: Navigasi Publik dan Detail Produk', async ({ page }) => {
    // 1. Buka halaman utama
    await page.goto('/');
    
    // 2. Verifikasi judul halaman utama atau teks hero
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toContainText('Stop Desain Dari Nol');
    
    // 3. Tunggu hingga kartu produk dimuat
    // Kartu produk di-render di dalam CardLanding yang dibungkus oleh Link (tag <a>)
    const firstProductCard = page.locator('article').first();
    await expect(firstProductCard).toBeVisible({ timeout: 10000 });
    
    const productName = await firstProductCard.locator('h3').textContent();
    console.log(`Menemukan produk pertama: ${productName}`);
    
    // 4. Klik kartu produk untuk masuk ke halaman detail
    await firstProductCard.click();
    
    // 5. Verifikasi URL berubah ke halaman detail produk (/products/[slug])
    await expect(page).toHaveURL(/\/products\/.+/);
    
    // 6. Verifikasi nama produk dan tombol pembelian/keranjang ada di halaman detail
    const detailTitle = page.locator('h1');
    await expect(detailTitle).toBeVisible();
    
    const buyButton = page.locator('button:has-text("Beli Produk")');
    const cartButton = page.locator('button:has-text("Tambah ke Keranjang")');
    await expect(buyButton).toBeVisible();
    await expect(cartButton).toBeVisible();
  });
  
  test('Skenario 2: Alur Autentikasi Registrasi Akun Seller Baru', async ({ page }) => {
    // 1. Buka halaman login/register
    await page.goto('/auth');
    
    // 2. Klik tulisan "Daftar" untuk beralih ke form Registrasi
    const toggleToSignUp = page.locator('span:has-text("Daftar")');
    await expect(toggleToSignUp).toBeVisible();
    await toggleToSignUp.click();
    
    // 3. Verifikasi form register aktif (menampilkan judul "Buat Akun Gratis")
    const registerTitle = page.locator('h2:has-text("Buat Akun Gratis")');
    await expect(registerTitle).toBeVisible();
    
    // 4. Buat email unik dinamis
    const uniqueEmail = `playwright_test_${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`;
    
    // 5. Isi data registrasi
    await page.fill('input[name="name"]', 'Playwright Automated Seller');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', 'password123');
    
    // 6. Klik tombol submit "Sign Up"
    const signUpButton = page.locator('button:has-text("Sign Up")');
    await signUpButton.click();
    
    // 7. Verifikasi otomatis login dan diarahkan ke Dashboard seller (/dashboard)
    // Next.js Router push mungkin butuh waktu beberapa detik
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
    
    // 8. Verifikasi elemen khas dashboard untuk meyakinkan login sukses
    // Mencari tulisan "Tabungan Pendapatan Akun" dan nama seller
    const sellerNameLabel = page.locator('p:has-text("Playwright Automated Seller")').first();
    await expect(sellerNameLabel).toBeVisible();
    const balanceLabel = page.locator('p:has-text("Tabungan Pendapatan Akun")');
    await expect(balanceLabel).toBeVisible();
    console.log(`Pendaftaran berhasil untuk email: ${uniqueEmail}`);
  });
});
