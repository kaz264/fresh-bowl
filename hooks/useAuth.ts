'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { User } from '@/types';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 초기 세션 확인
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user as User ?? null);
            setLoading(false);
        });

        // 인증 상태 변경 감지
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user as User ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    };

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { data, error };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    };

    const signInWithProvider = async (provider: 'google' | 'kakao') => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${window.location.origin}/menu`,
            },
        });
        return { data, error };
    };

    return {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithProvider,
    };
}
