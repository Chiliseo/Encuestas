import React from "react";
import { Route, Link } from "react-router-dom";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {Drawer,List,ListItem,ListItemIcon,ListItemText} from "@material-ui/core";
import {Settings, Create, HowToVote, HomeRounded} from "@material-ui/icons"
import * as ROUTES from "../constants/routes";
// pages
import Home from "../pages/Home";
import NewCsatForm from "../pages/NewCsatForm";
import EditCsatForm from "../pages/EditCsatForm";
import {CsatList,Csat} from "../pages/Csat";
import SettingsView from "../pages/Settings";
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

const NavigationAuth = props => {
  const { classes } = props;

  return (
    <div className="routes">
        <div className={classes.root} id="content">
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {/* <div className={classes.toolbar} /> */}
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <HomeRounded />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/csat_list">
                <ListItemIcon>
                  <HowToVote />
                </ListItemIcon>
                <ListItemText primary="Encuesta" />
              </ListItem>
              <ListItem button component={Link} to="/new_csat_form">
                <ListItemIcon>
                  <Create />
                </ListItemIcon>
                <ListItemText primary="Create Form CSAT" />
              </ListItem>
              <ListItem button component={Link} to="/settings">
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Setting" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content} id="content-main">
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.CSAT_LIST} component={CsatList} />
            <Route path={ROUTES.CSAT_ID_CONTROL} component={Csat} />
            <Route path={ROUTES.NEW_CSAT_FORM} component={NewCsatForm} />
            <Route path={ROUTES.EDIT_CSAT_FORM} component={EditCsatForm} />
            <Route path={ROUTES.SETTINGS} component={SettingsView} />
            <Route path={ROUTES.LOGIN} component={Login} />
            {/* <Route component={Home} /> */}
          </main>
        </div>
    </div>
  );
};

NavigationAuth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationAuth);
