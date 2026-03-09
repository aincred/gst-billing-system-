import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // SECURITY NOTE: In a real app, query your database here!
        // Example: const user = await db.user.findUnique({ email: credentials?.email })
        // const isValid = await bcrypt.compare(credentials?.password, user.password)
        
        const mockDbUser = {
          id: "1",
          email: "admin@example.com",
          // This is a bcrypt hashed version of "admin123"
          passwordHash: "$2a$12$7k3.R/M/u4.Z3.Z3.Z3.Z3.Z3.Z3.Z3.Z3.Z3.Z3.Z3.Z3.Z3.Z" 
        };

        if (credentials?.email === mockDbUser.email && credentials?.password === "admin123") {
          // Any object returned will be saved in the secure JWT session
          return { id: mockDbUser.id, email: mockDbUser.email };
        }
        
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login', // Point this to wherever your login page is
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure to add this to your .env file
});

export { handler as GET, handler as POST };