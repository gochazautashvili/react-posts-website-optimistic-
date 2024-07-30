import { useNavigate } from "react-router-dom";
import useLikePost, { likeSettings } from "../hooks/useLikePost";
import usePosts from "../hooks/usePosts";
import useSavePost, { saveSettings } from "../hooks/useSavePost";
import useUser from "../hooks/useUser";
import { LikeType, SaveType } from "../types/types";
import useDeletePost, { deleteSettings } from "../hooks/useDeletePost";

interface Props {
  postId: string;
  image: string;
  body: string;
  username: string;
  userId: string;
  likeQuantity: number;
  like: LikeType[];
  saved: SaveType[];
  avatar: string;
}

const Card = ({
  body,
  image,
  likeQuantity,
  postId,
  avatar,
  userId,
  username,
  like,
  saved,
}: Props) => {
  const { data: user } = useUser();
  const { data: posts } = usePosts();
  const { trigger: likeTrigger, isMutating: isLiking } = useLikePost();
  const { trigger: saveTrigger, isMutating: isSaving } = useSavePost();
  const { trigger: deleteTrigger, isMutating: isDeleting } = useDeletePost();

  const navigate = useNavigate();

  if (!user) return;

  const isLiked = like.some((like) => like.userId === user?.id);
  const isSaved = saved.some((save) => save.userId === user?.id);

  const handleDelete = () => {
    deleteTrigger({ postId }, deleteSettings(posts, postId));
  };

  const toggleLike = () => {
    likeTrigger(
      { postId },
      likeSettings(posts, postId, isLiked, user.id, like)
    );
  };

  const toggleSave = () => {
    saveTrigger(
      { postId },
      saveSettings(posts, postId, user.id, saved, isSaved)
    );
  };

  return (
    <div className="max-w-[500px] basis-[250px] flex-1">
      <img
        src={image}
        alt="image"
        width={300}
        height={200}
        loading="lazy"
        className="w-full h-[170px] object-contain bg-black rounded"
      />
      <div className="flex justify-between gap-5 items-center">
        <div
          onClick={() => navigate(`/profile/${userId}`)}
          className="flex gap-2 items-center my-2 cursor-pointer"
        >
          <img
            src={avatar}
            alt="avatar"
            width={40}
            height={40}
            loading="lazy"
            className="w-[40px] h-[40px] object-cover cursor-pointer rounded-full"
          />
          <p className="text-base font-bold">{username}</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            disabled={isLiking}
            onClick={toggleLike}
            className={`border text-nowrap px-3 border-black rounded cursor-pointer font-semibold ${
              isLiked && "bg-red-400"
            }`}
            type="button"
          >
            {likeQuantity} {isLiked ? "Liked" : "Like"}
          </button>
          <button
            disabled={isSaving}
            onClick={toggleSave}
            className={`border px-3 border-black rounded cursor-pointer font-semibold ${
              isSaved && "bg-green-400"
            }`}
            type="button"
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
      <div className="flex gap-10 justify-between items-center">
        <h1 className="font-bold text-base">{body}</h1>
        {user?.id === userId && (
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="font-bold text-2xl text-black cursor-pointer bg-slate-100 px-2"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
