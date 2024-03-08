import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(request: NextRequest) {
    const token = request.cookies.get('next-auth.session-token')?.value

    const isAuth = !!token;
    const { pathname } = request.nextUrl;
    const direction = ['/', '/register', '/login'];

    if (isAuth) {
      if (direction.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } else {
      if (pathname === '/dashboard') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);
