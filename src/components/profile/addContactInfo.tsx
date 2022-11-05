import { Button, Card, CardContent, Collapse, Typography } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { useTheme } from "@mui/material/styles";
import React, { useContext, useState } from "react";
import { useAddUserSocialMutation } from "../../network/hooks/apiHooks";
import { AddUserSocialParams } from "../../network/apiService";
import { SocialDTO } from "../../types/social/socailResponse";
import { LangContext } from "../../context/language";
import AddEditContactForm, { AddEditInputs } from "./addEditContactForm";

export type Props = {
  socials: SocialDTO[];
  actionsDisabled: boolean;
};

const AddContactInfo = ({ socials }: Props) => {
  const theme = useTheme();
  const {
    dispatch: { translate },
  } = useContext(LangContext);

  const [addContactAccordion, setAddContactAccordion] =
    useState<boolean>(false);
  const addSocial = useAddUserSocialMutation();

  const onSubmit = (data: AddEditInputs) => {
    const userId = localStorage.getItem("user_id");
    if (userId === null) return;
    const params: AddUserSocialParams = {
      userId,
      social: {
        name: data.type.name,
        link: data.link,
        icon: data.type.icon,
        persianName: data.type.persianName,
      },
    };
    addSocial.mutate(params, {
      onSuccess: () => setAddContactAccordion(false),
    });
  };

  return (
    <>
      <Button
        fullWidth={false}
        sx={{ width: "max-content" }}
        onClick={() => setAddContactAccordion(!addContactAccordion)}
        variant="text"
        color="info"
        style={{ color: theme.palette.info.light, fontSize: 12 }}
        startIcon={<MdAdd color={theme.palette.info.light} />}
      >
        <Typography
          marginX={1}
          fontSize={12}
          color={theme.palette.primary.main}
        >
          {translate("addSocialTitle")}
        </Typography>
      </Button>
      <Collapse in={addContactAccordion} timeout="auto" unmountOnExit>
        <Card
          style={{
            borderRadius: "16px",
            marginTop: "10px",
          }}
        >
          <CardContent>
            <Typography marginBottom={1} fontSize={14} color="#ffffff">
              {translate("addSocialTitle")}
            </Typography>
            <AddEditContactForm
              inputs={undefined}
              socials={socials}
              actionsDisabled={addSocial.isLoading}
              submit={onSubmit}
            />
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
};
export default AddContactInfo;
