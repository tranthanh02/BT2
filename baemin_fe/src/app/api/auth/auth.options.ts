import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from "dayjs";

import { authServices } from "@/services";

// async function refreshAccessToken(token: JWT) {
//   const res = await sendRequest<IBackendRes<JWT>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
//     method: "POST",
//     body: { refresh_token: token?.refresh_token },
//   });

//   if (res.data) {
//     return {
//       ...token,
//       access_token: res.data?.access_token ?? "",
//       refresh_token: res.data?.refresh_token ?? "",
//       access_expire: dayjs(new Date())
//         .add(
//           +(process.env.TOKEN_EXPIRE_NUMBER as string),
//           process.env.TOKEN_EXPIRE_UNIT as any
//         )
//         .unix(),
//       error: "",
//     };
//   } else {
//     //failed to refresh token => do nothing
//     return {
//       ...token,
//       error: "RefreshAccessTokenError", // This is used in the front-end, and if present, we can force a re-login, or similar
//     };
//   }
// }

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Tên đăng nhập", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await authServices.login({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (res && res.data) {
          // Any object returned will be saved in `user` property of the JWT
          return res.data.content as any;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // return null
          //@ts-ignore
          throw new Error(res?.message as string);

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        console.log("user", user);
        //@ts-ignore
        token.access_token = user.access_token;
        //@ts-ignore
        token.refresh_token = user.refresh_token;
        //@ts-ignore
        token.user = user.user;
        //@ts-ignore
        //   token.access_expire = dayjs(new Date())
        //     .add(
        //       +(process.env.TOKEN_EXPIRE_NUMBER as string),
        //       process.env.TOKEN_EXPIRE_UNIT as any
        //     )
        //     .unix();
      }

      // const isTimeAfter = dayjs(dayjs(new Date())).isAfter(
      //   dayjs.unix((token?.access_expire as number) ?? 0)
      // );

      // if (isTimeAfter) {
      //   return refreshAccessToken(token);
      // }

      return token;
    },
    session({ session, token, user }) {
      if (token) {
        //@ts-ignore
        session.access_token = token.access_token;
        //@ts-ignore
        session.refresh_token = token.refresh_token;
        //@ts-ignore
        session.user = token.user;
        // session.access_expire = token.access_expire;
        //@ts-ignore
        session.error = token.error;
      }
      return session;
    },
  },
  //   pages: {
  //     signIn: "/auth/signin",
  //     signOut: "/auth/signout",
  //   },
};
