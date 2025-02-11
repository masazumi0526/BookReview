import { test, expect } from '@playwright/test';

test.describe('ログインページのテスト', () => {
  test('無効な入力の場合、APIからのエラーメッセージが表示される', async ({ page }) => {
    // ログインページを開く
    await page.goto('http://localhost:5173/login');  // ローカルサーバーのURL

    // 無効なメールアドレスとパスワードを入力
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'short');

    // フォーム送信
    await page.click('button[type="submit"]');

    // APIレスポンスのエラーメッセージが表示されることを確認
    const errorMessages = page.locator('.error-message'); 

    await expect(errorMessages).toBeVisible({ timeout: 5000 });
  });

  test('正しい入力の場合、エラーメッセージが表示されない', async ({ page }) => {
    // ログインページを開く
    await page.goto('http://localhost:5173/login');

    // 有効なメールアドレスとパスワードを入力
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'validpassword123');

    // フォーム送信
    await page.click('button[type="submit"]');

    // エラーメッセージが表示されないことを確認
    const errorMessages = page.locator('.error-message'); // クラス名は実際のものに変更

    await expect(errorMessages).not.toBeVisible({ timeout: 5000 });
  });
});
