import { SocialDTO } from "../../types/social/socailResponse";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { UserSocialDTO } from "../../types/user/userResponse";
import { MdDelete, MdEdit } from "react-icons/md";
import { useTheme } from "@mui/material/styles";
import { EditUserSocialParams } from "../../network/apiService";
import {
  useEditUserSocialMutation,
  useRemoveUserSocialsMutation,
} from "../../network/hooks/apiHooks";
import { LangContext } from "../../context/language";
import AddEditContactForm, { AddEditInputs } from "./addEditContactForm";

type Props = {
  social: UserSocialDTO;
  socials: SocialDTO[];
};

const EditContactInfo = ({ social, socials }: Props) => {
  const theme = useTheme();
  const {
    state: { language },
    dispatch: { translate },
  } = useContext(LangContext);

  const removeSocial = useRemoveUserSocialsMutation();
  const editSocial = useEditUserSocialMutation();

  const onSubmit = (data: AddEditInputs) => {
    const params: EditUserSocialParams = {
      name: data.type.name,
      link: data.link,
      icon: data.type.icon,
      persianName: data.type.persianName,
      id: social._id ?? "",
    };
    editSocial.mutate(params);
  };

  return (
    <Accordion
      variant="elevation"
      style={{
        borderRadius: "16px",
        marginTop: "10px",
        marginBottom: "5px",
      }}
    >
      <AccordionSummary>
        <Container
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
          <Image
            style={{ alignSelf: "center", marginLeft: "5px" }}
            width={15}
            height={15}
            src={social.icon ?? ""}
            alt=""
          />
          <Typography marginX={1} alignSelf={"center"}>
            {language === "per" ? social.persianName : social.social}
          </Typography>
          <Typography
            sx={{
              display: { laptop: "flex", tablet: "flex", mobile: "none" },
            }}
            alignSelf="center"
            marginX={1}
            fontSize={12}
          >
            {`${translate("linkInputTitle")}:`}
          </Typography>
          <a style={{ alignSelf: "center" }} href={social.link}>
            {social.link}
          </a>
        </Container>
        <Container
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: { laptop: "row", mobile: "column" },
          }}
        >
          <Button startIcon={<MdEdit />}>
            <Typography marginX={1} alignSelf={"center"} color={"text.primary"}>
              {translate("edit")}
            </Typography>
          </Button>
          <Button
            disabled={removeSocial.isLoading}
            onClick={() => removeSocial.mutate(social._id ?? "")}
            color="error"
            startIcon={<MdDelete />}
          >
            <Typography marginX={1} alignSelf={"center"} color={"error.main"}>
              {translate("delete")}
            </Typography>
          </Button>
        </Container>
      </AccordionSummary>
      <AccordionDetails>
        <CardContent
          sx={{ borderRadius: "16px", bgcolor: theme.palette.info.dark }}
        >
          <Typography
            marginBottom={1}
            fontSize={12}
            color={theme.palette.text.secondary}
          >
            {translate("editSocialTitle")}
          </Typography>
          <AddEditContactForm
            inputs={{
              type: {
                name: social.social ?? "",
                icon: social.icon ?? "",
                persianName: social.persianName ?? "",
              },
              link: social.link ?? "",
            }}
            socials={socials}
            submit={onSubmit}
            actionsDisabled={removeSocial.isLoading || editSocial.isLoading}
          />
        </CardContent>
      </AccordionDetails>
    </Accordion>
  );
};
export default EditContactInfo;
