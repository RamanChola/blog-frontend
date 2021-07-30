import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/lightTop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    minWidth: 304,
    borderRadius: 0,
    position: "relative",
    margin: 5,
    "@media (max-width: 700px)": {
      minWidth: "100%",
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    display: "block",
    textAlign: "center",
    color: "#fff",
    letterSpacing: "3px",
    fontWeight: 200,
    fontSize: 12,
  },
  title: {
    color: "#fff",
    letterSpacing: "2px",
  },
  Link: {
    textDecoration: "none",
    listStyle: "none",
  },
}));

export const NewsCard = React.memo(function NewsCard2(props) {
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  
  return (
    <Card style={ props.posts.title.length === 0 ? { pointerEvents:"none"} : {}} className={cx(styles.root, shadowStyles.root)}>
      <Link
        className={styles.Link}
        to={{
          pathname: "/api/news",
          state: {
            title: props.posts.title,
            description: props.posts.description,
            img: props.posts.img,
            date: props.posts.date,
          },
        }}
      >
        <CardMedia
          classes={mediaStyles}
          image={
            "https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
          }
        />
        <CardActionArea>
          <CardContent className={styles.content}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              minHeight={360}
              color={"common.white"}
              textAlign={"center"}
            >
              <h1 className={styles.title}>NEWS</h1>
              {props.posts.title.length === 0 && (
                <CircularProgress color="secondary" />
              )}
               {props.posts.title.map(function(title,index){
                return(
                  <p key={index}>{title}</p>
                )
              })}
            </Box>
            <Typography className={styles.cta} variant={"overline"}>
              Explore
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
});

export default NewsCard;
