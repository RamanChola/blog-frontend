import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { ColumnToRow, Row, Item } from "@mui-treasury/components/flex";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";

import {
  SocialProvider,
  SocialLink,
} from "@mui-treasury/components/socialLink";

import { useMoonSocialLinkStyles } from "@mui-treasury/styles/socialLink/moon";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";

const useStyles = makeStyles(({ typography, palette, breakpoints }) => ({
  legalLink: {
    ...typography.caption,
    justifyContent: "center",
    position: "relative",
    [breakpoints.up("sm")]: {
      "&:not(:first-of-type)": {
        "&:before": {
          content: '"|"',
          display: "block",
          position: "absolute",
          left: 0,
        },
      },
    },
  },
  navMenu: {
    flexWrap: "wrap",
  },
  logo: {
    fontFamily: "sans-serrif",
    paddingLeft:"25%"
  },
}));

export const Footer = React.memo(function NeptuneAppFooter() {
  const classes = useStyles();
  return (
    <Box bgcolor={"background.paper"} width={"100%"}>
      <Container>
        <Box pt={8} pb={2}>
          <Row wrap>
            <Item grow={2}>
              <Row alignItems={"center"}>
                <Item>
                  <Typography variant={"h6"} className={classes.logo}>
                    BLOG
                  </Typography>
                </Item>
              </Row>
              <NavMenu className={classes.navMenu}>
                <NavItem>About</NavItem>
                <NavItem>Careers</NavItem>
                <NavItem>Press</NavItem>
                <NavItem>Customer Care</NavItem>
                <NavItem>Services</NavItem>
              </NavMenu>
            </Item>
            <Item grow maxWidth={500} mx={"auto"}>
              <Box textAlign={"center"} mt={{ xs: 2, md: 0 }} my={2}>
                <SocialProvider useStyles={useMoonSocialLinkStyles}>
                  <SocialLink brand={"FacebookCircle"} />
                  <SocialLink brand={"Twitter"} />
                  <SocialLink brand={"Instagram"} />
                </SocialProvider>
              </Box>
            </Item>
          </Row>
        </Box>
        <Divider />
        <Box pt={2} pb={10}>
          <ColumnToRow
            at={"md"}
            columnStyle={{ alignItems: "center" }}
            rowStyle={{ alignItems: "unset" }}
          >
            <Item grow ml={-2} shrink={0}>
              <NavMenu useStyles={usePlainNavigationMenuStyles}>
                <ColumnToRow at={"sm"}>
                  <NavItem className={cx(classes.legalLink)}>
                    Terms & Conditions
                  </NavItem>
                  <NavItem className={cx(classes.legalLink)}>
                    Privacy Policy
                  </NavItem>
                  <NavItem className={cx(classes.legalLink)}>
                    Accessibility
                  </NavItem>
                  <NavItem className={cx(classes.legalLink)}>Legal</NavItem>
                </ColumnToRow>
              </NavMenu>
            </Item>
            <Item>
              <Box py={1} textAlign={{ xs: "center", md: "right" }}>
                <Typography
                  component={"p"}
                  variant={"caption"}
                  color={"textSecondary"}
                >
                  Designed by Raman Chola © Studio 2021 All right reserved
                </Typography>
              </Box>
            </Item>
          </ColumnToRow>
        </Box>
      </Container>
    </Box>
  );
});
