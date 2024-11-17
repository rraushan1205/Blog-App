import Link from "next/link";
export default function Nopost() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="text-[45px] my-20">No Post Found</div>
      <div className="flex flex-col items-center text-[15px]">
        Do you want to create a Post?{" "}
        <span className="text-blue-800">
          {" "}
          <Link href="/createPost">Create A Post</Link>
        </span>
      </div>
    </div>
  );
}
