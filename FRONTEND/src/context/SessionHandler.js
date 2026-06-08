'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SessionHandler({ children }) {
    const router = useRouter();

    useEffect(() => {
        function handleSessionExpired() {
            alert('Sua sessão expirou. Faça login novamente.');

            router.push('/login');
        }

        window.addEventListener('sessionExpired', handleSessionExpired);

        return () => {
            window.removeEventListener('sessionExpired', handleSessionExpired);
        };
    }, [router]);

    return children;
}