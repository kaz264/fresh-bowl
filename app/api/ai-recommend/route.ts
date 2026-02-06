export async function POST(request: Request) {
    try {
        const { mood, preference } = await request.json();

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
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
}`,
                    },
                ],
            }),
        });

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        // JSON 파싱
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : { recommendations: [] };

        return Response.json(recommendations);
    } catch (error) {
        console.error('AI Recommendation Error:', error);
        return Response.json(
            { error: 'AI 추천을 가져오는 데 실패했습니다.' },
            { status: 500 }
        );
    }
}
