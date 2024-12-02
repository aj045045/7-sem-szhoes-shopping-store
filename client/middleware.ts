import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isCustomer = path.startsWith("/u/customer");
    // const isAdmin = path.startsWith("/admin",);
    const token = request.cookies.get('token');
    if (isCustomer && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    // if (isAdmin && !token) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }   
    NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/u/customer/:path*']
}
