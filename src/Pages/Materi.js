import React, { Component } from "react";
import ReactModal from "react-modal";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

import "./Materi.css";

export default class Materi extends Component {
  state = {
    head: [
      {
        Header: "Data Materi",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>
          },
          {
            Header: "Indikator",
            accessor: "indikator",
            sortType: "basic"
          },
          {
            Header: "Judul",
            accessor: "judul",
            sortType: "basic"
          },
          {
            Header: "Keterangan",
            accessor: "keterangan",
            sortType: "basic"
          },
          {
            Header: "Tujuan Belajar",
            accessor: "tujuan_belajar",
            sortType: "basic"
          },
          {
            Header: "Action",
            accessor: "id",
            Cell: ({ row }) => (
              <div>
                <button
                  onClick={() => {
                    this.handleClickDelete(row.original.id);
                  }}
                  className="action-button-delete"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    this.handleClickEdit(row.original);
                  }}
                  className="action-button-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    this.props.history.push(
                      `/siswa?id_kelas=${row.original.id}&nama_kelas=${row.original.nama}`
                    );
                  }}
                  className="action-button-view"
                >
                  View
                </button>
              </div>
            )
          }
        ]
      }
    ],
    body: [],
    showModal: false,
    edit: false,
    inputIndikator: "",
    inputJudul: "",
    inputKeterangan: "",
    inputTujuan: "",
    idKuesioner: ""
  };

  onChangeIndikator = event => {
    this.setState({
      inputIndikator: event.target.value
    });
  };

  onChangeJudul = event => {
    this.setState({
      inputJudul: event.target.value
    });
  };

  onChangeKeterangan = event => {
    this.setState({
      inputKeterangan: event.target.value
    });
  };

  onChangeTujuan = event => {
    this.setState({
      inputTujuan: event.target.value
    });
  };

  fetchDataMateri = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/materi", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          body: result
        });
      })
      .catch(error => console.log("error", error));
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      judul: this.state.inputJudul,
      keterangan: this.state.inputKeterangan,
      indikator: this.state.inputIndikator,
      tujuan_belajar: this.state.inputTujuan
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/materi", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.fetchDataMateri();
        this.handleCloseModal();
      })
      .catch(error => console.log("error", error));
  };

  handleClickDelete = id => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    fetch(`http://127.0.0.1:5000/materi/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.fetchDataMateri();
      })
      .catch(error => console.log("error", error));
  };

  updateMateri = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      judul: this.state.inputJudul,
      keterangan: this.state.inputKeterangan,
      indikator: this.state.inputIndikator,
      tujuan_belajar: this.state.inputTujuan
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(
      `http://127.0.0.1:5000/materi/${this.state.idKuesioner}`,
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        this.fetchDataMateri();
        this.handleCloseModal();
      })
      .catch(error => console.log("error", error));
  };

  handleClickEdit = data => {
    this.setState({
      showModal: true,
      edit: true,
      idKuesioner: data.id,
      inputIndikator: data.indikator,
      inputJudul: data.judul,
      inputKeterangan: data.keterangan,
      inputTujuan: data.tujuan_belajar
    });
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      inputIndikator: "",
      inputJudul: "",
      inputKeterangan: "",
      inputTujuan: ""
    });
  };

  componentDidMount() {
    this.fetchDataMateri();
  }

  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content="/Materi" />
        <Container>
          <div className="page-box">
            <div className="page-button-container">
              <button
                onClick={this.handleOpenModalAdd}
                className="btn btn-info"
              >
                <span>
                  <i className={`fas fa-plus`}></i>
                </span>
                Tambah
              </button>

              <ReactModal
                isOpen={this.state.showModal}
                className="modal-custom"
                overlayClassName="modal-overlay-custom"
              >
                <h5>Tambah Kelas</h5>

                <label htmlFor="indikator">Indikator</label>
                <input
                  value={this.state.inputIndikator}
                  onChange={this.onChangeIndikator}
                  type="text"
                  className="form-control mb-3"
                  id="indikator"
                />

                <label htmlFor="judul">Judul</label>
                <input
                  value={this.state.inputJudul}
                  onChange={this.onChangeJudul}
                  type="text"
                  className="form-control mb-3"
                  id="judul"
                />

                <label htmlFor="keterangan">Keterangan</label>
                <input
                  value={this.state.inputKeterangan}
                  onChange={this.onChangeKeterangan}
                  type="text"
                  className="form-control mb-3"
                  id="keterangan"
                />

                <label htmlFor="tujuan">Tujuan Belajar</label>
                <input
                  value={this.state.inputTujuan}
                  onChange={this.onChangeTujuan}
                  type="text"
                  className="form-control mb-3"
                  id="tujuan"
                />
                {this.state.edit ? (
                  <button
                    className="btn btn-success mr-3"
                    onClick={this.updateMateri}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="btn btn-info mr-3"
                    onClick={this.handleAddButton}
                  >
                    Tambah
                  </button>
                )}
                <button
                  className="btn btn-warning"
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </button>
              </ReactModal>
            </div>
            <ReactTable
              head={this.state.head}
              body={this.state.body}
            ></ReactTable>
          </div>
        </Container>
      </div>
    );
  }
}
