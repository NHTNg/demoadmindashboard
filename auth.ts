import NextAuth from "next-auth";
import { authConfig } from "./authconfig";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./app/lib/utils";
import { User } from "./app/lib/model";
import bcrypt from "bcrypt";



type TypeCredentials = {
  username: string;
  password: string;
};



async function getUser(credentials: TypeCredentials) {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });
    if (!user || !user.isAdmin) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password as unknown as string,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials: any) {
        const user = await getUser(credentials);
        if (user) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
