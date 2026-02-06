'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Calendar, CreditCard } from 'lucide-react';

interface Order {
    id: string;
    order_number: string;
    total_amount: number;
    payment_status: string;
    payment_method: string | null;
    order_items: any;
    customer_name: string | null;
    created_at: string;
}

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('주문 조회 오류:', error);
            } else {
                setOrders(data || []);
            }

            setLoading(false);
        };

        fetchOrders();
    }, [supabase, router]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">주문 내역</h1>

                {orders.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">주문 내역이 없습니다</h2>
                        <p className="text-muted-foreground mb-6">
                            신선한 샐러드를 주문해보세요!
                        </p>
                        <Button onClick={() => router.push('/menu')}>
                            메뉴 둘러보기
                        </Button>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="p-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <h3 className="font-semibold mb-1">주문번호</h3>
                                        <p className="text-sm font-mono text-muted-foreground">
                                            {order.order_number}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-1 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            주문일시
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(order.created_at).toLocaleString('ko-KR')}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-1 flex items-center gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            결제 금액
                                        </h3>
                                        <p className="text-lg font-bold text-primary">
                                            {order.total_amount.toLocaleString()}원
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm ${order.payment_status === 'completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.payment_status === 'completed' ? '결제완료' : '대기중'}
                                            </span>
                                            {order.payment_method && (
                                                <span className="ml-2 text-sm text-muted-foreground">
                                                    ({order.payment_method})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
