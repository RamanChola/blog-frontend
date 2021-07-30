import React from "react";
import Grid from "@material-ui/core/Grid";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import clsx from "clsx";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useN04TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n04";
const useStyles = makeStyles({
  root: {
    margin: 10,
    width: "100%",
  },
  Link: {
    color: "black",
    textDecoration: "none",
    listStyle: "none",
  },
});
export default function NewsPageFull() {
  const classes = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  let location = useLocation();
  const { title, description, img, date } = location.state;

  return (
    <Grid container>
      {title.map(function (currentValue, index) {
        return (
          <Grid
            key={index}
            item
            xl={2}
            lg={3}
            md={3}
            xs={12}
            style={{ display: "flex" }}
          >
            <Card className={clsx(classes.root, shadowStyles.root)}>
              <CardMedia
                classes={mediaStyles}
                image={img[index]}
                title={currentValue}
              >
              </CardMedia>

              <CardContent>
                <TextInfoContent
                  classes={textCardContentStyles}
                  overline={date[index]}
                  heading={currentValue}
                  body={description[index]}
                />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
