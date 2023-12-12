import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/schedule/:path*", "/create-patient/:path", "/home/:path"],
};
