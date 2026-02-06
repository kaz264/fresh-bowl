'use client';

import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CartItem } from '@/components/cart/CartItem';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCart();
    const totalPrice = getTotalPrice();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">장바구니</h1>

                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground/30" />
                    <h2 className="text-2xl font-semibold">장바구니가 비어있습니다</h2>
                    <p className="text-muted-foreground">
                        신선한 샐러드를 장바구니에 담아보세요!
                    </p>
                    <Button
                        size="lg"
                        onClick={() => router.push('/menu')}
                        className="gap-2 mt-4"
                    >
                        메뉴 둘러보기
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">장바구니</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 장바구니 아이템 목록 */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                {/* 주문 요약 */}
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-24 space-y-4">
                        <h2 className="text-xl font-semibold">주문 요약</h2>

                        <div className="space-y-2 pt-4 border-t">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">상품 금액</span>
                                <span>{totalPrice.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">배송비</span>
                                <span className="text-primary font-medium">무료</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                            <span className="text-lg font-semibold">총 결제 금액</span>
                            <span className="text-2xl font-bold text-primary">
                                {totalPrice.toLocaleString()}원
                            </span>
                        </div>

                        <Button size="lg" className="w-full gap-2 mt-4">
                            주문하기
                            <ArrowRight className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={clearCart}
                        >
                            장바구니 비우기
                        </Button>

                        <div className="pt-4 space-y-2 text-xs text-muted-foreground">
                            <p>• 주문 후 30분 이내 신선하게 준비됩니다</p>
                            <p>• 서울/경기 지역 무료 배송</p>
                            <p>• 3만원 이상 주문 시 에코백 증정</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
