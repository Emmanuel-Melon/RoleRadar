import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("session", session);

  // Check if the request is for an auth page
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

  if (!session && !isAuthPage) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (session && isAuthPage) {
    // Redirect authenticated users away from auth pages
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

