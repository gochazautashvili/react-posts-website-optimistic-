import useSWRMutation from "swr/mutation";
import { savePost } from "../api/posts";
import { PostsType, SaveType } from "../types/types";

export const saveSettings = (
  posts: PostsType[] | undefined,
  postId: string,
  userId: string,
  saves: SaveType[],
  saved: boolean
) => {
  return {
    optimisticData: posts?.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          saved: saved
            ? saves.filter((save) => save.userId !== userId)
            : [...saves, { userId }],
        };
      }
      return post;
    }),
    rollbackOnError: true,
  };
};

const useSavePost = () => {
  return useSWRMutation("/posts", savePost, {
    rollbackOnError: true,
  });
};

export default useSavePost;
