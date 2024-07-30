import api from "./api";

export const createPost = async (
  url: string,
  { arg }: { arg: { body: string; image: string } }
) => {
  const res = await api.post(url, {
    body: arg.body,
    image: arg.image,
  });

  return res.data;
};

export const deletePostById = async (
  _: any,
  { arg }: { arg: { postId: string } }
) => {
  const res = await api.delete(`posts/${arg.postId}`);

  return res.data;
};

export const likePost = async (
  _: any,
  { arg }: { arg: { postId: string } }
) => {
  const res = await api.post(`like/${arg.postId}`);

  return res.data;
};

export const savePost = async (
  _: any,
  { arg }: { arg: { postId: string } }
) => {
  const res = await api.post(`save/${arg.postId}`);

  return res.data;
};

export const getPosts = async (q: string) => {
  const res = await api.get(`/posts?q=${q}`);

  return res.data;
};
