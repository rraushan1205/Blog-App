// navbar/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "../main.css";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <nav className="flex justify-between">
        <ul className="flex justify-around gap-5 my-5 mx-5">
          <li className={pathname === "/" ? "active" : "notActive"}>
            <Link href="/">Feed</Link>
          </li>
          <li className={pathname === "/createPost" ? "active" : "notActive"}>
            <Link href="/createPost">Create Post</Link>
          </li>
          <li className={pathname === "/viewPost" ? "active" : "notActive"}>
            <Link href="/viewPost">View Post</Link>
          </li>
        </ul>
        <div className="route my-5 mx-5">
          <Link href="/login">Login</Link>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
