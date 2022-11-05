import { useMutation, useQuery } from "react-query";
import {
  addUserSocial,
  AddUserSocialParams,
  editUserSocial,
  EditUserSocialParams,
  getSocialsList,
  getUser,
  removeUserSocial,
} from "../apiService";
import { queryClient } from "../../utility/queryClient";

export const useCurrentUser = () => {
  return useQuery(["user"], async () => getUser(), {
    onSuccess: (data) => {
      if (data.user.userInfo && data.user.userInfo._id) {
        localStorage.setItem("user_id", data.user.userInfo._id.toString());
      }
    },
  });
};

export const useSocialsList = () => {
  return useQuery(["socials"], async () => getSocialsList(), {
    refetchOnWindowFocus: false,
  });
};

export const useAddUserSocialMutation = () => {
  return useMutation(
    ["add_user_social"],
    async (params: AddUserSocialParams) => addUserSocial(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
};

export const useRemoveUserSocialsMutation = () => {
  return useMutation(
    ["user_socials"],
    async (id: string) => removeUserSocial(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
};

export const useEditUserSocialMutation = () => {
  return useMutation(
    [`user_social`],
    async (params: EditUserSocialParams) => editUserSocial(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
};
