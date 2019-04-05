import React from "react";
import { Route } from "react-router-dom";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import * as ROUTES from "../constants/routes";

// pages
// import Home from "../pages/Home";
import {CsatList,Csat} from "../pages/Csat";
import Login from "../pages/Login";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

const NavigationNonAuth = props => {
  const { classes } = props;
    console.log(process.env);
  return (
    <div className="routes">
        <div className={classes.root} id="content">
          <main className={classes.content} id="content-main">
            {/* <Route path="/" component={Home} /> */}
            <Route path={ROUTES.CSAT_LIST} component={CsatList} />
            <Route path={ROUTES.CSAT_ID_CONTROL} component={Csat} />
            <Route path={ROUTES.LOGIN} component={Login} />
            {/* <Route component={Login} /> */}
            
          </main>
        </div>
    </div>
  );
};

NavigationNonAuth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationNonAuth);
