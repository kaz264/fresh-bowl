import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const { paymentKey, orderId, amount } = await request.json();

        if (!paymentKey || !orderId || !amount) {
            return NextResponse.json(
                { error: '필수 파라미터가 누락되었습니다.' },
                { status: 400 }
            );
        }

        const secretKey = process.env.TOSS_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json(
                { error: '토스페이먼츠 시크릿 키가 설정되지 않았습니다.' },
                { status: 500 }
            );
        }

        // 토스페이먼츠 서버에 최종 승인 요청
        const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentKey,
                orderId,
                amount,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '결제 승인에 실패했습니다.');
        }

        const paymentData = await response.json();

        // Supabase에 주문 저장
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const { error: dbError } = await supabase
            .from('orders')
            .insert({
                user_id: user?.id || null,
                order_number: orderId,
                total_amount: amount,
                payment_status: 'completed',
                payment_key: paymentKey,
                payment_method: paymentData.method,
                order_items: {}, // 클라이언트에서 전달받아야 함 (장바구니 아이템)
                customer_name: paymentData.customerName,
                customer_email: paymentData.customerEmail,
                customer_phone: paymentData.customerMobilePhone,
            });

        if (dbError) {
            console.error('DB 저장 오류:', dbError);
            throw new Error('주문 정보 저장에 실패했습니다.');
        }

        return NextResponse.json({
            success: true,
            orderNumber: orderId,
            payment: paymentData,
        });

    } catch (error: any) {
        console.error('결제 승인 오류:', error);
        return NextResponse.json(
            { error: error.message || '결제 승인 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
