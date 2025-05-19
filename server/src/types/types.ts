export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isPublic: boolean;
};

export type UserGame = {
  userId: number;
  externalId: number;
  status:
    | "wishlist"
    | "owned"
    | "playing"
    | "completed"
    | "abandoned"
    | "platinum";
  comment: string;
};
