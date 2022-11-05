import { Paper, Typography } from "@mui/material";
import AddContactInfo from "../../components/profile/addContactInfo";
import { useCurrentUser, useSocialsList } from "../../network/hooks/apiHooks";
import CircularProgressIndicator from "../../components/common/circularProgressIndicator";
import UserSocialList from "../../components/profile/userSocialList";
import React, { useContext } from "react";
import { LangContext } from "../../context/language";

const Settings = () => {
  const {
    dispatch: { translate },
  } = useContext(LangContext);
  const user = useCurrentUser();
  const socials = useSocialsList();

  return (
    <Paper
      style={{
        marginTop: "30px",
        padding: "24px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        justifyItems: "start",
      }}
    >
      <Typography marginBottom={1} fontSize={10}>
        {translate("socialPageTitle")}
      </Typography>
      <AddContactInfo
        actionsDisabled={
          user.isLoading || socials.isLoading || socials.isRefetching
        }
        socials={socials.data ? socials.data.socials : []}
      />
      {user.isLoading && <CircularProgressIndicator />}
      {user.data && (
        <UserSocialList
          socials={socials.data ? socials.data.socials : []}
          userSocials={user.data.user.socials}
        />
      )}
    </Paper>
  );
};
export default Settings;
