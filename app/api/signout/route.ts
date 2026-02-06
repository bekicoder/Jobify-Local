import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Create redirect response to /
  const response = NextResponse.redirect(
    new URL("/", req.nextUrl.origin)
  );

  // Delete JWT cookie
  response.cookies.set({
    name: "jobify-token",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
  });

  return response;
}
