import useSWRMutation from "swr/mutation";
import { createPost } from "../api/posts";
import { PostsType } from "../types/types";

export const createSettings = (
  posts: PostsType[] | undefined,
  newPost: PostsType
) => {
  return {
    optimisticData: posts ? [...posts, newPost] : [newPost],
    rollbackOnError: true,
  };
};

const useCreatePost = () => {
  return useSWRMutation(`/posts`, createPost);
};

export default useCreatePost;
