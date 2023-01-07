import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { useAxios } from "utils/axios";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    /** ユーザーID/Passwordでの認証 */
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "xxx@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      //
      async authorize(credentials, req) {
        console.log("authorize!!!!!!!!");
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        const res = await axios
          .post(`${process.env.NEXT_PUBLIC_STAGING_API_URL}signin`, credentials)
          .then((res) => {
            console.log(res);
            res.data.status;
            return res;
          })
          .catch((err) => {
            console.log(err);
            return err;
          });

        if (res.status === 200) {
          return user;
        } else {
          return null;
        }
      },
    }),

    // ...add more providers here
  ],
  callbacks: {
    // 
    async session({ session, token, user }) {
      console.log('session!!!!!!')
      console.log('token!!!', token)
      session.user.accessToken = token.accessToken;
      return session;
    },
    // 
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
