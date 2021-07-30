import "./posts.css";
import Post from "./Post";
import Grid from "@material-ui/core/Grid";

export default function Posts({ posts }) {
  return (
    <Grid container spacing={3}>
      {posts.map((p) => (
        <Grid key={p._id} item xl={2} lg={4} md={6} xs={12}>
          <Post post={p} />
        </Grid>
      ))}
    </Grid>
  );
}
