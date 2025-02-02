"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "./routePageSkeleton/skeleton";
import Nopost from "./ZeroPost/nopost";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getCookie } from "cookies-next/client";

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  email?: string;
  name?: string;
}
export default function HomePage() {
  const [jwtDecoded, setJwtDecoded] = useState<CustomJwtPayload | null>(null);
  const token = getCookie("auth_token");
  const [feedData, setFeedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshcnt, setRefreshcnt] = useState(0);
  const cmntbox = useRef<HTMLInputElement | null>(null);
  const [inputcmnt, setInputcmnt] = useState("");

  const HandlecmntBox = (postId: String) => {
    console.log("cmnt clicked for", postId, jwtDecoded?.id);
    console.log(cmntbox.current);
    if (cmntbox.current) {
      cmntbox.current.classList.toggle("bg-slate-500");
    }
    console.log(cmntbox.current);
  };
  const HandleEnter = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    postId: String
  ) => {
    if (event.key == "Enter") {
      console.log(inputcmnt);
      setInputcmnt("");
      const response = await fetch(`/api/User/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: inputcmnt,
          postId,
          userId: jwtDecoded?.id,
        }),
      });
    }
  };
  const HandleClick = async (postid: string, userid: string) => {
    console.log(userid);
    const response = await fetch(`/api/post/likeByPostId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postid, userId: userid }),
    });
    const data = await response.json();
    console.log(data);
    setRefreshcnt(refreshcnt + 1);
  };
  useEffect(() => {
    if (typeof token === "string") {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setJwtDecoded(decoded);
    } else {
      console.log("Token is undefined or not a string");
    }
  }, [token]);
  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await fetch("/api/post/viewAllPost");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFeedData(data);
        setLoading(false);
        // console.log(data);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchFeedData();
  }, [refreshcnt]);

  function timeAgo(timestamp: string): string {
    const createdAt = new Date(timestamp);
    const now = Date.now();
    const diffMs = now - createdAt.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 10 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (seconds > 0) {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }

    return "Just now";
  }
  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (feedData.length === 0) {
    return <Nopost />;
  }
  return (
    <>
      <div className="grid place-content-center text-center">
        <h1 className="text-[30px] my-5">Blog Post Feed </h1>

        <section className="flex flex-col justify-center items-center  px-5">
          {feedData &&
            feedData.map((post, j) => (
              <div key={j} className=" w-full my-2 mx-5 py-0">
                <div className="mx-5 w-[400px] ">
                  <div className="w-full bg-[#1E1E1E] text-[#CBC544] rounded-md my-5">
                    <div className="head flex justify-between px-5 py-5">
                      <div className="namewithprofile text-[20px] flex gap-2">
                        <div className="s">
                          {post.profileImg ? (
                            <img
                              className="rounded w-10 h-10"
                              src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                              alt=""
                            />
                          ) : (
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
                          )}
                        </div>
                        <div className="name">{post.author.name}</div>
                        {}
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
                      <span
                        className="like flex"
                        onClick={() => {
                          if (jwtDecoded && typeof jwtDecoded.id === "string") {
                            HandleClick(post.id, jwtDecoded.id);
                          }
                        }}
                      >
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
                        <p>{post.likecount}</p>
                      </span>
                      <span
                        onClick={() => {
                          HandlecmntBox(post.id);
                        }}
                        className="comments"
                      >
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
                    <div className="flex items-start flex-col">
                      <h1 className="text-[20px] px-2">Comments</h1>
                      <hr className="bg-slate-600 w-full" />
                      {post.comments &&
                        post.comments.map(
                          (
                            com: {
                              id: string;
                              content: string;
                              author: { name: string };
                            },
                            c: number
                          ) => {
                            return (
                              <div
                                key={c}
                                className="cmtsection text-black px-2 bg-slate-700 w-full flex flex-row items-start"
                              >
                                <div className="user font-bold">
                                  {com.author.name}
                                </div>
                                <div className="cmntText mx-5">
                                  {com.content}
                                </div>
                              </div>
                            );
                          }
                        )}
                      <div className="cmntinput w-full">
                        <input
                          type="text"
                          ref={cmntbox}
                          value={inputcmnt}
                          onChange={(e) => setInputcmnt(e.target.value)}
                          onKeyDown={(e) => HandleEnter(e, post.id)}
                          className="bg-slate-700 placeholder:text-gray-500 py-2 px-2 w-full outline-none text-black"
                          placeholder="add comment"
                        />
                      </div>
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
