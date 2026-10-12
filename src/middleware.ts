import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { legacyRedirects } from "@/lib/legacyRedirects";

const CANONICAL_HOST = "www.mindwhiz.com";

// ---------------------------------------------------------------------------
// 1. URL canonicalization in a single 301 hop (SEO audit T1/T2).
//    Host (mindwhiz.com -> www), trailing slash and legacy WordPress URLs are
//    resolved together, so /careers-at-mindwhiz/ on the bare domain goes
//    straight to https://www.mindwhiz.com/careers instead of chaining.
//    (next.config sets skipTrailingSlashRedirect so Next does not add its own
//    hop first.)
// ---------------------------------------------------------------------------
function canonicalRedirect(req: NextRequest): NextResponse | null {
  const url = req.nextUrl;
  const host = (req.headers.get("host") ?? "").toLowerCase();
  const isApex = host === "mindwhiz.com";

  let path = url.pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, "") || "/";
  const legacy = legacyRedirects[path.toLowerCase()];
  if (legacy) path = legacy;

  if (!isApex && path === url.pathname) return null;

  // Production host only; previews and localhost keep their own host.
  const target = isApex || host === CANONICAL_HOST ? `https://${CANONICAL_HOST}` : url.origin;
  return NextResponse.redirect(`${target}${path}${url.search}`, 301);
}

// ---------------------------------------------------------------------------
// 2. Protect every /admin route (and the admin API) except the login page and
//    the login endpoint itself. Unauthenticated users go to /admin/login.
// ---------------------------------------------------------------------------
async function adminGuard(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  if (isLoginPage || isLoginApi) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const authed = await verifySessionToken(token);
  if (authed) return NextResponse.next();

  // API calls get a 401; page navigations get redirected to the login screen.
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    return adminGuard(req);
  }
  if (pathname.startsWith("/api/")) return NextResponse.next();
  return canonicalRedirect(req) ?? NextResponse.next();
}

export const config = {
  // Everything except Next internals and static files (anything with an
  // extension, e.g. /sitemap.xml, /robots.txt, images).
  matcher: ["/((?!_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)"],
};
