"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error("Registration error: ", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="Password"
          placeholder="Password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </form>
      <button type="submit">Register</button>
      <div>
        <p>Already have an account?</p>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}

export default Register;
