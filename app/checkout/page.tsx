'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { nanoid } from 'nanoid';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const totalPrice = getTotalPrice();

    useEffect(() => {
        if (items.length === 0) {
            router.push('/cart');
        }
    }, [items, router]);

    const handlePayment = async () => {
        if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        setLoading(true);

        try {
            const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
            if (!clientKey) {
                throw new Error('토스페이먼츠 클라이언트 키가 설정되지 않았습니다.');
            }

            const tossPayments = await loadTossPayments(clientKey);
            const orderId = nanoid();

            // 토스페이먼츠 결제 요청
            await tossPayments.requestPayment('카드', {
                amount: totalPrice,
                orderId: orderId,
                orderName: items.length > 1
                    ? `${items[0].product.name} 외 ${items.length - 1}건`
                    : items[0].product.name,
                customerName: customerInfo.name,
                customerEmail: customerInfo.email,
                customerMobilePhone: customerInfo.phone,
                successUrl: `${window.location.origin}/checkout/success?orderId=${orderId}`,
                failUrl: `${window.location.origin}/checkout/fail`,
            });
        } catch (error: any) {
            console.error('결제 오류:', error);
            alert(error.message || '결제 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-6 gap-2"
            >
                <ArrowLeft className="h-4 w-4" />
                돌아가기
            </Button>

            <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 주문 정보 입력 */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">이름 *</label>
                                <Input
                                    type="text"
                                    value={customerInfo.name}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                    placeholder="홍길동"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">이메일 *</label>
                                <Input
                                    type="email"
                                    value={customerInfo.email}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">전화번호 *</label>
                                <Input
                                    type="tel"
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                    placeholder="01012345678"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">배송 주소</label>
                                <Input
                                    type="text"
                                    value={customerInfo.address}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                    placeholder="서울시 강남구 테헤란로 123"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* 주문 요약 */}
                <div>
                    <Card className="p-6 sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">주문 상품</h2>

                        <div className="space-y-3 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <div>
                                        <div className="font-medium">{item.product.name}</div>
                                        <div className="text-muted-foreground">수량: {item.quantity}</div>
                                    </div>
                                    <div className="font-medium">
                                        {(item.product.price * item.quantity).toLocaleString()}원
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">상품 금액</span>
                                <span>{totalPrice.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">배송비</span>
                                <span className="text-primary font-medium">무료</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t mb-6">
                            <span className="text-lg font-semibold">총 결제 금액</span>
                            <span className="text-2xl font-bold text-primary">
                                {totalPrice.toLocaleString()}원
                            </span>
                        </div>

                        <Button
                            size="lg"
                            className="w-full gap-2"
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {loading ? '결제 처리 중...' : (
                                <>
                                    <CreditCard className="h-5 w-5" />
                                    결제하기
                                </>
                            )}
                        </Button>

                        <p className="text-xs text-muted-foreground mt-4 text-center">
                            결제는 토스페이먼츠를 통해 안전하게 처리됩니다.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
