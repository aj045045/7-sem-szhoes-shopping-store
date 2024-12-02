import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const privatePath = ["/admin", "/u/customer"];
    const isPrivatePath = privatePath.some(p => path.startsWith(p));
    const token = request.cookies.get('token');
    if (isPrivatePath && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/u/customer/:path*']
}
