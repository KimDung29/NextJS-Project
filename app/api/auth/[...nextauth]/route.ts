import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { User } from '@/app/models/User';
import * as mongoose from "mongoose";
import type { NextAuthOptions } from "next-auth"
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/app/lib/connect_db/mongoConnect';
import GoogleProvider from "next-auth/providers/google";
 
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET_KEY as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6),  
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          mongoose.connect(process.env.MONGO_URL as string)
          const user = await User.findOne({email});
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email as string;
        const user = await User.findOne({email});

        if (user instanceof Error) {
          return false;
        }
        if (user === null) {
          // const res = await signUpGoogleUser(email, profile?.name as string, profile?.picture as string);

          // if (res instanceof Error) {
          //   return false;
          // }
        }
      }
      return true;
    },
    async session({ token, session }) {
      if (token) {
        

        // session.user = session.user || {}; // Ensure session.user is defined
        // // if (token.name) {
        // //   session.user.name = token.name; // Assign token.name to session.user.name
        // // }
        // if (token.name) {
        //   session.user.name = token.name; // Assign token.name to session.user.name (if necessary)
        // }
        // if (token.email) {
        //   session.user.email = token.email; // Assign token.email to session.user.email (if necessary)
        // }
        // session.user.image = token.picture;
        // session.user.role = token.role;
      }
    
      return session;
    },
    
    async jwt({ token, user }) {
      if (user) {
        // token.name = user.name;
        token.name = user.id;
        token.email = user.email;
        // token.picture = user.image;
        // token.role = user.email && isAdmin(user.email) ? 'admin' : 'normal';
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
