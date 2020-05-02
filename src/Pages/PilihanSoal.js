import React, { Component } from "react";
import ReactModal from "react-modal";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

export default class PilihanSoal extends Component {
  state = {
    head: [
      {
        Header: "Data Pilihan Soal",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: "Pilihan",
            accessor: "pilihan",
            sortType: "basic",
          },
          {
            Header: "Status",
            accessor: "is_right",
            sortType: "basic",
            Cell: ({ row }) => (
              <div>{row.original.is_right === 1 ? "Benar" : "Salah"}</div>
            ),
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
              </div>
            ),
          },
        ],
      },
    ],
    body: [],
    idPertanyaan: "",
    pertanyaan: "",
    idPilihan: "",
    inputPilihan: "",
    inputStatus: 0,
    showModal: false,
  };

  onChangePilihan = (event) => {
    this.setState({
      inputPilihan: event.target.value,
    });
  };

  onChangeStatus = (event) => {
    this.setState({
      inputStatus: event.target.value,
    });
  };

  fetchPilihanSoal = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("x");
    const pertanyaan = params.get("y");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/pilihan-soal/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          body: result,
          idPertanyaan: id,
          pertanyaan: pertanyaan,
        });
      })
      .catch((error) => console.log("error", error));
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id_soal: this.state.idPertanyaan,
      pilihan: this.state.inputPilihan,
      is_right: this.state.inputStatus,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/pilihan-soal`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchPilihanSoal();
      })
      .catch((error) => console.log("error", error));
  };

  handleEditButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id_soal: this.state.idPertanyaan,
      pilihan: this.state.inputPilihan,
      is_right: this.state.inputStatus,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/pilihan-soal/${this.state.idPilihan}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.fetchPilihanSoal();
      })
      .catch((error) => console.log("error", error));
  };

  handleClickDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/pilihan-soal/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchPilihanSoal();
      })
      .catch((error) => console.log("error", error));
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, inputPilihan: "", inputStatus: 0 });
  };

  handleClickEdit = (data) => {
    this.setState({
      inputPilihan: data.pilihan,
      showModal: true,
      edit: true,
      idPilihan: data.id,
      inputStatus: data.is_right,
    });
  };

  componentDidMount() {
    this.fetchPilihanSoal();
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          className="modal-custom"
          overlayClassName="modal-overlay-custom"
        >
          <h5>Tambah Pilihan</h5>

          <div>Pilihan</div>
          <input
            value={this.state.inputPilihan}
            onChange={this.onChangePilihan}
            type="text"
            className="form-control mb-2"
            placeholder="Pilihan"
          />

          <div>Status</div>
          <select
            value={this.state.inputStatus}
            onChange={this.onChangeStatus}
            name="status"
            className="form-control w-25 mb-4"
            id="status"
          >
            <option value="0">Salah</option>
            <option value="1">Benar</option>
          </select>

          {this.state.edit ? (
            <button
              className="btn btn-success mr-3"
              onClick={() => {
                this.handleEditButton();
                this.handleCloseModal();
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className="btn btn-info mr-3"
              onClick={() => {
                this.handleAddButton();
                this.handleCloseModal();
              }}
            >
              Tambah
            </button>
          )}
          <button className="btn btn-warning" onClick={this.handleCloseModal}>
            Cancel
          </button>
        </ReactModal>
        <SideBar />
        <BreadCumbs content="/Pilihan Soal" />
        <Container>
          <div className="page-box">
            <div className="d-flex mb-3">
              <button
                onClick={this.handleOpenModalAdd}
                className="btn btn-info"
              >
                <span>
                  <i className={`fas fa-plus`}></i>
                </span>
                Tambah
              </button>
            </div>
            <div className="d-flex mb-3">
              <div>Pertanyaan : {this.state.pertanyaan}</div>
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
