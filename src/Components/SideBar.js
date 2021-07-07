import React, { Component } from "react";

import { AuthContext } from "../Contexts/Authentication";
import NavLink from "./NavLink";

import "./SideBar.css";

const DATA_MENU = [
  {
    no: 1,
    nama: "Beranda",
    icon: "fa-home",
    route: "/home",
  },
  {
    no: 2,
    nama: "Kelas",
    icon: "fa-chalkboard",
    route: "/kelas",
  },
  {
    no: 3,
    nama: "Aktivitas",
    icon: "fa-book-open",
    route: "/aktivitas",
  },
  {
    no: 4,
    nama: "Materi",
    icon: "fa-book",
    route: "/materi",
  },
  {
    no: 5,
    nama: "Bank Soal",
    icon: "fa-file-alt",
    route: "/banksoal",
  },
  {
    no: 6,
    nama: "Evaluasi",
    icon: "fa-pencil-ruler",
    route: "/evaluasi",
  },
  {
    no: 7,
    nama: "Kuesioner",
    icon: "fa-question",
    route: "/kuesioner",
  },
  {
    no: 8,
    nama: "Media Code",
    icon: "fa-code",
    route: "/media-code",
  },
];

const MenuContent = (props) => {
  return (
    <NavLink href={props.data.route}>
      <div className="sidebar-content">
        <i className={`fas ${props.data.icon} sidebar-content-icon`}></i>
        {props.data.nama}
      </div>
    </NavLink>
  );
};

export default class SideBar extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-user">
          <div className="row">
            <div className="col-3">
              <div className="sidebar-icon-user">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-12 sidebar-user-name">
                  {this.context.data.nama}
                </div>
              </div>
              <div className="row">
                <div className="col-12 sidebar-user-status">
                  <i className="fas fa-circle sidebar-user-status-icon"></i>
                  {this.context.data.mata_pelajaran}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="sidebar-line" />
        {DATA_MENU.map((data) => {
          return <MenuContent key={data.no} data={data}></MenuContent>;
        })}
        <hr className="sidebar-line" />
        <NavLink href="/">
          <div className="sidebar-content">
            <i className={`fas fa-sign-out-alt sidebar-content-icon`}></i>
            Logout
          </div>
        </NavLink>
      </div>
    );
  }
}
