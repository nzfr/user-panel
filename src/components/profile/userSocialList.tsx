import { UserSocialDTO } from "../../types/user/userResponse";
import { Container } from "@mui/material";
import React from "react";
import EditContactInfo from "./editContactInfo";
import { SocialDTO } from "../../types/social/socailResponse";

type Props = {
  userSocials: UserSocialDTO[];
  socials: SocialDTO[];
};

const UserSocialList = ({ userSocials, socials }: Props) => {
  return (
    <Container
      maxWidth="laptop"
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        marginBottom: "10px",
        padding: "0",
      }}
    >
      {userSocials.map((item) => {
        return (
          <EditContactInfo socials={socials} key={item._id} social={item} />
        );
      })}
    </Container>
  );
};
export default UserSocialList;
