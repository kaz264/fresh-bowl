'use client';

import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="flex gap-4 p-4 bg-white rounded-lg border">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base">{item.product.name}</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mt-1"
                        onClick={() => removeItem(item.product.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                    {item.product.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    <span className="font-bold text-lg text-primary">
                        {(item.product.price * item.quantity).toLocaleString()}원
                    </span>
                </div>
            </div>
        </div>
    );
}
