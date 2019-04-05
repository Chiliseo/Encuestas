import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";


// pages
import Home from "../pages/Home";
import NewCsatForm from "../pages/NewCsatForm";
import EditCsatForm from "../pages/EditCsatForm";
import {CsatList,Csat} from "../pages/Csat";
import SettingsView from "../pages/Settings";
import Login from "../pages/Login";

export default class RoutesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const history = createBrowserHistory();
    return (
        <Router history={history}>
            <main id="content-main">
            {/* <div className={classes.toolbar} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/csat_list" component={CsatList} />
            <Route path="/csat/:id/:idcontrol" component={Csat} />
            <Route path="/new_csat_form" component={NewCsatForm} />
            <Route path="/edit/:idcsat" component={EditCsatForm} />
            <Route path="/settings" component={SettingsView} />
            <Route path="/login" component={Login} />
            </main>
        </Router>
    );
  }
}
