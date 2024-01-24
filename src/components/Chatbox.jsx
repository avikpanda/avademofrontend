import Grow from "@material-ui/core/Grow";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chatBubble: {
    paddingLeft: theme.typography.pxToRem(8),
    paddingRight: theme.typography.pxToRem(8),
    minHeight: "1rem",
    overflow: "hidden",
    marginTop: theme.typography.pxToRem(10),
  },
  left: {
    maxWidth: "99%",
    borderTopRightRadius: theme.typography.pxToRem(10),
    borderBottomRightRadius: theme.typography.pxToRem(10),
    borderBottomLeftRadius: theme.typography.pxToRem(10),
    marginTop: theme.typography.pxToRem(10),
    backgroundColor: theme.palette.background.level3,
    padding: `${theme.typography.pxToRem(5)} ${theme.typography.pxToRem(10)}`,
    display: "inline-block",
    border: "1px solid rgba(162, 169, 176, 1)",
  },
  right: {
    maxWidth: "99%",
    borderTopLeftRadius: theme.typography.pxToRem(10),
    borderBottomLeftRadius: theme.typography.pxToRem(10),
    borderBottomRightRadius: theme.typography.pxToRem(10),
    marginTop: theme.typography.pxToRem(10),
    backgroundColor: theme.palette.background.level2,
    padding: `${theme.typography.pxToRem(5)} ${theme.typography.pxToRem(10)}`,
    display: "inline-block",
    border: "1px solid rgba(162, 169, 176, 1)",
  },
  stringAvatarChild: {
    backgroundColor: theme.palette.background.level1,
    color: theme.palette.text.primary,
    border: ({ side }) =>
      `${theme.typography.pxToRem(1)} solid ${
        side === "left"
          ? theme.palette.primary.light
          : theme.palette.secondary.dark
      }`,
  },
  elementAvatarChild: {
    backgroundColor: "transparent",
  },
  avatarTitle: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.primary,
    marginLeft: ({ side }) => side === "left" && theme.typography.pxToRem(7),
    marginRight: ({ side }) => side === "right" && theme.typography.pxToRem(7),
  },
  timestampSeparator: {
    width: theme.typography.pxToRem(4),
    height: theme.typography.pxToRem(4),
    borderRadius: "50%",
    backgroundColor: theme.palette.text.disabled,
    marginLeft: theme.typography.pxToRem(7),
    marginRight: theme.typography.pxToRem(7),
  },
  timestamp: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.disabled,
  },
  avatarRoot: {
    width: theme.typography.pxToRem(40),
    height: theme.typography.pxToRem(40),
  },
  avatarColor: {
    backgroundColor: ({ side }) =>
      side === "right"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
}));
const timestampFormatter = (datetime) =>
  datetime instanceof Date
    ? `${`0${datetime.getHours()}`.slice(
        -2
      )}:${`0${datetime.getMinutes()}`.slice(-2)}`
    : "";

const Chatbox = (props) => {
  const {
    text,
    side,
    children,
    avatarSrc,
    avatarChildren,
    avatarProps,
    timestamp,
    avatarTitle,
    name,
  } = props;

  const defaultStyle = useStyles({ side });

  const stringAvatarChildren =
    typeof avatarChildren === "string" || avatarChildren instanceof String;

  return (
    <Grow in>
      <Grid
        className={defaultStyle.chatBubble}
        container
        direction="column"
        wrap="nowrap"
        alignItems={side === "right" ? "flex-end" : "flex-start"}
      >
        <Grid
          item
          container
          direction={side === "right" ? "row-reverse" : "row"}
          alignItems="center"
        >
          <Avatar
            className={{
              [defaultStyle.stringAvatarChild]:
                !avatarSrc && stringAvatarChildren,
              [defaultStyle.elementAvatarChild]:
                !avatarSrc && !stringAvatarChildren,
            }}
            classes={{
              root: defaultStyle.avatarRoot,
              colorDefault: defaultStyle.avatarColor,
            }}
            src={avatarSrc}
            {...avatarProps}
          >
            {avatarTitle}
          </Avatar>

          {avatarTitle && (
            <Typography className={defaultStyle.avatarTitle}>{name}</Typography>
          )}

          {timestamp && (
            <>
              <div className={defaultStyle.timestampSeparator} />

              <Typography className={defaultStyle.timestamp}>
                {timestampFormatter(timestamp)}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item className={defaultStyle[side]}>
          {text && <Typography>{text}</Typography>}

          {children}
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Chatbox;
