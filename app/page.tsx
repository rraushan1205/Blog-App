"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "default_secret"; // Use public variable for client-side

type User = {
  id: string;
  email: string;
  name: string;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null); // Explicitly define user type
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const cookie = await cookies(); // Wait for cookies to be resolved
      const token = cookie.get("authToken")?.value;

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const decodedUser = jwt.decode(token) as JwtPayload; // Decode without verifying secret
        if (decodedUser && typeof decodedUser !== "string") {
          setUser(decodedUser as User); // Set user if decoded successfully
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/login");
      }
    };

    fetchToken();
  }, [router]);

  return (
    <div>
      {user ? <h1>Welcome, {user.name}!</h1> : <h1>Redirecting to login...</h1>}
    </div>
  );
}
