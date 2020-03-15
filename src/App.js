import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Authentication from "./Contexts/Authentication";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Kelas from "./Pages/Kelas";
import Evaluasi from "./Pages/Evaluasi";
import Siswa from "./Pages/Siswa";
import Materi from "./Pages/Materi";
import { ProtectedRoute } from "./Components/ProtectedRoute";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Authentication>
          <Switch>
            <Route exact path="/" render={() => <Login></Login>}></Route>
            <ProtectedRoute
              exact
              path="/home"
              component={Home}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/kelas"
              component={Kelas}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/siswa"
              component={Siswa}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/materi"
              component={Materi}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/evaluasi"
              component={Evaluasi}
            ></ProtectedRoute>
          </Switch>
        </Authentication>
      </Router>
    );
  }
}