'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { clearCart } = useCart();
    const [confirming, setConfirming] = useState(true);
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        const confirmPayment = async () => {
            const paymentKey = searchParams.get('paymentKey');
            const orderId = searchParams.get('orderId');
            const amount = searchParams.get('amount');

            if (!paymentKey || !orderId || !amount) {
                alert('결제 정보가 올바르지 않습니다.');
                router.push('/cart');
                return;
            }

            try {
                const response = await fetch('/api/payment/confirm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentKey,
                        orderId,
                        amount: Number(amount),
                    }),
                });

                if (!response.ok) {
                    throw new Error('결제 승인에 실패했습니다.');
                }

                const data = await response.json();
                setOrderNumber(data.orderNumber || orderId);
                clearCart();
                setConfirming(false);
            } catch (error: any) {
                console.error('결제 승인 오류:', error);
                alert(error.message || '결제 승인 중 오류가 발생했습니다.');
                router.push('/checkout/fail');
            }
        };

        confirmPayment();
    }, [searchParams, router, clearCart]);

    if (confirming) {
        return (
            <div className="container mx-auto px-4 py-12">
                <Card className="max-w-md mx-auto p-12 text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-lg">결제를 확인하고 있습니다...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Card className="max-w-md mx-auto p-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">결제가 완료되었습니다!</h1>
                <p className="text-muted-foreground mb-6">
                    주문이 성공적으로 접수되었습니다.
                </p>

                <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-muted-foreground mb-1">주문번호</p>
                    <p className="font-mono font-semibold text-lg">{orderNumber}</p>
                </div>

                <div className="space-y-2 text-sm text-left mb-6">
                    <p>• 주문 후 30분 이내에 신선하게 준비됩니다</p>
                    <p>• 등록하신 이메일로 주문 확인 메일이 발송됩니다</p>
                    <p>• 주문 내역은 마이페이지에서 확인하실 수 있습니다</p>
                </div>

                <div className="space-y-3">
                    <Button
                        size="lg"
                        className="w-full gap-2"
                        onClick={() => router.push('/')}
                    >
                        홈으로 가기
                        <ArrowRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => router.push('/menu')}
                    >
                        계속 쇼핑하기
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-12">
                <Card className="max-w-md mx-auto p-12 text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                </Card>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
