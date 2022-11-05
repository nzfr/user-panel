import { RequestStatus } from "../requestStatus";
import { ObjectId } from "bson";

export type UserDataDTO = {
  _id?: ObjectId;
  userName?: string;
  imageUrl?: string;
};

export type UserSocialDTO = {
  _id?: string;
  social?: string;
  link?: string;
  icon?: string;
  persianName?: string;
};

export type UserDTO = { userInfo?: UserDataDTO; socials: UserSocialDTO[] };

export type GetUserResponse = {
  status: RequestStatus;
  user: UserDTO;
};
