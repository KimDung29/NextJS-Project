import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';


export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const {pathname} = request.nextUrl;

  if (accessToken) {
    if (pathname === '/' || pathname === '/register' || pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } else {
    if (pathname === '/dashboard' ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}
