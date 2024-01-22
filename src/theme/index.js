import { createTheme } from "@material-ui/core/styles";
import MuiOverrides from "./muiOverrides";
import { pxToRem, pxToVh, pxToVw } from "./themeUtils";

const Theme = createTheme({
  palette: {
    primary: {
      main: "rgba(252, 117, 0, 1)",
    },
    secondary: {
      main: "rgba(20, 175, 241, 1)",
    },
    error: {
      main: "rgba(207, 76, 53, 1)",
    },
    success: {
      main: "rgba(143, 209, 99, 1)",
    },
    warning: {
      main: "rgba(244, 180, 0, 1)",
    },
    text: {
      // Grey---->#616F80
      primary: "rgba(97, 111, 128, 1)",
      // #202124
      secondary: "rgba(32, 33, 36, 1)",
      // Light grey--->#A2A9B0
      disabled: "rgba(162, 169, 176, 1)",
      // #B0BCC8
      hint: "rgba(176, 188, 200, 1)",
    },
    divider: "rgba(0, 0, 0, 0.16)",
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
    },
    inputbase: {
      // #FFFFFF
      main: "rgba(255, 255, 255, 1)",
      // #3892d4
      secondary: "rgba(56, 146, 212, 1)",
    },
    buttonBackground: {
      // #FC750080
      main: "rgba(252, 117, 0, 0.5)",
      // #4FC4F7
      secondary: "rgba(79, 196, 247, 1)",
      secondaryHover: "rgba(79, 196, 247, 0.7)",
    },
    icons: {
      // #878D96
      main: "rgba(135, 141, 150, 1)",
    },
  },
  spacing: 8,
  shadow: ["none", "#00000029", "#0000000D", "#0000001A"],
  typography: {
    pxToRem: (px) => pxToRem(px),
    pxToVh: (px) => pxToVh(px),
    pxToVw: (px) => pxToVw(px),
    h1: {
      fontSize: pxToRem(28),
      lineHeight: pxToRem(39),
    },
    h2: {
      fontSize: pxToRem(24),
      lineHeight: pxToRem(33),
    },
    h3: {
      fontSize: pxToRem(22),
      lineHeight: pxToRem(31),
    },
    subtitle1: {
      fontSize: pxToRem(20),
      lineHeight: pxToRem(28),
    },
    subtitle2: {
      fontSize: pxToRem(18),
      lineHeight: pxToRem(25),
    },
    body1: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(23),
    },
    body2: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
    },
    fontFamily: "Poppins",
  },
});

const defaultTheme = createTheme({
  ...Theme,
  overrides: {
    ...MuiOverrides(Theme),
  },
});

export default defaultTheme;
