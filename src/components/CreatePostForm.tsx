import { FormEventHandler, useState } from "react";
import usePosts from "../hooks/usePosts";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import useCreatePost, { createSettings } from "../hooks/useCreatePost";

const CreatePostForm = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const { data: posts } = usePosts();
  const { data: user } = useUser();
  const { trigger, isMutating } = useCreatePost();

  if (!user) return;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now().toString(),
      body,
      image,
      likeQuantity: 0,
      userId: user.id,

      user: {
        username: user.username,
        gmail: user.gmail,
        avatar: user.avatar,
        id: user.id,
      },

      like: [{ userId: "" }],
      saved: [{ userId: "" }],
    };

    try {
      trigger({ body, image }, createSettings(posts, newPost));

      setBody("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center flex-[2] border border-black rounded gap-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 p-5 w-full"
      >
        <Link
          to={`/profile/${user.id}`}
          className="font-bold uppercase tracking-[2.5px] text-base text-nowrap underline"
        >
          Create Your Post. {user?.username}
        </Link>
        <input
          onChange={(e) => setBody(e.target.value)}
          value={body}
          className="w-full h-10 border-black border rounded text-black px-3"
          type="text"
          placeholder="description"
        />
        <input
          onChange={(e) => setImage(e.target.value)}
          value={image}
          className="w-full h-10 border-black border rounded text-black px-3"
          type="text"
          placeholder="image link"
        />
        <button
          disabled={isMutating}
          className="flex items-center justify-center text-white bg-black rounded w-full h-10 font-bold"
          type="submit"
        >
          {isMutating ? "Post creating..." : "Submit"}
        </button>
        {user && (
          <button
            disabled={isMutating}
            onClick={handleSignOut}
            className="flex items-center justify-center text-black border border-black rounded w-full h-10 font-bold"
            type="button"
          >
            Sign out
          </button>
        )}
      </form>
    </div>
  );
};

export default CreatePostForm;
