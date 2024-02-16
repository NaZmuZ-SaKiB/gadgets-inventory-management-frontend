export type TUserRole = "user" | "manager" | "admin";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  createdAt: string;
  updatedAt: string;
};
