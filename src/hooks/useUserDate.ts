import useSWR from "swr";
import api from "../api/api";
import { PostsType, UserLikesType, UserSavedType } from "../types/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const useUserById = (userId: string | undefined) => {
  return useSWR<PostsType[]>(`/posts/own/${userId}`, fetcher);
};

export const useUserLikedPosts = (userId: string | undefined) => {
  return useSWR<UserLikesType[]>(`/like/${userId}`, fetcher);
};

export const useUserSavedPosts = (userId: string | undefined) => {
  return useSWR<UserSavedType[]>(`/save/${userId}`, fetcher);
};
