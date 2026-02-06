import { test, expect } from '@playwright/test';

test.describe('핵심 쇼핑 시나리오', () => {
    test('홈페이지에서 상품 선택 후 체크아웃까지 정상 이동', async ({ page }) => {
        // 1. 홈페이지 접속
        await page.goto('/');
        await expect(page).toHaveTitle(/Fresh Bowl/);

        // 2. 메뉴 둘러보기 클릭
        await page.click('text=메뉴 둘러보기');
        await expect(page).toHaveURL(/\/menu/);

        // 3. 첫 번째 상품 클릭 (그린 파워 샐러드)
        // 상품 카드가 로딩될 때까지 기다림
        await page.waitForSelector('.group');
        const firstProduct = page.locator('.group').first();
        const productName = await firstProduct.locator('h3').textContent();
        await firstProduct.click();

        // 4. 상세 페이지 확인
        await expect(page).toHaveURL(/\/product\//);
        await expect(page.locator('h1')).toHaveText(productName!); // 상품명 일치 확인

        // 5. 장바구니 담기
        await page.click('button:has-text("담기")');
        await expect(page).toHaveURL(/\/cart/);

        // 6. 장바구니 확인 (가격 NaN체크, 상품명 확인)
        await expect(page.locator('h1')).toHaveText('장바구니');
        // 장바구니 아이템에 상품명이 있는지 확인
        await expect(page.locator(`.font-semibold:has-text("${productName}")`)).toBeVisible();
        // 가격이 'NaN원'이 아닌지 확인
        const priceText = await page.locator('.font-bold.text-primary').last().textContent();
        expect(priceText).not.toContain('NaN');
        expect(priceText).toContain('원');

        // 7. 주문하기 (체크아웃 이동)
        await page.click('text=주문하기');
        await expect(page).toHaveURL(/\/checkout/);

        // 8. 체크아웃 페이지 확인 (가격 NaN 체크)
        await expect(page.locator('h1')).toHaveText('주문/결제');
        const checkoutPrice = await page.locator('.text-2xl.font-bold.text-primary').textContent();
        expect(checkoutPrice).not.toContain('NaN');
        expect(checkoutPrice).toContain('원');

        console.log('✅ 핵심 쇼핑 시나리오 테스트 통과');
    });
});
