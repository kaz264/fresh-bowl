import { test, expect } from '@playwright/test';

test.describe('AI 추천 기능', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('AI 추천 받기 버튼 클릭 시 스크롤 이동', async ({ page }) => {
        // AI 추천 섹션이 처음에는 뷰포트에 없는지 확인 (선택적)
        const aiSection = page.locator('#ai-recommendation');

        // 버튼 클릭
        await page.click('text=AI 추천 받기');

        // URL 해시 변경 확인
        await expect(page).toHaveURL(/#ai-recommendation/);

        // 섹션이 뷰포트 안에 들어왔는지 확인
        await expect(aiSection).toBeInViewport();
    });

    test('API Mocking을 통한 AI 추천 결과 및 상품 링크 확인', async ({ page }) => {
        // 1. AI 추천 API Mocking
        await page.route('/api/ai-recommend', async route => {
            const json = {
                recommendations: [
                    {
                        name: '테스트 샐러드', // 아래 products의 이름과 일치해야 함
                        reason: '테스트 추천 이유입니다.'
                    }
                ]
            };
            await route.fulfill({ json });
        });

        // 2. Supabase Products API Mocking (상품 ID 매칭용)
        // Supabase 요청 URL 패턴에 맞춰 Mocking
        await page.route('**/rest/v1/products*', async route => {
            await route.fulfill({
                status: 200,
                json: [
                    { id: 'test-product-id-123', name: '테스트 샐러드' },
                    { id: 'other-id', name: '다른 샐러드' }
                ]
            });
        });

        // AI 섹션으로 이동
        await page.goto('/#ai-recommendation');

        // 입력 및 추천 요청
        await page.fill('input', '배고파요'); // input 태그로 변경됨 (Textarea 아님)
        await page.click('button:has-text("추천받기")');

        // 결과 대기
        await expect(page.locator('text=테스트 샐러드')).toBeVisible();
        await expect(page.locator('text=테스트 추천 이유입니다.')).toBeVisible();

        // 3. "주문 가능" 뱃지와 링크 확인
        await expect(page.locator('text=주문 가능')).toBeVisible();

        // 카드 호버 시 "메뉴 보러가기" 버튼이 DOM에 존재하는지 확인 (opacity 0일 수 있으므로 attached 확인)
        const linkButton = page.locator('a[href="/product/test-product-id-123"]');
        await expect(linkButton).toBeAttached();

        // 강제 클릭 (opacity 0이라도 클릭 가능한지, 혹은 호버 액션 시뮬레이션)
        // Playwright는 가려져 있으면 클릭 안될 수 있음 -> force: true
        await linkButton.click({ force: true });

        // 상세 페이지 이동 확인
        await expect(page).toHaveURL(/\/product\/test-product-id-123/);

        console.log('✅ AI 추천 링크 이동 테스트 통과');
    });
});
