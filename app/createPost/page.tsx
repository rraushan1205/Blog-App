export default async function createPost() {
  return (
    <>
      <section className="grid place-content-center">
        <form
          action="/api/post/createPost"
          method="post"
          className="bg-[#1E1E1E] text-[#CBC544] px-10 py-5 flex flex-col gap-5"
        >
          <div className="flex justify-between">
            <label htmlFor="title" className="mx-5">
              Title:
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="px-2 rounded bg-gray-600 w-[250px] outline-none"
              placeholder="Title goes here..."
              required
              aria-label="Post title"
            />
          </div>
          <div className="flex">
            <label htmlFor="content" className="mx-5 self-start">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              className="resize-none outline-none bg-gray-600 rounded-sm px-2 py-1 w-[250px] h-[80px]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-slate-500 rounded-sm px-5 py-1 w-fit"
          >
            Post
          </button>
        </form>
      </section>
    </>
  );
}
