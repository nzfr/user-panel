import React, { useContext } from "react";
import { LangContext } from "../../context/language";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { SocialDTO } from "../../types/social/socailResponse";
import Image from "next/image";
import { MdArrowDropDown, MdClear } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";

export type AddEditInputs = {
  type: {
    name: string;
    icon: string;
    persianName: string;
  };
  link: string;
};

type Props = {
  inputs: AddEditInputs | undefined;
  socials: SocialDTO[];
  actionsDisabled: boolean;
  submit(data: AddEditInputs): void;
};

const AddEditContactForm = ({
  inputs,
  submit,
  socials,
  actionsDisabled,
}: Props) => {
  const editMode = !!inputs;
  const theme = useTheme();
  const {
    state: { language },
    dispatch: { translate },
  } = useContext(LangContext);

  const schema = yup
    .object()
    .shape({
      type: yup.object().shape({
        name: yup.string(),
        icon: yup.string(),
        persianName: yup.string(),
      }),
      link: yup
        .string()
        .url(translate("linkInputInvalidError"))
        .required(translate("inputRequiredError")),
    })
    .required();

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<AddEditInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      type: {
        name: inputs?.type.name,
        persianName: inputs?.type.persianName,
        icon: inputs?.type.icon,
      },
      link: inputs?.link,
    },
  });

  const labelFunction = (option: SocialDTO) => {
    const defaultLabel = translate("select");
    if (language === "per") {
      return option.persianName ?? defaultLabel;
    } else {
      return option.name ?? defaultLabel;
    }
  };

  const submitButtonLabel = () => {
    let mainLabel = translate("addSocialTitle");
    let subLabel = ``;
    if (editMode) {
      mainLabel = translate("editSocialTitle");
      subLabel =
        language === "per"
          ? `${watch("type").persianName}`
          : `${watch("type").name}`;
    }
    return `${mainLabel} ${subLabel}`;
  };

  const onSubmit: SubmitHandler<AddEditInputs> = (data) => {
    // const params: EditUserSocialParams = {
    //     name: data.type.name,
    //     link: data.link,
    //     icon: data.type.icon,
    //     persianName: data.type.persianName,
    //     id: social._id ?? "",
    // };
    submit(data);
    // editSocial.mutate(params);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        marginTop={2}
        width="100%"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          gap: "10px",
        }}
      >
        <FormControl style={{ width: "40%" }}>
          <Autocomplete
            {...register("type")}
            id="social-type-select"
            onChange={(event, newValue: SocialDTO | null) => {
              if (newValue === null) return;
              setValue("type", {
                name: newValue.name ?? "",
                persianName: newValue.persianName ?? "",
                icon: newValue.icon ?? "",
              });
            }}
            getOptionLabel={(option) => labelFunction(option)}
            options={socials}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Image
                  loading="lazy"
                  width="15"
                  height="15"
                  src={option.icon ?? ""}
                  alt=""
                />
                <Typography marginX={1} fontSize={12}>
                  {language === "per" ? option.persianName : option.name}
                </Typography>
              </Box>
            )}
            clearIcon={<MdClear color={theme.palette.info.main} />}
            popupIcon={<MdArrowDropDown color={theme.palette.info.main} />}
            renderInput={(params) => {
              let label = translate("typeInputTitle");
              if (editMode) {
                if (language === "per") {
                  label = getValues("type").persianName;
                } else {
                  label = getValues("type").name;
                }
              }
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  label={label}
                  InputLabelProps={{
                    style: {
                      color: errors.type && "red",
                    },
                  }}
                />
              );
            }}
          />
          {errors.type && (
            <FormHelperText error>{errors.type.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <TextField
            InputLabelProps={{
              style: {
                color: errors.link && "red",
              },
            }}
            {...register("link")}
            fullWidth
            id="link_input"
            label={translate("linkInputTitle")}
            variant="outlined"
          />
          {errors.link && (
            <FormHelperText error>{errors.link.message}</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box
        marginTop={2}
        width="100%"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          gap: "10px",
        }}
      >
        <Button
          onClick={() => {
            resetField("link");
            resetField("type");
            // setAddContactAccordion(false);
          }}
          variant="outlined"
        >
          <Typography fontSize={12} color="text.primary">
            {translate("cancel")}
          </Typography>
        </Button>
        <Button
          disabled={
            !!errors.link ||
            !!errors.type ||
            actionsDisabled ||
            (!!watch("link") && watch("link").length === 0)
          }
          type="submit"
          variant="contained"
        >
          <Typography fontSize={12} color="text.secondary">
            {submitButtonLabel()}
          </Typography>
        </Button>
      </Box>
    </form>
  );
};

export default AddEditContactForm;
