'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Recommendation {
    name: string;
    reason: string;
}

export function AIRecommendation() {
    const [mood, setMood] = useState('');
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

    const handleRecommend = async () => {
        if (!mood.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/ai-recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mood, preference: '' }),
            });

            const data = await response.json();
            setRecommendations(data.recommendations || []);
        } catch (error) {
            console.error('AI 추천 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-gradient-to-br from-primary/5 to-emerald-50 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI 샐러드 추천
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    오늘의 기분이나 상태를 알려주시면, AI가 딱 맞는 샐러드를 추천해드려요!
                </p>

                <div className="flex gap-2">
                    <Input
                        placeholder="예: 에너지가 필요해, 가볍게 먹고 싶어..."
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
                    />
                    <Button onClick={handleRecommend} disabled={loading || !mood.trim()}>
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            '추천받기'
                        )}
                    </Button>
                </div>

                {recommendations.length > 0 && (
                    <div className="space-y-3 pt-2">
                        {recommendations.map((rec, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white rounded-lg border border-primary/20 space-y-1"
                            >
                                <h4 className="font-semibold text-primary">{rec.name}</h4>
                                <p className="text-sm text-muted-foreground">{rec.reason}</p>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
