import React, { Component } from "react";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

import "./Kelas.css";

const DATA_HEAD = [
  {
    Header: "Data Kelas",
    columns: [
      {
        Header: "No",
        accessor: "no",
        sortType: "basic"
      },
      {
        Header: "Nama Kelas",
        accessor: "nama",
        sortType: "basic"
      },
      {
        Header: "Jumlah Siswa",
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
    nama: "X RPL 1",
    jumlah: 15
  },
  {
    no: 2,
    nama: "X RPL 2",
    jumlah: 30
  },
  {
    no: 3,
    nama: "X RPL 3",
    jumlah: 23
  },
  {
    no: 4,
    nama: "X RPL 4",
    jumlah: 41
  },
  {
    no: 5,
    nama: "X RPL 5",
    jumlah: 22
  }
];

export default class Kelas extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content="/Kelas" />
        <Container>
          <div className="page-box">
            <ReactTable head={DATA_HEAD} body={DATA_TABLE}></ReactTable>
          </div>
        </Container>
      </div>
    );
  }
}
