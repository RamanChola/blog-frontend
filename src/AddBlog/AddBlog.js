import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { AuthContext } from "../Auth/auth-context";
import { useHistory } from "react-router-dom";

import "./add-blog.css";
const schema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("title is required"),
  content: yup
    .string()
    .min(3, "Too Short")
    .max(999, "Too Long!")
    .required("content is required"),
  image: yup.mixed().required("Image is required"),
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
    justifycontent: "center",
  },
}));

const AddBlog = () => {
  const [file, setFile] = React.useState(null);
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const classes = useStyles();
  const authSubmitHandler = async (event) => {
    try {
      const formData = new FormData();
      formData.append("title", event.title);
      formData.append("content", event.content);
      formData.append("image", file);
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts/`, formData, {
        headers: {
          authorization: "Bearer " + auth.token,
          "Content-Type": "multipart/form-data",
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container classes={{ root: "container" }}>
      <div className={classes.paper}>
        {!file && (
          <>
            <img className="img" src="" alt="" />
          </>
        )}
        {file && <img className="img" src={URL.createObjectURL(file)} alt="" />}
        <form
          className={classes.form}
          onSubmit={handleSubmit(authSubmitHandler)}
        >
          <div className="writeFormGroup">
            <IconButton variant="contained" component="label">
              <AddCircleOutlineIcon style={{}} fontSize="large" />
              <input
                {...register("image", { required: true })}
                required
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ opacity: 0, position: "absolute", left: "-55%" }}
              />
            </IconButton>

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  required
                  id="title"
                  label="title"
                  autoFocus
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
              name="title"
              defaultValue=""
              control={control}
            />
          </div>
          <TextField
            multiline
            rows={4}
            margin="normal"
            {...register("content")}
            required
            fullWidth
            name="content"
            label="content"
            type="content"
            id="content"
            error={Boolean(errors.content)}
            helperText={errors.content?.message}
          />
          <Box style={{ display: "flex", justifycontent: "center" }}>
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
export default AddBlog;
