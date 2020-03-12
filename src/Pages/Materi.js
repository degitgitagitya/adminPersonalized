import React, { Component } from "react";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

import "./Materi.css";

const DATA_HEAD = [
  {
    Header: "Data Materi",
    columns: [
      {
        Header: "No",
        accessor: "no",
        sortType: "basic"
      },
      {
        Header: "Judul Materi",
        accessor: "judul",
        sortType: "basic"
      },
      {
        Header: "Jumlah Sub Materi",
        accessor: "jumlah",
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
    judul: "Prosedur",
    jumlah: 4
  },
  {
    no: 2,
    judul: "Fungsi",
    jumlah: 4
  }
];

export default class Materi extends Component {
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
