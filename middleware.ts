import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if the request is for the root URL ("/")
  if (req.nextUrl.pathname === '/') {
    // Redirect to the sign-in page
    return NextResponse.redirect(new URL('/sign-in-page', req.url));
  }
  
  // Allow other requests to continue normally
  return NextResponse.next();
}