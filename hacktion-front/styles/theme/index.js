import { createTheme } from "@mui/material/styles";

export const Colors = {
  primary: "#3B71DD",
  primaryLight: "#89ABEE",
  primaryDark: "#1757D4",
  secondary: "#613FDF",
  secondaryLight: "#A18CEF",
  secondaryDark: "#421BD7",
  contrastText: '#fff',
  success: "#004d40",
  info: "#00a2ff",
  danger: "#FFB72F",
  warning: "#FFD92F",
  dark: "#0c1012",
  ligth: "#aaa",
  muted: "#646369",
  /////////////////
  // grays
  /////////////////
  gray: "#6c6b6e",
  grayLight: "#5a5a5c",
  grayDark: "#5a5a5c",
  /////////////////
  // solid color
  /////////////////
  white: "#fff",
  black: "#000"
}

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
      light: Colors.primaryLight,
      dark: Colors.primaryDark,
      contrastText: Colors.contrastText,
    },
    secondary: {
      main: Colors.secondary,
      light: Colors.secondaryLight,
      dark: Colors.secondaryDark,
      contrastText: Colors.contrastText,
    },
    neutral: {
      main: Colors.primary,
      light: Colors.grayLight,
      dark: Colors.grayDark,
      contrastText: Colors.primary
    }
  },
});

export default theme;