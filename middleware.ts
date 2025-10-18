import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "user_unique_id";

export function middleware(request: NextRequest) {
  let userId = request.cookies.get(COOKIE_NAME)?.value;

  if (!userId) {
    userId = uuidv4();

    const response = NextResponse.next();

    response.cookies.set(COOKIE_NAME, userId, {
      maxAge: 60 * 60 * 24 * 365, // 1 ano
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
