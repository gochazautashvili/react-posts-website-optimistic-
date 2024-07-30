export type PostsType = TPost & {
  user: UserType;

  like: LikeType[];
  saved: SaveType[];
};

export type TPost = {
  id: string;
  body: string;
  image: string;
  likeQuantity: number;
  userId: string;
};

export type LikeType = {
  userId: string;
};

export type SaveType = {
  userId: string;
};

export type UserType = {
  id: string;
  username: string;
  gmail: string;
  avatar: string;
};

export type UserLikesType = LikeType & {
  post: TPost & { saved: SaveType[]; user: UserType };
  user: UserType;
};

export type UserSavedType = SaveType & {
  post: TPost & { like: SaveType[]; user: UserType };
  user: UserType;
};
