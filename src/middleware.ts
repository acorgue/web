import { redirects as orguesRedirects } from "@/app/[locale]/(markdown)/orgues/redirects";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const redirectEntry = orguesRedirects[url.pathname];
  if (redirectEntry) {
    const statusCode = redirectEntry.permanent ? 308 : 307;
    url.pathname = redirectEntry.destination;
    return NextResponse.redirect(url, statusCode);
  }

  return createMiddleware(routing)(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
