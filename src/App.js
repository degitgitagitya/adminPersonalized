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
import NotFound from "./Pages/NotFound";
import Kuesioner from "./Pages/Kuesioner";
import SubMateri from "./Pages/SubMateri";
import BankSoal from "./Pages/BankSoal";
import Soal from "./Pages/Soal";
import PilihanSoal from "./Pages/PilihanSoal";
import MediaCode from "./Pages/MediaCode";

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
            <ProtectedRoute
              exact
              path="/kuesioner"
              component={Kuesioner}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/submateri"
              component={SubMateri}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/banksoal"
              component={BankSoal}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/soal"
              component={Soal}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/pilihansoal"
              component={PilihanSoal}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/media-code"
              component={MediaCode}
            ></ProtectedRoute>
            <Route path="*" component={() => <NotFound />} />
          </Switch>
        </Authentication>
      </Router>
    );
  }
}
