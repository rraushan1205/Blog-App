// app/page.tsx
"use client";
import Link from "next/link";

export default function Auth() {
  return (
    <div className="flex justify-center">
      <div className="flex my-[100px] mx-[100px] border-2 border-gray-500 w-fit px-10 py-5 ">
        <div className="flex flex-col justify-center items-center ">
          <h1>Login</h1>
          <form
            action="/api/User/login"
            method="post"
            className="flex flex-col gap-y-2"
          >
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              className="text-black px-2 outline-none"
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              className="text-black px-2 outline-none"
            />

            <div className="flex justify-center py-2">
              <button
                type="submit"
                id="log"
                className="px-5 py-1 bg-slate-600 w-fit rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
          <section className="my-5">
            New User?{" "}
            <span className="text-blue-700">
              <Link href="/signup">SignUp</Link>
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}
