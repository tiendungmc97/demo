import { authService } from "@/services/service/auth-service";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET not set");
}
const EXPIRED_TIME = Date.now() + 1000 * 60 * 60;
async function refreshAccessToken(token: any) {
  try {
    const res = await authService.refreshToken(token.refreshToken);
    return {
      ...token,
      accessToken: res.data!.access_token,
      refreshToken: res.data!.refresh_token,
      accessTokenExpires: EXPIRED_TIME,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = {
            email: credentials!.email,
            password: credentials!.password,
          };
          const res = await authService.login(data);
          const user = {
            id: res.data.access_token,
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
            accessTokenExpires: EXPIRED_TIME,
          };
          return user;
        } catch (err) {
          console.error("Credentials authorize error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "credentials") {
          account.access_token = user.accessToken;
          account.refresh_token = user.refreshToken;
          account.accessTokenExpires = user.accessTokenExpires;
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = user!.accessToken;
        token.refreshToken = user!.refreshToken;
        token.accessTokenExpires = user!.accessTokenExpires;
      }
      if (user?.accessTokenExpires && Date.now() < user?.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.expires = new Date(EXPIRED_TIME).toISOString();
        session.user = {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        } as User;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
