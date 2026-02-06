'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGridProps {
    products: Product[];
}

type Category = 'ALL' | 'SIGNATURE' | 'CLASSIC' | 'VEGAN';

const CATEGORIES: { id: Category; label: string }[] = [
    { id: 'ALL', label: '전체' },
    { id: 'SIGNATURE', label: '시그니처' },
    { id: 'CLASSIC', label: '클래식' },
    { id: 'VEGAN', label: '비건' },
];

export function ProductGrid({ products }: ProductGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');

    const filteredProducts = products.filter((product) => {
        if (selectedCategory === 'ALL') return true;
        // DB의 category 값이 소문자일 수 있으므로 대소문자 무시하고 비교
        return product.category?.toUpperCase() === selectedCategory;
    });

    return (
        <div className="space-y-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                            selectedCategory === category.id
                                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                : "bg-white text-muted-foreground hover:bg-gray-50 border hover:border-primary/20"
                        )}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-12"
                        >
                            <p className="text-muted-foreground">
                                {products.length === 0
                                    ? "등록된 상품이 없습니다."
                                    : "해당 카테고리의 상품이 없습니다."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
