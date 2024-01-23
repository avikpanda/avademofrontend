import Grow from "@material-ui/core/Grow";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chatBubble: {
    paddingLeft: theme.typography.pxToRem(8),
    paddingRight: theme.typography.pxToRem(8),
    minHeight: "1rem",
    marginTop: theme.typography.pxToRem(20),
    marginBottom: theme.typography.pxToRem(20),
    overflow: "hidden",
  },

  chatTextLeft: {
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.primary,
    width: "inherit",
    wordBreak: "break-word",
  },
  chatTextRight: {
    fontSize: theme.typography.pxToRem(20),
    textAlign: "right",
    color: theme.palette.text.secondary,
    wordBreak: "break-word",
  },
  clickable: {
    cursor: "pointer",
  },
  unselectable: {
    userSelect: "none",
  },
  left: {
    maxWidth: "99%",
    borderTopRightRadius: theme.typography.pxToRem(10),
    borderBottomRightRadius: theme.typography.pxToRem(10),
    borderBottomLeftRadius: theme.typography.pxToRem(10),
    marginTop: theme.typography.pxToRem(10),
    backgroundColor: theme.palette.background.level3,
    padding: theme.typography.pxToRem(15),
    paddingRight: theme.typography.pxToRem(22),
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
    padding: theme.typography.pxToRem(15),
    paddingLeft: theme.typography.pxToRem(22),
    display: "inline-block",
    border: "1px solid rgba(162, 169, 176, 1)",
  },

  avatar: {
    height: theme.typography.pxToRem(30),
    width: theme.typography.pxToRem(30),
    borderRadius: "50%",
    fontSize: theme.typography.pxToRem(14),
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
    textTransform: "uppercase",
    fontSize: theme.typography.pxToRem(14),
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
            className={
              (defaultStyle.avatar,
              {
                [defaultStyle.stringAvatarChild]:
                  !avatarSrc && stringAvatarChildren,
                [defaultStyle.elementAvatarChild]:
                  !avatarSrc && !stringAvatarChildren,
              })
            }
            src={avatarSrc}
            {...avatarProps}
          >
            {avatarChildren}
          </Avatar>

          {avatarTitle && (
            <Typography className={defaultStyle.avatarTitle}>
              {avatarTitle}
            </Typography>
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
          {text && (
            <Typography
              className={{
                [defaultStyle.chatTextRight]: side === "right",
                [defaultStyle.chatTextLeft]: side === "left",
              }}
            >
              {text}
            </Typography>
          )}

          {children}
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Chatbox;
