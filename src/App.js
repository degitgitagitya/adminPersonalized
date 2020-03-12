import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Kelas from "./Pages/Kelas";
import Evaluasi from "./Pages/Evaluasi";
import Siswa from "./Pages/Siswa";
import Materi from "./Pages/Materi";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Login></Login>}></Route>
          <Route exact path="/home" render={() => <Home></Home>}></Route>
          <Route exact path="/kelas" render={() => <Kelas></Kelas>}></Route>
          <Route exact path="/siswa" render={() => <Siswa></Siswa>}></Route>
          <Route exact path="/materi" render={() => <Materi></Materi>}></Route>
          <Route
            exact
            path="/evaluasi"
            render={() => <Evaluasi></Evaluasi>}
          ></Route>
        </Switch>
      </Router>
    );
  }
}
