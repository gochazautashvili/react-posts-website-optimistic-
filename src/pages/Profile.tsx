import { Link, useParams } from "react-router-dom";
import {
  useUserById,
  useUserLikedPosts,
  useUserSavedPosts,
} from "../hooks/useUserDate";
import { Skeleton } from "./Home";
import { PostsType, UserLikesType, UserSavedType } from "../types/types";
import useUser from "../hooks/useUser";

const Profile = () => {
  const params = useParams();
  const { data: user } = useUser();
  const { data: posts, isLoading: isPostsLoading } = useUserById(params.userId);
  const { data: likes, isLoading: isLikesLoading } = useUserLikedPosts(
    params.userId
  );
  const { data: saves, isLoading: isSavesLoading } = useUserSavedPosts(
    params.userId
  );

  const owner = params.userId === user?.id;

  return (
    <main className="flex flex-col my-10 w-fill max-w-[1400px] mx-auto px-3">
      <Link
        className="uppercase tracking-[2px] py-2 w-full text-center border border-black rounded bg-slate-200 cursor-pointer font-bold"
        to="/"
      >
        Go Back To Home Page
      </Link>
      <div>
        <h1 className="text-3xl font-bold mt-10 mb-5 text-center uppercase tracking-[3px]">
          {owner ? "Your Posts" : "User Posts"}
        </h1>
        <div className="flex gap-10 flex-wrap flex-[6] justify-center w-full">
          {isPostsLoading && <Skeleton />}
          {posts && posts?.length < 1 && (
            <p className="text-center text-xl font-semibold w-full">
              You don&apos;t have any post yet.
            </p>
          )}
          {!isPostsLoading &&
            posts &&
            posts.map((post: PostsType) => {
              return (
                <div
                  key={post.id}
                  className="max-w-[500px] basis-[250px] flex-1"
                >
                  <img
                    src={post.image}
                    alt="image"
                    width={300}
                    height={200}
                    loading="lazy"
                    className="w-full h-[170px] object-contain bg-black rounded"
                  />
                </div>
              );
            })}
        </div>
      </div>
      {owner && (
        <>
          <div className="my-10">
            <h1 className="text-3xl font-bold mt-10 mb-5 text-center uppercase tracking-[3px]">
              Your Liked Posts
            </h1>
            <div className="flex gap-10 flex-wrap flex-[6] justify-center w-full">
              {isLikesLoading && <Skeleton />}
              {likes && likes?.length < 1 && (
                <p className="text-center text-xl font-semibold w-full">
                  You don&apos;t have any liked post yet.
                </p>
              )}
              {!isLikesLoading &&
                likes &&
                likes.map((like: UserLikesType) => {
                  return (
                    <div
                      key={like.post.id}
                      className="max-w-[500px] basis-[250px] flex-1"
                    >
                      <img
                        src={like.post.image}
                        alt="image"
                        width={300}
                        height={200}
                        loading="lazy"
                        className="w-full h-[170px] object-contain bg-black rounded"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mt-10 mb-5 text-center uppercase tracking-[3px]">
              Your Saved Posts
            </h1>
            <div className="flex gap-10 flex-wrap flex-[6] justify-center w-full">
              {isSavesLoading && <Skeleton />}
              {saves && saves?.length < 1 && (
                <p className="text-center text-xl font-semibold w-full">
                  You don&apos;t have any saved post yet.
                </p>
              )}
              {!isSavesLoading &&
                saves &&
                saves.map((save: UserSavedType) => {
                  return (
                    <div
                      key={save.post.id}
                      className="max-w-[500px] basis-[250px] flex-1"
                    >
                      <img
                        src={save.post.image}
                        alt="image"
                        width={300}
                        height={200}
                        loading="lazy"
                        className="w-full h-[170px] object-contain bg-black rounded"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Profile;
