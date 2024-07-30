import useSWRMutation from "swr/mutation";
import { likePost } from "../api/posts";
import { LikeType, PostsType } from "../types/types";

export const likeSettings = (
  posts: PostsType[] | undefined,
  postId: string,
  liked: boolean,
  userId: string,
  likes: LikeType[]
) => {
  return {
    optimisticData: posts?.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          like: liked
            ? likes.filter((like) => like.userId !== userId)
            : [...likes, { userId }],
          likeQuantity: liked ? post.likeQuantity - 1 : post.likeQuantity + 1,
        };
      }
      return post;
    }),
    rollbackOnError: true,
  };
};

const useLikePost = () => {
  return useSWRMutation("/posts", likePost, {
    rollbackOnError: true,
  });
};

export default useLikePost;
