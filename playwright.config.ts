import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //   name: 'mobile-chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
    ],
    // webServer: {
    //     command: 'npm run dev', // 프로덕션 빌드 실행 권장하지만 개발 중엔 npm run dev도 가능. 여기선 npm run dev 사용 시 포트 충돌 주의.
    //     // 기존 서버가 켜져 있으면 reuseExistingServer: true 사용
    //     url: 'http://localhost:3000',
    //     reuseExistingServer: true,
    // },
});
