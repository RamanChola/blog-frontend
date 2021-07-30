import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import { useLocation } from "react-router";
import "./edit-post.css";
import axios from "axios";
import { AuthContext } from "../Auth/auth-context";
const schema = yup.object().shape({
  Title: yup
    .string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Title is required"),
  Content: yup
    .string()
    .min(3, "Too Short")
    .max(999, "Too Long!")
    .required("Content is required"),
});
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    justifyContent: "center",
  },
}));

const EditPost = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const auth = useContext(AuthContext);
  const [error, setError] = React.useState(false);
  let history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const classes = useStyles();
  const handleUpdate = async (event) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${path}`,
        {
          title: event.Title,
          content: event.Content,
        },
        {
          headers: { authorization: "Bearer " + auth.token },
        }
      );
      history.push("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Container classes={{ root: "container" }}>
      <div className={classes.paper}>
        {error && (
          <p style={{ color: "red" }}>
            Editing post failed, please try again later.
          </p>
        )}
        <form className={classes.form} onSubmit={handleSubmit(handleUpdate)}>
          <div className="writeFormGroup">
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  required
                  id="Title"
                  label="Title"
                  autoFocus
                  error={Boolean(errors.Title)}
                  helperText={errors.Title?.message}
                />
              )}
              name="Title"
              defaultValue=""
              control={control}
            />
          </div>
          <TextField
            multiline
            rows={4}
            margin="normal"
            {...register("Content")}
            required
            fullWidth
            name="Content"
            label="Content"
            type="Content"
            id="Content"
            error={Boolean(errors.Content)}
            helperText={errors.Content?.message}
          />
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
};
export default EditPost;
