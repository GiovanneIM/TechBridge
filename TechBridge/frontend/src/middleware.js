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


// - - -


// import { NextRequest, NextResponse } from 'next/server'
// import { jwtVerify } from 'jose'

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value
//   const pathname = req.nextUrl.pathname

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   const { payload } = await jwtVerify(token, SECRET)
//   const cargo = payload.cargo

//   if (pathname === '/dashboard') {
//     if (cargo === 'admin') {
//       return NextResponse.rewrite(
//         new URL('/(admin)/dashboard', req.url)
//       )
//     }

//     if (cargo === 'gerente') {
//       return NextResponse.rewrite(
//         new URL('/(gerente)/dashboard', req.url)
//       )
//     }

//     if (cargo === 'tecnico') {
//       return NextResponse.rewrite(
//         new URL('/(tecnico)/dashboard', req.url)
//       )
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/dashboard', '/(admin|gerente|tecnico)/:path*'],
// }



// - - -



// import { NextRequest, NextResponse } from 'next/server'
// import { jwtVerify } from 'jose'

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value
//   const pathname = req.nextUrl.pathname

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   try {
//     const { payload } = await jwtVerify(token, SECRET)
//     const cargo = payload.cargo as string

//     // 🔐 proteção por grupo
//     if (pathname.startsWith('/admin') && cargo !== 'admin') {
//       return NextResponse.redirect(new URL('/acesso-negado', req.url))
//     }

//     if (pathname.startsWith('/gerente') && cargo !== 'gerente') {
//       return NextResponse.redirect(new URL('/acesso-negado', req.url))
//     }

//     if (pathname.startsWith('/tecnico') && cargo !== 'tecnico') {
//       return NextResponse.redirect(new URL('/acesso-negado', req.url))
//     }

//     return NextResponse.next()
//   } catch {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }
// }

// export const config = {
//   matcher: ['/(admin|gerente|tecnico)/:path*'],
// }