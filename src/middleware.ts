import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/doctor/:path*",
    "/home/:path*",
    "/patients/:path*",
    "/schedule/:path*",
  ],
};
