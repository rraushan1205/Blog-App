"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  // State to store the fetched feed data
  const [feedData, setFeedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/post/viewAllPost"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setFeedData(data); // Set the fetched data to the state
        setLoading(false); // Set loading to false after data is fetched
        console.log(data);
      } catch (err) {
        // setError(err?.message); // Handle any errors
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchFeedData();
  }, []); // Empty dependency array means this effect runs once on component mount

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetch fails
  }

  return (
    <div className="grid place-content-center">
      <section className="flex flex-col justify-center items-center border border-gray-500 px-5">
        {feedData &&
          feedData.map((i, j) => (
            <div
              key={j}
              className="border border-gray-300 w-full my-2 mx-5 py-2"
            >
              <div className="px-2">{i.author.name} posted..</div>
              <hr className="w-full" />
              <div className="px-2">{i.title}</div>
              <hr className="w-full" />
              <div className="px-2">{i.content}</div>
            </div>
          ))}
        <div></div>
      </section>
    </div>
  );
}
