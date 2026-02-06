import { createClient } from '@/lib/supabase/server';
import { ProductGrid } from '@/components/product/ProductGrid';

export default async function MenuPage() {
    const supabase = await createClient();

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">메뉴</h1>
                <p className="text-lg text-muted-foreground">
                    신선하고 건강한 프리미엄 샐러드를 만나보세요
                </p>
            </div>

            {products && products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">상품이 준비 중입니다.</p>
                </div>
            )}
        </div>
    );
}
