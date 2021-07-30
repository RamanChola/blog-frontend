import React, { useContext } from "react";
import Posts from "../Homepage/components/Posts";
import Sidebar from "../Homepage/components/Sidebar";
import axios from "axios";
import { AuthContext } from "../Auth/auth-context";
import Typography from "@material-ui/core/Typography";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import "./my-blogs.css";
export const MyBlogs = () => {
  const [posts, setPosts] = React.useState([]);
  const auth = useContext(AuthContext);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/posts/user/${auth.userId}`
      );
      res.data.length !== 0 ? setPosts(res.data) : setPosts(null);
    };
    fetchPosts();
  }, [auth.userId]);
  const styles = useOverShadowStyles({
    // inactive: true, // add this line to disable hover effect
  });
  return posts ? (
    <div className="my-blogs">
      <Posts posts={posts} />
      <Sidebar />
    </div>
  ) : (
    <div className="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        classes={styles}
        width={"80%"}
        borderRadius={16}
        height={160}
      >
        <Typography variant="h4">No place found!</Typography>
        <Button component={Link} to={"/addblog"} variant="outlined">
          Create New
        </Button>
      </Box>
    </div>
  );
};
export default MyBlogs;
