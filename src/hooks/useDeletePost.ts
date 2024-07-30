import useSWRMutation from "swr/mutation";
import { deletePostById } from "../api/posts";
import { PostsType } from "../types/types";

export const deleteSettings = (
  posts: PostsType[] | undefined,
  postId: string
) => {
  return {
    optimisticData: posts?.filter((post: PostsType) => post.id != postId),
    rollbackOnError: true,
  };
};

const useDeletePost = () => {
  return useSWRMutation(`/posts`, deletePostById, {
    rollbackOnError: true,
  });
};

export default useDeletePost;
