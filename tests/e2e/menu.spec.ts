import { test, expect } from '@playwright/test';

test.describe('메뉴 페이지 기능', () => {
    test('카테고리 탭이 렌더링되고 클릭 가능해야 한다', async ({ page }) => {
        await page.goto('/menu');

        // 헤더 확인
        await expect(page.getByRole('heading', { name: '메뉴' })).toBeVisible();

        // 카테고리 탭 존재 확인
        const categories = ['전체', '시그니처', '클래식', '비건'];
        for (const category of categories) {
            await expect(page.getByRole('button', { name: category, exact: true })).toBeVisible();
        }

        // 시그니처 탭 클릭
        await page.getByRole('button', { name: '시그니처' }).click();

        // 클릭 후 화면이 정상적으로 유지되는지 확인 (에러 없음)
        // 상품이 없으면 '해당 카테고리의 상품이 없습니다'가 뜰 수 있음
        const noProductMessage = page.getByText('해당 카테고리의 상품이 없습니다');
        const productCards = page.locator('.group.overflow-hidden'); // ProductCard 클래스

        // 둘 중 하나는 보여야 함
        await expect(noProductMessage.or(productCards.first())).toBeVisible({ timeout: 5000 });
    });
});
