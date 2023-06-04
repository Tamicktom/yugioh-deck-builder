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
    <form action={tryLogin} className="flex flex-col justify-center items-center text-black">
      <input type="text" name="email" id="email" placeholder="Email" />
      <input type="password" name="password" id="password" placeholder="Password" />
      <button type="submit" className="text-white">Login</button>
    </form>
  );
}