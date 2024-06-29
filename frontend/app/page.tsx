"use client";

import { checkUser } from "@/actions/main";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log({ email, password });
    if (email === "admin@mail.com") {
      window.localStorage.setItem("blkusr", "admin");
      router.push("/dashboard");
    } else {
      window.localStorage.setItem("blkusr", "registrar");
      router.push("registrar");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-8">
          Welcome to IDForAll
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <div>
            <button className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
