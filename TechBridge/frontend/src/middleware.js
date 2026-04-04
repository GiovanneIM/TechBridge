import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token');

    if (!token) {
        return NextResponse.redirect(
            new URL('/acesso-negado', req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/suporte/:path*',
        '/dashboard/:path*',
        '/setores/:path*',
        '/tecnicos/:path*',
    ]
};