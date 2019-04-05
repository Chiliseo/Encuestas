import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withGlobalState } from "react-globally";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from '../Session';

import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/green";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Icon
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Online } from "react-detect-offline";
import Logo from "./Logo";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  LinkItem: {
    color: grey[50],
    textDecoration: "none",
    "&:hover": {
      color: grey[50]
    }
  }
};
class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
    console.log(props);
    this.signOut = this.signOut.bind(this)
    //  console.log(props.globalState.login);
  }
  signOut() {
    sessionStorage.clear();
    this.props.setGlobalState(prevGlobalState => ({
      login: !prevGlobalState.login
    }))

  }
  render() {
    const { classes } = this.props;
    const { firebase } = this.props;
    const { globalState } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {globalState.login ? (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
            ) : (
                <div />
              )}
            <Typography
              align="left"
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Link to="/">
                <Logo />
              </Link>
            </Typography>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (
                  <Button color="inherit" onClick={firebase.doSignOut}>
                    <Icon>exit_to_app</Icon> Sign out
                </Button>
                ) : (
                    <Link to="/login" color="white" className={classes.LinkItem}>
                      <Button color="inherit" to="/login">
                        <Icon>person</Icon> Login
                </Button>
                    </Link>
                  )}
            </AuthUserContext.Consumer>

            <Link to="/csat_list" color="white" className={classes.LinkItem}>
              <Button color="inherit" to="/csat_list">
                <Icon>queue</Icon> Encuesta
              </Button>
            </Link>
           <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (
              <Online>
                <Button color="inherit">
                  <Icon>backup</Icon>
                </Button>
              </Online>
            ) : (
                <div />
              )}
              </AuthUserContext.Consumer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withGlobalState(withStyles(styles)(ButtonAppBar)));
