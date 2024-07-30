import useSWR from "swr";
import api from "../api/api";
import { PostsType } from "../types/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const usePosts = () => {
  return useSWR<PostsType[]>("/posts", fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
};

export default usePosts;
