import type { DefaultUser, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      email?: string;
      username?: string;
      img?: string;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    username: string;
    img: string;
    email: string;
  }
}
