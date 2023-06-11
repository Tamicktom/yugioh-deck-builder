"use client";
import { useState } from "react";
import { redirect } from "next/navigation"
import z from "zod";

import handleLogin from "@/actions/handleLogin";

export default function LoginForm() {
  const [errors, setErrors] = useState<string>("");

  const tryLogin = async (form: FormData) => {
    const tmp = await handleLogin(form);
    if (tmp.error && tmp.code) {
      return setErrors(tmp.code);
    }
    setErrors("");
    if (tmp.user) {
      localStorage.setItem("user", JSON.stringify(tmp.user));
      redirect("/deckeditor");
    }
  }

  return (
    <form action={tryLogin} className="flex flex-col items-center justify-center gap-4">
      <input className="px-4 py-2 rounded-lg outline-none bg-neutral-600 text-neutral-100" type="text" name="email" id="email" placeholder="Email" />
      <input className="px-4 py-2 rounded-lg outline-none bg-neutral-600 text-neutral-100" type="password" name="password" id="password" placeholder="Password" />
      <button type="submit" className="px-4 py-2 font-bold uppercase rounded-lg text-neutral-100 bg-neutral-600 hover:bg-neutral-500">Login</button>
    </form>
  );
}