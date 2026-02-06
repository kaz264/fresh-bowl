'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NutritionChart } from '@/components/product/NutritionChart';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', params.id)
                .single();

            if (!error && data) {
                setProduct(data);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [params.id]);

    const handleAddToCart = () => {
        if (!product) return;

        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }

        router.push('/cart');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="h-96 flex flex-col items-center justify-center gap-4">
                    <p className="text-muted-foreground">상품을 찾을 수 없습니다.</p>
                    <Button onClick={() => router.push('/menu')}>메뉴로 돌아가기</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Button
                variant="ghost"
                className="mb-8"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                뒤로 가기
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* 이미지 */}
                <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                        src={product.image_url || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'} // Fallback image
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                        {product.category}
                    </Badge>
                </div>

                {/* 정보 */}
                <div className="flex flex-col">
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
                            <p className="text-lg text-muted-foreground">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-primary">
                                {product.price.toLocaleString()}원
                            </span>
                        </div>

                        <NutritionChart
                            nutrition={{
                                calories: product.calories ?? 0,
                                protein: product.protein ?? 0,
                                carbs: product.carbs ?? 0,
                                fat: product.fat ?? 0,
                            }}
                        />

                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">🌱 이 샐러드의 특별함</h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• 매일 아침 신선하게 준비되는 유기농 재료</li>
                                    <li>• 전문 영양사가 설계한 균형잡힌 영양소</li>
                                    <li>• 주문 즉시 만들어지는 신선함</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 주문 */}
                    <div className="sticky bottom-0 bg-white pt-6 pb-4 border-t mt-8">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-xl font-medium w-12 text-center">
                                    {quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button
                                size="lg"
                                className="flex-1 gap-2"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {(product.price * quantity).toLocaleString()}원 담기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
