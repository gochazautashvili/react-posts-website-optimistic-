import useSWR from "swr";
import { UserType } from "../types/types";
import api from "../api/api";

const fetcher = () => api.get("/auth").then((res) => res.data);

const useUser = () => {
  return useSWR<UserType>("/user", fetcher, {
    revalidateOnFocus: false,
  });
};

export default useUser;
