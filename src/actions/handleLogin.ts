"use server";
import { FirebaseError } from "firebase/app";
import firebase from "@/services/connectFirebase";
import { log } from "console";
import z from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type HandleLoginReturn = {
  error: boolean;
  code?: string;
  user?: {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    token: string;
    name?: string;
    profilePicture?: string;
  };
};

export default async function handleLogin(
  form: FormData
): Promise<HandleLoginReturn> {
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();

  const credentials = credentialsSchema.safeParse({
    email,
    password,
  });

  if (!credentials.success) {
    return {
      error: true,
      code: "invalid-credentials",
    };
  }

  const res: HandleLoginReturn = await firebase
    .auth()
    .signInWithEmailAndPassword(
      credentials.data.email,
      credentials.data.password
    )
    .then(async (user) => {
      if (!user) return { error: true, code: "no user" };
      if (!user.user) return { error: true, code: "no user.user" };
      const token = await user.user.getIdToken();
      return {
        error: false,
        user: {
          uid: user.user.uid,
          email: user.user.email || "",
          name: user.user.displayName || "",
          emailVerified: user.user.emailVerified,
          isAnonymous: user.user.isAnonymous,
          token,
          profilePicture: user.user.photoURL || undefined,
        },
      };
    })
    .catch((err) => {
      if (err instanceof FirebaseError) {
        return {
          error: true,
          code: err.code,
        };
      }
      return {
        error: true,
        code: "unknown",
      };
    });

  return res;
}
