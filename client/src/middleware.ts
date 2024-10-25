import { getToken, decode } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import UserPermissions from "./permission";

export default withAuth(
  // Callback does first, then middleware does.
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const pathname = req.nextUrl.pathname;

    // First login
    if(pathname.match(/\/profile(?!\/)/g) || pathname === '/'){
      switch (token?.role) {
        case UserPermissions().employee?.toString():
          return NextResponse.redirect(new URL('/profile/employee', req.url))
        case UserPermissions().admin?.toString():
          return NextResponse.redirect(new URL('/profile/admin/assessments-status', req.url))
        case UserPermissions().student?.toString():
          return NextResponse.redirect(new URL('/profile/student', req.url))
        default:
          return NextResponse.error()
      }
    }

    // Employee
    if (
      pathname.match(/\/profile\/employee(?:\/assessments(?:\/.*)?)?/g) &&
      token?.role !== UserPermissions().employee?.toString()
    ) {
      return NextResponse.error()
    }
    // Student
    if (
      pathname.match(/\/profile\/student(?:\/dashboard)?/g) &&
      token?.role !== UserPermissions().student?.toString()
    ) {
      return NextResponse.error()
    }

    // Admin
    if (
      pathname.match(/\/profile\/admin(?:\/assessments-status(?:\/.*)?)?(?:\/assessments)?(?:\/register(?:\/.*)?)?/g) &&
      token?.role !== UserPermissions().admin?.toString()
    ) {
      return NextResponse.error()
    }
    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/auth/signIn',
      error: '/auth/error',
    },
    callbacks: {
      authorized: async ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|./|favicon.ico).*)"],
};
