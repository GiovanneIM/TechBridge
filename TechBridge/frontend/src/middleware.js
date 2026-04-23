import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');

    // Se não tiver um token -> Sem usuário
    if (!token) {
        return NextResponse.redirect(
            new URL('/acesso-negado', req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/(users)/:path*'
    ]
};