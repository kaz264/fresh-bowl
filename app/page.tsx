import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIRecommendation } from '@/components/ai/AIRecommendation';
import { createClient } from '@/lib/supabase/server';
import { ProductGrid } from '@/components/product/ProductGrid';

export default async function HomePage() {
  const supabase = await createClient();

  // 인기 메뉴 가져오기 (처음 3개)
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50" />

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% Organic & Fresh</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              신선함이 살아있는
              <br />
              <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                프리미엄 샐러드
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              매일 아침 신선하게 준비된 재료로 만드는 건강한 한 끼.
              <br />
              당신의 하루를 더욱 특별하게 만들어드립니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/menu">
                <Button size="lg" className="gap-2 text-lg px-8">
                  메뉴 둘러보기
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                AI 추천 받기
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* AI Recommendation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">AI Powered</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                오늘의 기분에 맞는 샐러드를 찾아보세요
              </h2>
              <p className="text-muted-foreground">
                AI가 당신의 상태에 꼭 맞는 메뉴를 추천해드립니다
              </p>
            </div>

            <AIRecommendation />
          </div>
        </div>
      </section>

      {/* Popular Menu Section */}
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">Best Sellers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              인기 메뉴
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              많은 분들이 사랑하는 베스트셀러 샐러드를 만나보세요
            </p>
          </div>

          {products && <ProductGrid products={products} />}

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="gap-2">
                전체 메뉴 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% 유기농 재료</h3>
              <p className="text-muted-foreground">
                신선하고 안전한 유기농 재료만을 사용합니다
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">영양 균형</h3>
              <p className="text-muted-foreground">
                전문 영양사가 설계한 균형잡힌 메뉴
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI 맞춤 추천</h3>
              <p className="text-muted-foreground">
                당신에게 딱 맞는 샐러드를 AI가 추천합니다
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
