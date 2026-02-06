import Link from 'next/link';
import { Salad, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-gray-50/50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Salad className="h-5 w-5 text-primary" />
                            <span className="font-bold text-lg">Fresh Bowl</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            신선하고 건강한 프리미엄 샐러드로<br />
                            당신의 하루를 더욱 특별하게
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">메뉴</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/menu" className="text-muted-foreground hover:text-primary">전체 메뉴</Link></li>
                            <li><Link href="/menu?category=signature" className="text-muted-foreground hover:text-primary">시그니처</Link></li>
                            <li><Link href="/menu?category=classic" className="text-muted-foreground hover:text-primary">클래식</Link></li>
                            <li><Link href="/menu?category=vegan" className="text-muted-foreground hover:text-primary">비건</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">고객 지원</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">회사 소개</Link></li>
                            <li><Link href="/faq" className="text-muted-foreground hover:text-primary">자주 묻는 질문</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">문의하기</Link></li>
                            <li><Link href="/terms" className="text-muted-foreground hover:text-primary">이용약관</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">소셜 미디어</h3>
                        <div className="flex gap-3">
                            <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                                <Instagram className="h-4 w-4 text-primary" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                                <Facebook className="h-4 w-4 text-primary" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                                <Twitter className="h-4 w-4 text-primary" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                    <div className="text-center text-sm text-muted-foreground space-y-2">
                        <p><strong>Fresh Bowl</strong> | 신선함이 가득한 프리미엄 샐러드</p>
                        <p>경기도 성남시 분당구 판교역로 136 B2073호</p>
                        <p>
                            <a href="mailto:hello@freshbowl.ai" className="hover:text-primary">hello@freshbowl.ai</a>
                            {' '} | {' '}
                            <a href="https://www.freshbowl.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">www.freshbowl.ai</a>
                        </p>
                        <p className="mt-4">© 2026 Fresh Bowl. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
