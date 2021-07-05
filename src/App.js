// phuongmychi.vn

import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserManger from "./components/UserManger";
import EditUser from "./components/EditUser";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Menu = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UserManger} />
        <Route path="/edit-user" exact component={EditUser} />
      </Switch>
    </Router>
  );
};
const App = ({ getalluser, dispatch }) => {
  return (
    <div>
      <Menu />
    </div>
  );
};
const mapStateToProps = (state) => ({
  getalluser: state.getalluser
});
export default connect(mapStateToProps)(App);
