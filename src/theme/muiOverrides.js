import { pxToRem, pxToVh } from "./themeUtils";

const MuiOverrides = (theme) => ({
  Mui: {
    "&$focused": {
      backgroundColor: "none !important",
    },
  },
  MuiAvatar: {
    colorDefault: {
      backgroundColor: theme.palette.primary.light,
    },
    root: {
      lineHeight: pxToRem(60),
      width: pxToRem(60),
      height: pxToRem(60),
    },
  },
  MuiCheckbox: {
    root: {
      padding: 0,
      color: theme.palette.primary.dark,
      "& .MuiSvgIcon-root": {
        height: pxToRem(25.23),
        width: pxToRem(25.23),
      },
    },
    colorSecondary: {
      "&$checked": {
        color: theme.palette.primary.dark,
      },
    },
  },
  MuiIconButton: {
    root: {
      padding: pxToRem(12),
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
  MuiButton: {
    root: {
      backgroundColor: theme.palette.primary.main,
      textTransform: "none",
      fontSize: pxToRem(16),
      minWidth: 0,
      border: "0 none",
      borderRadius: pxToRem(8),
      color: theme.palette.common.white,
      padding: `${pxToRem(10)} ${pxToRem(20)}`,
      margin: 0,
      "&:hover": {
        backgroundColor: "inherit",
      },
      "&$disabled": {
        color: theme.palette.text.disabled,
      },
    },
    contained: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      padding: `${pxToRem(8)} ${pxToRem(20)}`,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    outlined: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.common.white,
      border: `${pxToRem(1)} solid ${theme.palette.primary.dark}`,
      padding: `${pxToRem(8)} ${pxToRem(20)}`,
      "&:hover": {
        backgroundColor: theme.palette.common.white,
      },
    },
    text: {
      padding: 0,
      backgroundColor: "transparent",
    },
    startIcon: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  MuiInputBase: {
    root: {
      display: "flex",
      backgroundColor: theme.palette.inputbase.main,
      borderRadius: pxToRem(8),
    },
    input: {
      padding: `0 ${pxToRem(18)}`,
      fontSize: pxToRem(19),
      color: theme.palette.secondary.dark,
      height: pxToRem(39),
    },
    multiline: {
      padding: 0,
    },
  },
  MuiInput: {},
  MuiTypography: {
    root: {
      display: "block",
    },
  },
  MuiSelected: {
    color: theme.palette.common.black,
  },
  MuiSelect: {
    nativeInput: {
      border: pxToRem(0),
      padding: pxToRem(10),
      margin: pxToRem(0),
      height: pxToRem(37),
    },
    icon: {
      top: pxToRem(8),
      marginRight: pxToRem(12),
    },
  },
  MuiPaper: {
    rounded: {
      borderRadius: pxToRem(12),
    },
    elevation8: {
      boxShadow: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(10)} ${
        theme.shadow[1]
      }`,
    },
    elevation1: {
      boxShadow: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(10)} ${
        theme.shadow[2]
      }`,
    },
  },
  MuiDialog: {
    paper: {
      margin: pxToRem(32),
    },
    paperScrollPaper: {
      maxHeight: "unset",
    },
    paperWidthSm: {
      maxWidth: pxToRem(600),
    },
  },
  MuiDialogContent: {
    root: {
      padding: 0,
    },
    dividers: {
      borderTop: `${pxToRem(3)} solid ${theme.palette.text.hint}`,
      borderBottom: `${pxToRem(3)} solid ${theme.palette.text.hint}`,
    },
  },
  MuiTooltip: {
    popper: {
      zIndex: "999999999",
    },
    popperArrow: {
      '&[x-placement*="bottom"] $arrow': {
        marginLeft: pxToRem(4),
        marginRight: pxToRem(4),
      },
      '&[x-placement*="top"] $arrow': {
        marginLeft: pxToRem(4),
        marginRight: pxToRem(4),
      },
      '&[x-placement*="right"] $arrow': {
        marginTop: pxToRem(4),
        marginBottom: pxToRem(4),
      },
      '&[x-placement*="left"] $arrow': {
        marginTop: pxToRem(4),
        marginBottom: pxToRem(4),
      },
    },
    tooltip: {
      padding: theme.spacing(pxToRem(9), pxToRem(12)),
      maxWidth: "unset",
      backgroundColor: theme.palette.common.white,
      color: theme.palette.secondary.dark,
      border: `${pxToRem(1)} solid ${theme.palette.primary.main}`,
      borderRadius: pxToRem(4),
      textAlign: "left",
      fontSize: pxToRem(14),
      fontWeight: 400,
      textTransform: "initial",
      lineHeight: 1,
    },
    arrow: {
      "&::before": {
        backgroundColor: theme.palette.common.white,
        border: `${pxToRem(1)} solid ${theme.palette.primary.main}`,
        boxSizing: "border-box",
      },
    },
    touch: {
      padding: theme.spacing(pxToRem(9), pxToRem(12)),
    },
    tooltipPlacementBottom: {
      margin: theme.spacing(pxToRem(18), pxToRem(0)),
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(pxToRem(18), pxToRem(0)),
      },
    },
    tooltipPlacementTop: {
      margin: theme.spacing(pxToRem(4), pxToRem(0)),
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(pxToRem(4), pxToRem(0)),
      },
    },
    tooltipPlacementRight: {
      margin: theme.spacing(pxToRem(0), pxToRem(4)),
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(pxToRem(0), pxToRem(4)),
      },
    },
    tooltipPlacementLeft: {
      margin: theme.spacing(pxToRem(0), pxToRem(4)),
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(pxToRem(0), pxToRem(4)),
      },
    },
  },
  MuiGrid: {
    "spacing-xs-3": {
      "& > $item": {
        padding: `${pxToRem(15)}`,
      },
      width: `calc(100% + ${pxToRem(30)})`,
      margin: `-${pxToRem(17)}`,
    },
  },
  MuiAccordion: {
    root: {
      "&$expanded": {
        marginBottom: theme.spacing(0),
        margin: theme.spacing(0),
      },
    },
  },
  MuiAccordionSummary: {
    root: {
      padding: theme.spacing(0, 20),
      "&$expanded": {
        minHeight: pxToVh(0),
      },
    },
    expandIcon: {
      color: theme.palette.text.disabled,
      padding: theme.spacing(10),
    },
    content: {
      margin: theme.spacing(12, 0),
      "&$expanded": {
        margin: theme.spacing(12, 0),
      },
    },
  },
  MuiAccordionDetails: {
    root: {
      padding: pxToRem(30),
    },
  },
  MuiPopover: {
    paper: {
      minWidth: pxToRem(16),
      minHeight: pxToRem(16),
    },
  },
  MuiDivider: {
    vertical: { width: pxToRem(2) },
  },
  PrivateSwitchBase: {
    root: {
      padding: 0,
    },
  },
});

export default MuiOverrides;
