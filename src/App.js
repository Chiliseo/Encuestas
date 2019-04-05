import React, { Component } from "react";

import Header from "./components/template/Header";
import Footer from "./components/template/Footer";
import Navigation from "./components/Navigation"
import { withGlobalState } from "react-globally";

import { withAuthentication } from './components/Session';

class App extends Component {
 constructor(props) {
    super(props);
    this.state={
       login:false,
       authUser:null
    }
 }
  render() {
    console.log(this.state.authUser);
    return (
      <div className="App">
         <Header></Header>
         <Navigation authUser={this.state.authUser} />
         <Footer></Footer>
      </div>
    );
  }
}

export default withAuthentication(withGlobalState(App)) ;
