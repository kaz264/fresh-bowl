'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
    };

    return (
        <Link href={`/product/${product.id}`}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900 hover:bg-white">
                        {product.category}
                    </Badge>
                </div>

                <CardContent className="p-5 space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            {product.calories}kcal
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                            단백질 {product.protein}g
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString()}원
                    </span>
                    <Button
                        size="sm"
                        className="gap-2"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        담기
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
