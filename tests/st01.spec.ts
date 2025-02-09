import { test, expect } from '@playwright/test';

test.describe('ログインページのテスト', () => {
  test('無効なメールアドレスの場合、エラーメッセージが表示される', async ({ page }) => {
    // ログインページを開く
    await page.goto('http://localhost:5173/login');  // ローカルサーバーのURLに変更

    // 無効なメールアドレスを入力
    await page.fill('input[name="email"]', 'invalid-email');

    // フォーム送信（例えばボタンをクリック）
    await page.click('button[type="submit"]');

    // APIレスポンスを待つ
    await expect(page.locator('text=無効なメールアドレスです')).toBeVisible({ timeout: 5000 });
  });

  test('正しいメールアドレスの場合、エラーメッセージが表示されない', async ({ page }) => {
    // ログインページを開く
    await page.goto('http://localhost:5173/login');  // ローカルサーバーのURLに変更

    // 有効なメールアドレスを入力
    await page.fill('input[name="email"]', 'test@example.com');

    // フォーム送信（例えばボタンをクリック）
    await page.click('button[type="submit"]');

    // APIレスポンスを待つ
    await expect(page.locator('text=無効なメールアドレスです')).not.toBeVisible({ timeout: 5000 });
  });
});
