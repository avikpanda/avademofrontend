import React from 'react';
import { Grid , Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "98vw",
    margin: theme.typography.pxToRem(20)
  },
  cardRoot: {
    display: "flex",
    flexDirection: "column"
  },
  cardHeader: {
    display: "flex"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0
  },
  custInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid grey",
    padding: theme.typography.pxToRem(20)
  },
  avatar: {
    backgroundColor: 'red',
    color: '#00000F',
    border: '2px solid grey'
    },
hangup: {
    backgroundColor: "red",
    width: theme.typography.pxToRem(100),
    height: theme.typography.pxToRem(40),
    margin: 0
    }
}));

export default function Call() {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      spacing={2}
      className={classes.root}
    >
        <Grid item xs={6}>
        <Card className={classes.cardRoot}>
        <CardHeader title="Contact Info" 
        classes={{
            root: classes.cardHeader,
        }}
        />
      <CardContent
       classes={{
        root: classes.cardContent
       }} 
      >
      
      <div className={classes.custInfoContainer}>
        <Avatar aria-label="recipe" className={classes.avatar}>
                A
        </Avatar>
        <Typography className={classes.title} color="textSecondary" >
            Contact Name : Abhijeet Dey 
        </Typography>
        <Typography className={classes.title} color="textSecondary">
            Contact Number : +91 000-000-0000 
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Security Role : Analyst 
        </Typography>
        <Button className={classes.hangup}>Hangup</Button>
      </div>
      </CardContent>
    </Card>
        </Grid>
        <Grid item xs={6}>
        <Card className={classes.cardRoot}>
        <CardHeader 
        title="Account Context" 
        

        />
      <CardContent
       classes={{
        root: classes.cardContent,
       }} 
      >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Total Open Amount : $600
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Days past due : 30
        </Typography>
      </CardContent>
    </Card>
        </Grid>
        <Grid item xs={4}>
        <Card className={classes.cardRoot}>
      <CardHeader title="AI Touch Points"/>
      <CardContent
       classes={{
        root: classes.cardContent,
       }} 
      >
        <ul>
        <li>
            <Typography variant="h5" component="h2">
                Customer Identified
            </Typography>
        </li>
        <li>
            <Typography variant="h5" component="h2">
                Open P2Ps
            </Typography></li>
        </ul>
    </CardContent>
    </Card>
        </Grid>
        <Grid item xs={8}>
        <Card className={classes.cardRoot}>
      <CardHeader title="Transcription"/>
      <div></div>
    </Card>
        </Grid>
    </Grid>
  );
}
