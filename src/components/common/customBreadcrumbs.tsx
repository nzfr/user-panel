import React, { useContext } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import {
  createPathname,
  normalizePageName,
} from "../../utility/normalizePageName";
import { LangContext } from "../../context/language";

const CustomBreadcrumbs = () => {
  const theme = useTheme();
  const router = useRouter();
  const {
    dispatch: { translate },
  } = useContext(LangContext);
  const pathnames = router.pathname.split("/");
  return (
    <Breadcrumbs separator="." aria-label="breadcrumb">
      {pathnames.map((path, index) => {
        return (
          <Link
            key={path}
            style={{ color: theme.palette.text.disabled, fontSize: 12 }}
            href={createPathname(pathnames, index)}
          >
            {translate(normalizePageName(path))}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
export default CustomBreadcrumbs;
