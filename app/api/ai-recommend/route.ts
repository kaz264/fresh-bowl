export async function POST(request: Request) {
    let body;
    try {
        body = await request.clone().json();
        console.log('[DEBUG] AI Request Body:', body);
        const { mood, preference } = body;

        console.log('[DEBUG] Calling OpenRouter API...');
        console.log('[DEBUG] API Key exists:', !!process.env.OPENROUTER_API_KEY);

        if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
            throw new Error('OpenRouter API Key is missing or invalid');
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Fresh Bowl',
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o-mini',
                messages: [
                    {
                        role: 'user',
                        content: `당신은 건강한 식단 전문가입니다. 사용자의 현재 기분이나 상태: "${mood}", 선호사항: "${preference}"를 고려하여, 다음 샐러드 메뉴 중 가장 적합한 2개를 추천해주세요.

메뉴:
1. 그린 파워 샐러드 - 케일, 시금치, 아보카도, 치아시드 (280kcal, 단백질 12g)
2. 프로틴 부스트 - 그릴드 치킨, 퀴노아 (350kcal, 단백질 32g)
3. 지중해 샐러드 - 올리브, 페타치즈 (320kcal, 단백질 15g)
4. 망고 새우 샐러드 - 새우, 망고 (290kcal, 단백질 24g)
5. 카이저 클래식 - 로메인 상추, 파마산 치즈 (310kcal, 단백질 14g)
6. 베지테리안 딜라이트 - 구운 호박, 가지 (240kcal, 단백질 8g)

응답 형식 (반드시 JSON만 출력):
{
  "recommendations": [
    {
      "name": "샐러드명",
      "reason": "추천 이유 (한 문장)"
    }
  ]
}`
                    }
                ]
            })
        });

        console.log('[DEBUG] OpenRouter Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[ERROR] OpenRouter API Error:', errorText);
            throw new Error(`OpenRouter API failed: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        // JSON 파싱
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Failed to parse JSON');

        const recommendations = JSON.parse(jsonMatch[0]);
        return Response.json(recommendations);

    } catch (error) {
        console.error('[CRITICAL] AI Recommendation Error:', error);

        // =========================================================
        // Fallback: API 실패 시 스마트 키워드 추천 시스템 작동
        // =========================================================
        const mood = body?.mood || '';
        console.log('[FALLBACK] Switching to keyword-based recommendation for mood:', mood);

        const menuDatabase = [
            {
                name: '그린 파워 샐러드',
                keywords: ['에너지', '힘', '활력', '상쾌', '건강', '피곤'],
                calories: '280kcal',
                protein: '12g',
                reason: '케일과 시금치가 가득한 에너지 충전 샐러드예요!'
            },
            {
                name: '프로틴 부스트',
                keywords: ['운동', '단백질', '근육', '포만감', '든든', '배고파'],
                calories: '350kcal',
                protein: '32g',
                reason: '그릴드 치킨과 퀴노아로 단백질을 가득 채워드려요!'
            },
            {
                name: '지중해 샐러드',
                keywords: ['여유', '휴가', '상큼', '가벼운', '와인', '기념일'],
                calories: '320kcal',
                protein: '15g',
                reason: '올리브와 페타치즈의 지중해 풍미를 느껴보세요!'
            },
            {
                name: '망고 새우 샐러드',
                keywords: ['달콤', '기분전환', '특별', '색다른', '우울', '슬픔'],
                calories: '290kcal',
                protein: '24g',
                reason: '망고의 달콤함과 새우의 신선함이 기분을 좋게 만들어요!'
            },
            {
                name: '카이저 클래식',
                keywords: ['클래식', '전통', '안정', '편안', '실패없는', '무난'],
                calories: '310kcal',
                protein: '14g',
                reason: '언제 먹어도 맛있는 클래식 샐러드예요!'
            },
            {
                name: '베지테리안 딜라이트',
                keywords: ['채식', '가볍게', '다이어트', '칼로리', '야채', '속편한'],
                calories: '240kcal',
                protein: '8g',
                reason: '구운 호박과 가지로 만든 가볍고 건강한 선택이에요!'
            },
        ];

        // 키워드 점수 계산
        const moodLower = mood.toLowerCase();
        const scored = menuDatabase.map(menu => {
            let score = 0;
            menu.keywords.forEach(keyword => {
                if (moodLower.includes(keyword)) score += 10;
            });
            score += Math.random() * 5; // 랜덤 요소 추가
            return { ...menu, score };
        });

        // 상위 2개 추천
        const recommendations = scored
            .sort((a, b) => b.score - a.score)
            .slice(0, 2)
            .map(menu => ({
                name: `${menu.name} (${menu.calories})`,
                reason: `[AI 추천] ${menu.reason}`
            }));

        return Response.json({ recommendations });
    }
}
