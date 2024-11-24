import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const privatePath = ["/admin", "/profile"];
    const isPrivatePath = privatePath.some(p => path.startsWith(p));
    const token = request.cookies.get("token-storage")?.value || "";
    if (isPrivatePath && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    NextResponse.next();

}

export const config = {
    matcher: ['/admin/:path*', '/customer/:path*']
}
