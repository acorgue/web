import { redirects as orguesRedirects } from "@/app/orgues/redirects";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const redirectEntry = orguesRedirects[url.pathname];
  if (redirectEntry) {
    const statusCode = redirectEntry.permanent ? 308 : 307;
    url.pathname = redirectEntry.destination;
    return NextResponse.redirect(url, statusCode);
  }

  return NextResponse.next();
}
