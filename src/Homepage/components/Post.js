import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useSlopeCardMediaStyles } from "@mui-treasury/styles/cardMedia/slope";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "./post.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
  },
  Link: {
    color: "black",
    textDecoration: "none",
    listStyle: "none",
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
}));

export default function MediaCard({ post }) {
  const [user, setUser] = React.useState();
  const classes = useStyles();
  const mediaStyles = useSlopeCardMediaStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  const Title = post.title.charAt(0).toUpperCase() + post.title.slice(1)
  const Content = post.content.charAt(0).toUpperCase() + post.content.slice(1)
  React.useEffect(() => {
    let unmounted = false;
    async function fetchUser() {
      try {
        const User = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${post.creator}`);
        if (!unmounted) {
          setUser(User);
        }
      } catch (error) {
        if (!unmounted) {
          console.log(error);
        }
      }
    }
    fetchUser();
    return () => {
      unmounted = true;
    };
  }, [post.creator]);
  return (
    <Card className={clsx(classes.root, shadowStyles.root)}>
      <Link className={classes.Link} to={`/post/${post._id}`}>
        <CardActionArea>
          {post.image && (
            <CardMedia
              classes={mediaStyles}
              image={`https://blog-by-raman-backend.herokuapp.com/uploads/images/${post.image}`}
              title={post.title}
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {Title}
            </Typography>
            <Typography
              className="postDesc"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {Content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>

      <CardActions>
        <IconButton component={Link} to={`/user/${post.creator}`}>
          {user && user.data.profilePic ? (
            <Avatar
              alt="User"
              className={classes.small}
              src={`https://blog-by-raman-backend.herokuapp.com/uploads/images/${user.data.profilePic}`}
            />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <Button
          component={Link}
          to={`/post/${post._id}`}
          size="small"
          color="default"
          style={{ marginLeft: "auto" }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
