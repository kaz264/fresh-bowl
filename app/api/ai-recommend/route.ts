export async function POST(request: Request) {
    try {
        const { mood, preference } = await request.json();

        // 간단한 키워드 기반 추천 시스템
        const menuDatabase = [
            {
                name: '그린 파워 샐러드',
                keywords: ['에너지', '힘', '활력', '상쾌', '건강'],
                calories: '280kcal',
                protein: '12g',
                reason: '케일과 시금치가 가득한 에너지 충전 샐러드예요!'
            },
            {
                name: '프로틴 부스트',
                keywords: ['운동', '단백질', '근육', '포만감', '든든'],
                calories: '350kcal',
                protein: '32g',
                reason: '그릴드 치킨과 퀴노아로 단백질을 가득 채워드려요!'
            },
            {
                name: '지중해 샐러드',
                keywords: ['여유', '휴가', '상큼', '가벼운'],
                calories: '320kcal',
                protein: '15g',
                reason: '올리브와 페타치즈의 지중해 풍미를 느껴보세요!'
            },
            {
                name: '망고 새우 샐러드',
                keywords: ['달콤', '기분전환', '특별', '색다른'],
                calories: '290kcal',
                protein: '24g',
                reason: '망고의 달콤함과 새우의 신선함이 기분을 좋게 만들어요!'
            },
            {
                name: '카이저 클래식',
                keywords: ['클래식', '전통', '안정', '편안'],
                calories: '310kcal',
                protein: '14g',
                reason: '언제 먹어도 맛있는 클래식 샐러드예요!'
            },
            {
                name: '베지테리안 딜라이트',
                keywords: ['채식', '가볍게', '다이어트', '칼로리', '야채'],
                calories: '240kcal',
                protein: '8g',
                reason: '구운 호박과 가지로 만든 가볍고 건강한 선택이에요!'
            },
        ];

        // 키워드 매칭으로 추천
        const moodLower = mood.toLowerCase();
        const scored = menuDatabase.map(menu => {
            let score = 0;
            menu.keywords.forEach(keyword => {
                if (moodLower.includes(keyword)) {
                    score += 10;
                }
            });
            // 랜덤 점수 추가 (다양성 확보)
            score += Math.random() * 5;
            return { ...menu, score };
        });

        // 점수순으로 정렬하고 상위 2개 선택
        const topRecommendations = scored
            .sort((a, b) => b.score - a.score)
            .slice(0, 2)
            .map(menu => ({
                name: `${menu.name} (${menu.calories}, 단백질 ${menu.protein})`,
                reason: menu.reason
            }));

        return Response.json({ recommendations: topRecommendations });
    } catch (error) {
        console.error('AI Recommendation Error:', error);

        // 에러 시 기본 추천 반환
        const defaultRecommendations = [
            {
                name: '그린 파워 샐러드 (280kcal, 단백질 12g)',
                reason: '케일과 시금치가 가득한 에너지 충전 샐러드예요!'
            },
            {
                name: '프로틴 부스트 (350kcal, 단백질 32g)',
                reason: '그릴드 치킨과 퀴노아로 단백질을 가득 채워드려요!'
            }
        ];

        return Response.json({ recommendations: defaultRecommendations });
    }
}
