import { red } from "@mui/material/colors";
import { createTheme, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

// Create a theme instance.
export const commonThemeItems: ThemeOptions = {
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  direction: "rtl",
};

export const lightTheme: ThemeOptions = createTheme({
  ...commonThemeItems,
  typography: {
    fontFamily: ["iranyekan"].join(","),
    allVariants: {
      color: "black",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#161B25",
          background: "transparent",
          borderRadius: 8,
        },
      },
    },
  },
  palette: {
    text: {
      primary: "#ffa82e",
      secondary: "#212B35",
      disabled: "#79838e",
    },
    background: {
      default: "white",
      paper: "white",
    },
    primary: {
      main: "#ffa82e",
    },
    secondary: {
      main: "#212B35",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: "#79838e",
      light: "#ffa82e",
      dark: "#F3F6F8",
    },
  },
});

export const darkTheme: ThemeOptions = createTheme({
  ...commonThemeItems,
  typography: {
    fontFamily: ["iranyekan"].join(","),
    allVariants: {
      color: "white",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#161B25",
          background: "transparent",
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: "#ffa82e",
          borderWidth: 2,
          ":focus": {
            outline: "solid",
            outlineColor: "#ffa82e",
          },
        },
        notchedOutline: {
          color: "white",
          background: "transparent",
          border: "solid",
          borderColor: "#79838e",
        },
        input: {
          borderRadius: 8,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#79838e",
        },
      },
    },
  },
  palette: {
    text: {
      primary: "#ffa82e",
      secondary: "#212B35",
      disabled: "#79838e",
    },
    background: {
      default: "#161B25",
      paper: "#212B35",
    },
    primary: {
      main: "#ffa82e",
    },
    secondary: {
      main: "#212B35",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: "#79838e",
      light: "#ffa82e",
      dark: "#3E4651",
    },
  },
});
