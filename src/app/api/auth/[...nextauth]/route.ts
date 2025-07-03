import { authService } from "@/services/service/auth-service";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { use } from "react";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET not set");
}
const EXPIRED_TIME = Date.now() + 1000 * 60 * 60;
const REQUIRE_2FA = true;
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
  secret: process.env.NEXTAUTH_SECRET,
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
            require2FA: REQUIRE_2FA,
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
    signIn: "/signin/1212",
    error: "/signin",
    verifyRequest: "/verify-2fa",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          console.log("user :>> ", user);
          console.log("account :>> ", account);
          console.log("profile :>> ", profile);
        }
        if (account?.provider === "credentials") {
          account.accessToken = user.accessToken;
          account.refreshToken = user.refreshToken;
          account.accessTokenExpires = user.accessTokenExpires;
          account.require2FA = user.require2FA;
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
        token.require2FA = user!.require2FA;
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
          accessTokenExpires: token.accessTokenExpires,
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
