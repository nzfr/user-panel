import CustomAxios from "./customAxios";
import { GetUserResponse } from "../types/user/userResponse";
import { SocialListResponseDTO } from "../types/social/socailResponse";

const axios = CustomAxios();

export const getUser = async () => {
  const result = await axios.get<GetUserResponse>("/api/user");
  return result.data;
};

export const getSocialsList = async () => {
  const result = await axios.get<SocialListResponseDTO>("/api/socials");
  return result.data;
};

export type AddUserSocialParams = {
  userId: string;
  social: {
    name: string;
    icon: string;
    persianName: string;
    link: string;
  };
};

export const addUserSocial = async (params: AddUserSocialParams) => {
  const result = await axios.post("/api/userSocials", params);
  return result.data;
};

export const removeUserSocial = async (id: string) => {
  const result = await axios.delete(`/api/userSocials?id=${id}`);
  return result.data;
};

export type EditUserSocialParams = {
  name: string;
  icon: string;
  persianName: string;
  link: string;
  id: string;
};

export const editUserSocial = async (params: EditUserSocialParams) => {
  const result = await axios.put("/api/userSocials", params);
  return result.data;
};
