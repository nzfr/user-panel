import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { normalizePageName } from "../../utility/normalizePageName";
import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { LangContext } from "../../context/language";

type Props = {
  toggleTheme(): void;
  currentTheme: "dark" | "light";
};

const CustomAppBar = ({ toggleTheme, currentTheme }: Props) => {
  const router = useRouter();
  const pathNames = router.pathname.split("/");
  const t = useTheme();
  const {
    state: { language },
    dispatch: { setLanguage, translate },
  } = useContext(LangContext);
  const pageName = translate(
    normalizePageName(pathNames[pathNames.length - 1])
  );

  return (
    <Box
      width="100%"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography lineHeight={"1.6"} fontWeight="bold" fontSize={17}>
        {pageName}
      </Typography>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Button
          onClick={() => {
            setLanguage("eng");
          }}
          variant={"text"}
          color={"info"}
          style={{
            fontSize: 12,
            color: language === "eng" ? t.palette.info.light : "",
          }}
        >
          English
        </Button>
        <Button
          onClick={() => setLanguage("per")}
          variant="text"
          color={"info"}
          style={{
            color: language === "per" ? t.palette.info.light : "",
            fontSize: 12,
          }}
        >
          فارسی
        </Button>
        {currentTheme === "light" && (
          <MdDarkMode onClick={toggleTheme} size={25} />
        )}
        {currentTheme === "dark" && (
          <MdLightMode onClick={toggleTheme} size={25} />
        )}
      </Box>
    </Box>
  );
};
export default CustomAppBar;
