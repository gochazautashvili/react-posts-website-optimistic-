import Auth from "../components/Auth";
import Card from "../components/Card";
import CreatePostForm from "../components/CreatePostForm";
import usePosts from "../hooks/usePosts";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import { PostsType } from "../types/types";

const Home = () => {
  const token = useToken();

  if (!token) {
    return <Auth />;
  }

  const user = useUser();

  if (!user) {
    return <Auth />;
  }

  const { data: posts, isLoading } = usePosts();

  return (
    <main className="flex gap-10 md:justify-between items-start w-full max-w-[1400px] mx-auto px-3 my-10 flex-col-reverse md:flex-row">
      <div className="flex gap-10 flex-wrap flex-[6] justify-center w-full">
        {isLoading && <Skeleton />}
        {posts && posts?.length < 1 && (
          <p className="text-center text-xl font-semibold w-full">
            There is not any post
          </p>
        )}
        {!isLoading &&
          posts &&
          posts.map((post: PostsType) => {
            return (
              <Card
                key={post.id}
                like={post.like}
                postId={post.id}
                body={post.body}
                image={post.image}
                saved={post.saved}
                userId={post.userId}
                avatar={post.user.avatar}
                username={post.user.username}
                likeQuantity={post.likeQuantity}
              />
            );
          })}
      </div>
      <CreatePostForm />
    </main>
  );
};

export default Home;

export const Skeleton = () => {
  return (
    <>
      <div className="max-w-[500px] basis-[250px] flex-1 h-[200px] bg-slate-400 rounded animate-pulse" />
      <div className="max-w-[500px] basis-[250px] flex-1 h-[200px] bg-slate-400 rounded animate-pulse" />
      <div className="max-w-[500px] basis-[250px] flex-1 h-[200px] bg-slate-400 rounded animate-pulse" />
      <div className="max-w-[500px] basis-[250px] flex-1 h-[200px] bg-slate-400 rounded animate-pulse" />
    </>
  );
};
