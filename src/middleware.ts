// middleware.ts (raíz del proyecto, mismo nivel que app/)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (
      user === process.env.DOOR_CHECKIN_USER &&
      pwd === process.env.DOOR_CHECKIN_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Door Check-in"' },
  });
}

// 🔒 Solo aplica esta protección a la página de check-in y a su API.
// El resto de tu web (landing, formulario de registro, etc.) sigue siendo público.
export const config = {
  matcher: ['/door-checkin/:path*', '/api/door-checkin/:path*'],
};
