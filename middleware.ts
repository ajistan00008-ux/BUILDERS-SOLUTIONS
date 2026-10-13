import { NextResponse, type NextRequest } from 'next/server';

/**
 * /rosemary/plan is the internal trade plan: supplier names, FOB costs, the
 * target discount off MRP, landed cost and margins. `robots: noindex` on the
 * page only keeps crawlers out — anyone holding the URL could still read it.
 *
 * So the route is gated here with HTTP Basic auth, and it fails CLOSED: if the
 * credentials are not configured in the environment the page is unavailable
 * rather than public. Set PLAN_USER and PLAN_PASSWORD in the Vercel project
 * (all environments, including Preview) to open it.
 */

const REALM = 'ROSEMARY.BH internal';

function unauthorized(message: string) {
  return new NextResponse(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

/** Length-independent comparison, so a wrong password leaks no timing signal. */
function sameSecret(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const user = process.env.PLAN_USER;
  const password = process.env.PLAN_PASSWORD;

  // Fail closed. An unset secret must not mean "let everyone in".
  if (!user || !password) {
    return new NextResponse(
      'This page is not available. Set PLAN_USER and PLAN_PASSWORD in the environment to enable it.',
      {
        status: 404,
        headers: {
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      }
    );
  }

  const header = req.headers.get('authorization') ?? '';
  const [scheme, encoded] = header.split(' ');

  if (scheme !== 'Basic' || !encoded) return unauthorized('Authentication required.');

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized('Malformed credentials.');
  }

  // Only the first colon separates user from password.
  const sep = decoded.indexOf(':');
  if (sep === -1) return unauthorized('Malformed credentials.');

  const ok =
    sameSecret(decoded.slice(0, sep), user) && sameSecret(decoded.slice(sep + 1), password);

  if (!ok) return unauthorized('Invalid credentials.');

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export const config = {
  matcher: ['/rosemary/plan', '/rosemary/plan/:path*'],
};
