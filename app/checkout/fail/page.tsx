'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';

function FailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorMessage = searchParams.get('message') || '결제에 실패했습니다.';
    const errorCode = searchParams.get('code');

    return (
        <div className="container mx-auto px-4 py-12">
            <Card className="max-w-md mx-auto p-8 text-center">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">결제 실패</h1>
                <p className="text-muted-foreground mb-6">{errorMessage}</p>

                {errorCode && (
                    <div className="bg-red-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-muted-foreground mb-1">오류 코드</p>
                        <p className="font-mono font-semibold">{errorCode}</p>
                    </div>
                )}

                <div className="space-y-3">
                    <Button
                        size="lg"
                        className="w-full gap-2"
                        onClick={() => router.push('/cart')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        장바구니로 돌아가기
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => router.push('/')}
                    >
                        홈으로 가기
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-6">
                    문제가 계속되면 <a href="/contact" className="text-primary hover:underline">고객센터</a>로 문의해주세요.
                </p>
            </Card>
        </div>
    );
}

export default function FailPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-12">
                <Card className="max-w-md mx-auto p-12 text-center">
                    <div className="h-12"></div>
                </Card>
            </div>
        }>
            <FailContent />
        </Suspense>
    );
}
