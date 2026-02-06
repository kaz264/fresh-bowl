'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Loader2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types';

interface Recommendation {
    name: string;
    reason: string;
}

export function AIRecommendation() {
    const [mood, setMood] = useState('');
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const supabase = createClient();

    // 전체 상품 목록 미리 로드 (매칭용)
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase.from('products').select('id, name');
            if (data) setProducts(data as Product[]);
        };
        fetchProducts();
    }, []);

    // 추천 이름과 매칭되는 상품 찾기 (유연한 매칭)
    const findMatchingProduct = (recName: string) => {
        if (!products.length) return null;
        // 괄호 등 부가 정보 제거 (예: "그린 파워 샐러드 (280kcal)" -> "그린 파워 샐러드")
        const cleanRecName = recName.split('(')[0].trim().toLowerCase();

        return products.find(p => {
            const cleanProductName = p.name.toLowerCase();
            return cleanRecName.includes(cleanProductName) || cleanProductName.includes(cleanRecName);
        });
    };

    const handleRecommend = async () => {
        if (!mood.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/ai-recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mood, preference: '' }),
            });

            if (!response.ok) {
                throw new Error(`서버 오류: ${response.status}`);
            }

            const data = await response.json();

            if (!data.recommendations || data.recommendations.length === 0) {
                alert('추천 결과가 없습니다. 다른 검색어로 시도해보세요.');
                return;
            }

            setRecommendations(data.recommendations || []);
        } catch (error) {
            console.error('AI 추천 실패:', error);
            alert('AI 추천을 가져오는 중 문제가 발생했습니다. (잠시 후 다시 시도해주세요)');
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
                        {recommendations.map((rec, index) => {
                            const matchedProduct = findMatchingProduct(rec.name);

                            return (
                                <div
                                    key={index}
                                    className="p-4 bg-white rounded-lg border border-primary/20 space-y-1 transition-colors hover:border-primary/50 relative group"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-primary flex items-center gap-2">
                                                {rec.name}
                                                {matchedProduct && (
                                                    <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                                        주문 가능
                                                    </span>
                                                )}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                                        </div>
                                    </div>

                                    {/* 매칭된 상품이 있으면 전체를 클릭 가능한 링크로 오버레이 */}
                                    {matchedProduct && (
                                        <Link
                                            href={`/product/${matchedProduct.id}`}
                                            className="absolute inset-0 z-10 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5"
                                        >
                                            <Button variant="ghost" size="sm" className="bg-white/90 shadow-sm pointer-events-none">
                                                메뉴 보러가기 <ExternalLink className="ml-2 h-3 w-3" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
