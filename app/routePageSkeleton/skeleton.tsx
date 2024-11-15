// navbar/Navbar.tsx
"use client";
import "../main.css";
const Skeleton = () => {
  const skeletons = [1, 2, 3];
  return (
    <>
      <div className="grid place-content-center text-center">
        <h1 className="text-[30px] my-5 animate-pulse">Feeding</h1>
        <section className="flex flex-col justify-center items-center  px-5">
          {skeletons.map((_, index) => (
            <div key={index} className=" w-full my-2 mx-5 py-0">
              <div className="mx-5 w-[400px] ">
                <div className=" w-full bg-[#1E1E1E] text-[#CBC544] rounded-md my-5">
                  <div className="head flex justify-between px-5 py-5">
                    <div className="namewithprofile text-[20px] flex gap-2">
                      <div className="rounded-full bg-gray-700 w-10 h-10 animate-bounce"></div>
                      <div className="w-[150px] h-5 bg-gray-700 my-3 rounded-sm animate-bounce"></div>
                    </div>
                  </div>
                  <div className="content px-8 py-0 flex flex-col">
                    <span className="flex text-left font-bold text-[20px] w-[150px] h-4 bg-gray-700 my-3 rounded-sm animate-bounce"></span>
                    <span className="py-5 px-2 flex flex-col justify-center">
                      <span className="w-[300px] h-3 bg-gray-700 my-1 rounded-sm animate-bounce"></span>
                      <span className="w-[300px] h-3 bg-gray-700 my-1 rounded-sm animate-bounce"></span>
                      <span className="w-[300px] h-3 bg-gray-700 my-1 rounded-sm animate-bounce"></span>
                      <span className="w-[300px] h-3 bg-gray-700 my-1 rounded-sm animate-bounce"></span>
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
};
export default Skeleton;
