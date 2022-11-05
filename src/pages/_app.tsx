import "../styles/globals.css";
import type { AppProps } from "next/app";
import createEmotionCache from "../utility/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import { ThemeProvider, ThemeOptions } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "../utility/theme";
import { staticTexts } from "../staticTexts";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../components/common/customAppBar";
import CustomBreadcrumbs from "../components/common/customBreadcrumbs";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../utility/queryClient";
import LangState from "../context/language";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const getActiveTheme = (mode: "dark" | "light") => {
  return mode === "dark" ? darkTheme : lightTheme;
};

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [selectedTheme, setSelectedTheme] = useState<"dark" | "light">("dark");
  const [activeTheme, setActiveTheme] = useState<ThemeOptions>(darkTheme);

  const toggleTheme = () => {
    if (selectedTheme === "dark") {
      setSelectedTheme("light");
    } else {
      setSelectedTheme("dark");
    }
  };

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme));
  }, [selectedTheme]);

  useEffect(() => {
    if (document) document.dir = "rtl";
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>{staticTexts.mainApp.title}</title>
          <link rel="stylesheet" href="/fonts/iranyekan.css" />
        </Head>
        <LangState>
          <ThemeProvider theme={activeTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Container
              maxWidth={"laptop"}
              sx={{
                width: "100%",
                paddingY: { laptop: "40px", tablet: "30px", mobile: "20px" },
              }}
            >
              <CustomAppBar
                currentTheme={selectedTheme}
                toggleTheme={toggleTheme}
              />
              <CustomBreadcrumbs />
              <Component {...pageProps} />
            </Container>
          </ThemeProvider>
        </LangState>
      </QueryClientProvider>
    </CacheProvider>
  );
}
