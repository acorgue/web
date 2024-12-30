import { NextRequest, NextResponse } from "next/server";
import redirects from "./redirects.json" with { type: "json" };

interface RedirectEntry {
  permanent: boolean;
  destination: string;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const redirectEntry = (redirects as Record<string, RedirectEntry>)[
    url.pathname
  ];
  if (redirectEntry) {
    const statusCode = redirectEntry.permanent ? 308 : 307;
    url.pathname = redirectEntry.destination;
    return NextResponse.redirect(url, statusCode);
  }

  return NextResponse.next();
}
