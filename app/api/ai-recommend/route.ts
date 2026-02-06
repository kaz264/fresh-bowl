export async function POST(request: Request) {
    try {
        const body = await request.json();
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
                model: 'anthropic/claude-3.5-sonnet',
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
        console.log('[DEBUG] OpenRouter Response Data:', JSON.stringify(data, null, 2));

        const content = data.choices[0]?.message?.content;
        if (!content) {
            throw new Error('No content in response');
        }

        // JSON 파싱
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error('[ERROR] JSON pattern not found in content:', content);
            throw new Error('Failed to parse JSON from AI response');
        }

        const recommendations = JSON.parse(jsonMatch[0]);
        console.log('[DEBUG] Parsed Recommendations:', recommendations);

        return Response.json(recommendations);
    } catch (error) {
        console.error('[CRITICAL] AI Recommendation Error Details:', error);

        // Fallback: 에러 발생 시 기본 추천 제공 (사용자 경험 보호)
        const defaultRecommendations = {
            recommendations: [
                {
                    name: "그린 파워 샐러드",
                    reason: "AI 연결에 일시적인 문제가 있어 기본 추천을 드려요. 에너지를 충전해보세요!"
                },
                {
                    name: "프로틴 부스트",
                    reason: "든든한 단백질로 활력을 되찾으세요!"
                }
            ]
        };

        return Response.json(defaultRecommendations);
    }
}
