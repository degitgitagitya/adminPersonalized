import React, { Component } from "react";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

import "./Evaluasi.css";

const DATA_HEAD = [
  {
    Header: "Data Evaluasi",
    columns: [
      {
        Header: "No",
        accessor: "no",
        sortType: "basic"
      },
      {
        Header: "Nama Evaluasi",
        accessor: "nama",
        sortType: "basic"
      },
      {
        Header: "Waktu Mulai",
        accessor: "mulai",
        sortType: "basic"
      },
      {
        Header: "Waktu Selesai",
        accessor: "selesai",
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
    nama: "Evaluasi 1",
    mulai: "2020-04-15 11:00:00",
    selesai: "2020-04-15 11:00:00"
  },
  {
    no: 2,
    nama: "Evaluasi 2",
    mulai: "2020-04-15 11:00:00",
    selesai: "2020-04-15 11:00:00"
  }
];

export default class Evaluasi extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content="/Evaluasi" />
        <Container>
          <div className="page-box">
            <ReactTable head={DATA_HEAD} body={DATA_TABLE}></ReactTable>
          </div>
        </Container>
      </div>
    );
  }
}
