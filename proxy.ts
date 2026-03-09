import { withAuth } from "next-auth/middleware";

// Explicitly export the default function to satisfy Next.js
export default withAuth;

export const config = {
  // Protects the dashboard and all nested routes under it
  matcher: ["/dashboard/:path*"]
};