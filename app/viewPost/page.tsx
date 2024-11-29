"use client";
import { useEffect, useState } from "react";
import Skeleton from "../routePageSkeleton/skeleton";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getCookie } from "cookies-next/client";
interface CustomJwtPayload extends JwtPayload {
  id?: string;
  email?: string;
  name?: string; // Add any other fields you expect in the JWT
}
export default function viewPost() {
  const [jwtDecoded, setJwtDecoded] = useState<CustomJwtPayload | null>(null);
  const token = getCookie("auth_token");
  // State to store the Post feed data
  const [postData, setPostData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State for error handling
  // const [id, setId] = useState("");

  useEffect(() => {
    if (typeof token === "string") {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setJwtDecoded(decoded);
      // console.log(decoded);
    } else {
      console.log("Token is undefined or not a string");
    }
    // console.log(jwtDecoded);
  }, [token]);
  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/post/viewPostbyId/${jwtDecoded?.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPostData(data.data);
        setLoading(false);
        // console.log(data);
      } catch (err) {
        setLoading(false);
      }
    };
    if (jwtDecoded?.id) {
      fetchFeedData();
    }
  }, [jwtDecoded]);

  function timeAgo(timestamp: string): string {
    const createdAt = new Date(timestamp);
    const now = Date.now();
    const diffMs = now - createdAt.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (seconds > 0) {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }

    return "Just now"; // For cases where the difference is less than 1 second
  }

  if (loading) {
    return <Skeleton />; // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetch fails
  }

  return (
    <>
      <div className="grid place-content-center text-center">
        <h1 className="text-[30px] my-5">Post Feed</h1>
        <section className="flex flex-col justify-center items-center  px-5">
          {postData &&
            postData.map((post, j) => (
              <div key={j} className=" w-full my-2 mx-5 py-0">
                <div className="mx-5 w-[400px] ">
                  <div className="w-full bg-[#1E1E1E] text-[#CBC544] rounded-md my-5">
                    <div className="head flex justify-between px-5 py-5">
                      <div className="namewithprofile text-[20px] flex gap-2">
                        <div className="s">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </div>
                        <div className="name">{jwtDecoded?.name}</div>
                      </div>
                      <div className="time">{timeAgo(post.createdAt)}</div>
                    </div>
                    <div className="content px-8 py-0 flex flex-col">
                      <span className="flext text-left font-bold text-[20px]">
                        {post.title}
                      </span>
                      <span className="py-5 px-2">{post.content}</span>
                    </div>
                    <div className="footer flex justify-between px-5 pt-5 pb-8">
                      <span className="like flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                        <p>{post.likedBy.length}</p>
                      </span>
                      <span className="comments">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </div>
    </>
  );
}
