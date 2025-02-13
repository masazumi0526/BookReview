// import { test, expect } from '@playwright/test';

// test.describe('ログインページのテスト', () => {
//   test('メール・パスワード未入力でバリデーションエラーが表示される', async ({ page }) => {
//     await page.goto('http://localhost:5173/login');
//     await page.click('button[type="submit"]');
//     const emailError = page.locator('p', { hasText: '必須項目です' }).nth(0);
//     const passwordError = page.locator('p', { hasText: '必須項目です' }).nth(1);
//     await expect(emailError).toBeVisible();
//     await expect(passwordError).toBeVisible();
//   });

//   test('ブラウザのデフォルトバリデーションが機能していることを確認', async ({ page }) => {
//     await page.goto('http://localhost:5173/login');
//     await page.click('button[type="submit"]');
//     const emailInput = page.locator('input[name="email"]');
//     await expect(emailInput).toHaveAttribute('required');
//     const passwordInput = page.locator('input[name="password"]');
//     await expect(passwordInput).toHaveAttribute('required');
//   });

//   test('無効な入力の場合、APIからのエラーメッセージが表示される', async ({ page }) => {
//     await page.goto('http://localhost:5173/login');
//     await page.fill('input[name="email"]', 'invalid-email');
//     await page.fill('input[name="password"]', 'short');
//     await page.click('button[type="submit"]');
//     const errorMessages = page.locator('.error-message');
//     await expect(errorMessages).toBeVisible({ timeout: 5000 });
//   });

//   test('正しい入力の場合、エラーメッセージが表示されない', async ({ page }) => {
//     await page.goto('http://localhost:5173/login');
//     await page.fill('input[name="email"]', 'test@example.com');
//     await page.fill('input[name="password"]', 'validpassword123');
//     await page.click('button[type="submit"]');
//     const errorMessages = page.locator('.error-message');
//     await expect(errorMessages).not.toBeVisible({ timeout: 5000 });
//   });
// });
