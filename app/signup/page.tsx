'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, User, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function SignupPage() {
    const router = useRouter();
    const { signUp, signInWithProvider } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        setLoading(true);

        const { data, error } = await signUp(email, password);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setTimeout(() => {
                router.push('/menu');
            }, 2000);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'kakao') => {
        setSocialLoading(true);
        setError('');

        const { error } = await signInWithProvider(provider);

        if (error) {
            setError(error.message);
            setSocialLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <User className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">회원가입 완료!</h2>
                        <p className="text-muted-foreground">
                            이메일 인증 링크를 확인해주세요.
                            <br />
                            곧 메뉴 페이지로 이동합니다...
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
                    <CardDescription>
                        Fresh Bowl과 함께 건강한 식습관을 시작하세요
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                이메일
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                비밀번호
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="최소 6자 이상"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                비밀번호 확인
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="비밀번호를 다시 입력하세요"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={loading || socialLoading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    가입 중...
                                </>
                            ) : (
                                '회원가입'
                            )}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">또는</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => handleSocialLogin('google')}
                            disabled={socialLoading || loading}
                        >
                            <Chrome className="h-5 w-5" />
                            Google로 계속하기
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full gap-2 hover:bg-[#FEE500] hover:text-[#000000] hover:border-[#FEE500]"
                            onClick={() => handleSocialLogin('kakao')}
                            disabled={socialLoading || loading}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3C6.486 3 2 6.262 2 10.298c0 2.625 1.687 4.928 4.219 6.328-.175.644-.656 2.434-.75 2.828-.113.475.175.469.375.344.156-.094 2.531-1.688 2.938-2.016.562.078 1.125.125 1.719.125 5.513 0 9.984-3.262 9.984-7.297C21.984 6.262 17.513 3 12 3z" />
                            </svg>
                            카카오톡으로 계속하기
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">이미 계정이 있으신가요? </span>
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            로그인
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
