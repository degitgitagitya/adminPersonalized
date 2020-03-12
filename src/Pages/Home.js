import React, { Component } from "react";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import NavLink from "../Components/NavLink";

import "./Home.css";

const DATA_KELAS = [
  {
    no: 1,
    nama: "X RPL 1",
    jumlah: 32
  },
  {
    no: 2,
    nama: "X RPL 2",
    jumlah: 22
  },
  {
    no: 3,
    nama: "X RPL 3",
    jumlah: 35
  },
  {
    no: 4,
    nama: "X RPL 4",
    jumlah: 26
  }
];

const TableKelas = props => {
  const { no, nama, jumlah } = props;
  return (
    <tr>
      <td>{no}</td>
      <td>{nama}</td>
      <td>{jumlah}</td>
    </tr>
  );
};

export default class Home extends Component {
  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content="/Beranda" />
        <Container>
          <div className="page-box">
            <div className="row">
              <div className="col-5">
                <h3 className="home-nama text-center">John Doe</h3>
                <hr />
                <div className="row justify-content-center">
                  <div className="col-6">
                    <img
                      src="https://ppmschool.ac.id/id/wp-content/uploads/2016/01/tutor-8.jpg"
                      alt="profile-picture"
                      className="img-fluid home-image"
                    />
                  </div>
                </div>

                <hr />
                <div className="text-center">
                  <div className="home-detail">RPL</div>
                  <div className="home-detail">john.doe@gmail.com</div>
                  <div className="home-detail">Pemrograman</div>
                </div>
              </div>
              <div className="col-7">
                <h3 className="text-center home-nama">Daftar Kelas</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>Nama Kelas</td>
                      <td>Jumlah Siswa</td>
                    </tr>
                  </thead>
                  <tbody>
                    {DATA_KELAS.map(data => {
                      return (
                        <TableKelas
                          key={data.no}
                          no={data.no}
                          nama={data.nama}
                          jumlah={data.jumlah}
                        ></TableKelas>
                      );
                    })}
                  </tbody>
                </table>
                <hr />
                <NavLink href="/kelas">
                  <button className="btn btn-outline-info form-control">
                    Selengkapnya
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
