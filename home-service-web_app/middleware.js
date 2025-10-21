import { authMiddleware } from '@descope/nextjs-sdk/server'
import { NextResponse } from 'next/server';
import { getSession } from '@descope/nextjs-sdk/server';

export async function middleware(request) {
  // List of protected routes
  const protectedRoutes = [ '/dashboard', '/profile']; // add your protected routes here

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    const session = await getSession(request);

    if (!session?.user) {
      // Not authenticated, redirect to signin
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export default authMiddleware({
  // Your Descope project ID
  projectId: 'P32zpUpcGHB0RaI1g5gQq0KetMqu',

  // An array of public routes that do not require authentication.
  // We are adding '/' to make your home page accessible to everyone.
  publicRoutes: ['/']
})

export const config = {
  // The matcher tells the middleware which paths to run on.
  // This default configuration is usually what you want.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}