'use client';

import Link from 'next/link';
import { ShoppingCart, User, Salad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
    const { getTotalItems } = useCart();
    const { user, signOut } = useAuth();
    const totalItems = getTotalItems();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Salad className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                        Fresh Bowl
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/menu" className="text-sm font-medium hover:text-primary transition-colors">
                        메뉴
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        소개
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                        문의
                    </Link>
                    {user && (
                        <Link href="/orders" className="text-sm font-medium hover:text-primary transition-colors">
                            주문내역
                        </Link>
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {totalItems > 0 && (
                                <Badge
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary"
                                >
                                    {totalItems}
                                </Badge>
                            )}
                        </Button>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground hidden md:inline">
                                {user.email}
                            </span>
                            <Button variant="outline" size="sm" onClick={() => signOut()}>
                                로그아웃
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button size="sm" className="gap-2">
                                <User className="h-4 w-4" />
                                로그인
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
