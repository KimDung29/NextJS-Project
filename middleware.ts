import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';


export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');
  const {pathname} = request.nextUrl;
  const direction = ['/', '/register', '/login'];

  if (refreshToken?.value) {
    if (direction.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } else {
    if (pathname === '/dashboard' ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}
