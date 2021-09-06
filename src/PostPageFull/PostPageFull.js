import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { AuthContext } from "../Auth/auth-context";
import { Link } from "react-router-dom";
import Sidebar from "../Homepage/components/Sidebar";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import "./post-page-full.css";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    border: "none",
    boxShadow: "none",
  },
  media: {
    height: 400,
    cursor: "default",
  },
  Link: {
    color: "black",
    textDecoration: "none",
    listStyle: "none",
  },
  buttons: {
    marginLeft: "auto",
    marginTop: 0,
  },
});

export default function PostPageFull() {
  const [post, setPost] = React.useState(null);
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  let history = useHistory();

  const deleteHandler = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${path}`, {
        headers: { authorization: "Bearer " + auth.token },
      });
      history.push("/");
    } catch (error) {}
  };
  React.useEffect(() => {
    let unmounted = false;
    async function getPost() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/` + path
        );
        if (!unmounted) {
          setPost(res.data);
        }
      } catch (error) {
        if (!unmounted) {
          console.log(error);
        }
      }
    }
    getPost();
    return () => {
      unmounted = true;
    };
  }, [path]);
  return (
    <div className="postpage">
      <Card classes={{ root: "card" }} className={classes.root}>
        {post && post.image && (
          <CardMedia
            className={classes.media}
            image={`https://bloggiter.xyz/uploads/images/${post.image}`}
            title={post.title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            {post && post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {post &&
              post.content.charAt(0).toUpperCase() + post.content.slice(1)}
          </Typography>
        </CardContent>
        {post && auth.isLoggedIn && auth.userId === post.creator && (
          <CardActions>
            <Button
              startIcon={<EditIcon />}
              className={classes.buttons}
              component={Link}
              to={`/place/${path}`}
              size="small"
              color="default"
            >
              Edit
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={deleteHandler}
              to={"/p1"}
              size="small"
              color="default"
            >
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
      <Sidebar />
    </div>
  );
}
