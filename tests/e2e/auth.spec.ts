import { test, expect } from '@playwright/test';

test.describe('인증(Auth) 시나리오', () => {

    test('로그인 페이지 접속 및 UI 확인', async ({ page }) => {
        await page.goto('/login');

        await expect(page).toHaveURL(/\/login/);
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('로그인 실패 시 에러 메시지 표시 (Mocking)', async ({ page }) => {
        await page.route('**/auth/v1/token?grant_type=password', async route => {
            await route.fulfill({
                status: 400,
                json: { error: 'invalid_grant', error_description: 'Login failed' }
            });
        });

        await page.goto('/login');

        await page.fill('input[type="email"]', 'wrong@example.com');
        await page.fill('input[type="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        await expect(page.locator('body')).toContainText('Login failed');
    });

    test('회원가입 페이지 접속 및 폼 확인', async ({ page }) => {
        await page.goto('/signup');

        await expect(page).toHaveURL(/\/signup/);
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]').first()).toBeVisible();
    });

    test('로그인 성공 시 이동 (Mocking)', async ({ page }) => {
        await page.route('**/auth/v1/token?grant_type=password', async route => {
            await route.fulfill({
                status: 200,
                json: {
                    access_token: 'fake-token',
                    token_type: 'bearer',
                    expires_in: 3600,
                    refresh_token: 'fake-refresh',
                    user: { id: 'test-user', email: 'test@example.com' }
                }
            });
        });

        await page.goto('/login');

        await page.fill('input[type="email"]', 'test@example.com');
        await page.fill('input[type="password"]', 'pass123');
        await page.click('button[type="submit"]');

        await expect(page).not.toHaveURL(/\/login/, { timeout: 10000 });
    });
});
