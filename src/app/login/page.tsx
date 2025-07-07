"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReactFormState } from "react-dom/client";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Login Error: ", result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account?</p>
        <a href="/register">Register</a>
      </div>
    </div>
  );
}

export default LoginPage;
