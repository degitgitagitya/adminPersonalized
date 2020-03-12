import React, { Component } from "react";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

import "./Siswa.css";

const DATA_HEAD = [
  {
    Header: "Data Siswa",
    columns: [
      {
        Header: "No",
        accessor: "no",
        sortType: "basic"
      },
      {
        Header: "Nama Siswa",
        accessor: "nama",
        sortType: "basic"
      },
      {
        Header: "Email",
        accessor: "email",
        sortType: "basic"
      },
      {
        Header: "Gaya Belajar",
        accessor: "gaya",
        sortType: "basic"
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <div>
            <button className="action-button-delete">Delete</button>
            <button className="action-button-edit">Edit</button>
          </div>
        )
      }
    ]
  }
];

const DATA_TABLE = [
  {
    no: 1,
    nama: "John",
    email: "john@gmail.com",
    gaya: "Convergen"
  },
  {
    no: 2,
    nama: "Doe",
    email: "doe@gmail.com",
    gaya: "Acomodator"
  }
];

export default class Siswa extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content="/Siswa" />
        <Container>
          <div className="page-box">
            <ReactTable head={DATA_HEAD} body={DATA_TABLE}></ReactTable>
          </div>
        </Container>
      </div>
    );
  }
}
