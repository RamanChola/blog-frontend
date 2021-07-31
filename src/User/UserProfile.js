import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Posts from "../Homepage/components/Posts";
import axios from "axios";
import { AuthContext } from "../Auth/auth-context";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingTop: 20,
  },
  img: {
    borderRadius: "50%",
    height: "150px",
    width: "150px",
    overflow: "hidden",

    "@media (max-width: 600px)": {
      margin: "15px",
      height: "100px",
      width: "100px",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "relative",
    "&:hover $overlay": {
      opacity: 1,
    },
  },
  overlay: {
    position: "absolute",
    background: "rgba(0, 0, 0, 0.5)",
    transition: ".5s ease",
    opacity: 0,
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    justifycontent: "center",
  },
}));

export const Profile = () => {
  const classes = useStyles();
  let history = useHistory();
  const [file, setFile] = React.useState();
  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = React.useState();
  const auth = useContext(AuthContext);
  const { uid } = useParams();
  React.useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/posts/user/${uid}`
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, [uid]);
  React.useEffect(() => {
    const fetchUser = async () => {
      const User = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${uid}`
      );
      setUser(User);
    };
    fetchUser();
  }, [uid]);
  const profileImageHandler = (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profilepic", file);
      axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`,
        formData,
        {
          headers: { authorization: "Bearer " + auth.token },
        }
      );
      history.push("/");
    } catch (error) {
      console.log(error)
    }
  };


  console.log(file);
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        style={{ paddingBottom: "80px", borderBottom: "1px solid grey" }}
      >
        <Grid
          item
          sm={4}
          xs={4}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            maxWidth: "35vh",
          }}
        >
          {auth.userId === uid ? (
            <form onSubmit={profileImageHandler} className={classes.form}>
              <input
                id="contained-profile-pic"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label htmlFor="contained-profile-pic">
                <div className={classes.container}>
                  {!file && (
                    <img
                      alt="profilePic"
                      src={
                        user && user.data.profilePic
                          ? `https://blog-by-raman-backend.herokuapp.com/api/uploads/images/${user.data.profilePic}`
                          : "https://static.thenounproject.com/png/3643785-200.png"
                      }
                      className={classes.img}
                    />
                  )}

                  {file && (
                    <img
                      className={classes.img}
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                  )}
                  <div className={classes.overlay}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera fontSize="large" />
                    </IconButton>
                  </div>
                </div>
              </label>
              {file && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Save
                </Button>
              )}
            </form>
          ) : (
            <img
              alt="profilePic"
              src={
                user && user.data.profilePic
                  ? `https://blog-by-raman-backend.herokuapp.com/uploads/images/${user.data.profilePic}`
                  : "https://static.thenounproject.com/png/3643785-200.png"
              }
              className={classes.img}
            />
          )}
        </Grid>
        <Grid item sm={8} xs={8} style={{ maxWidth: "40vh" }}>
          <Typography variant="h5">
            {user
              ? `${user.data.username} ${user.data.lastname}`
              : "Loading ..."}
          </Typography>
          <Grid
            container
            justify="flex-start"
            direction="row"
            style={{ marginTop: "14px" }}
          >
            <Grid item>
              <Typography align="center" variant="subtitle2">
                64 posts
              </Typography>
            </Grid>
            <Grid item style={{ padding: "0 8px" }}>
              <Typography align="center" variant="subtitle2">
                64 followers
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="subtitle2">
                46 following
              </Typography>
            </Grid>
            <Typography variant="body1" style={{ paddingTop: "15px" }}>
              Raman Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type
              Chola
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={10}>
          <Posts posts={posts} />
        </Grid>
      </Grid>
    </div>
  );
};
export default Profile;
