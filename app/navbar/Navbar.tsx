// navbar/Navbar.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getCookie } from "cookies-next/client";
import "../main.css";
interface CustomJwtPayload extends JwtPayload {
  email?: string;
  name?: string; // Add any other fields you expect in the JWT
}
const Navbar = () => {
  const [jwtDecoded, setJwtDecoded] = useState<CustomJwtPayload | null>(null);
  const pathname = usePathname();
  const token = getCookie("auth_token");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/User/logout", { method: "GET" });
      setJwtDecoded(null);
      // router.replace("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useEffect(() => {
    if (typeof token === "string") {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setJwtDecoded(decoded);
      // console.log(decoded);
    } else {
      console.log("Token is undefined or not a string");
    }
  }, [token]);
  // console.log(jwtDecoded?.name);
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
        <section className="flex">
          <div className="route my-5 mx-5">
            {jwtDecoded ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
          <div className="route my-5 mx-5">
            {jwtDecoded ? <p>{jwtDecoded?.name}</p> : <p> </p>}
          </div>
        </section>
      </nav>
    </>
  );
};
export default Navbar;
