import React, { Component } from "react";
import ReactModal from "react-modal";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

export default class BankSoal extends Component {
  state = {
    listBankSoal: [],
    head: [
      {
        Header: "Data Kelas",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: "Nama Bank Soal",
            accessor: "nama",
            sortType: "basic",
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
            ),
          },
        ],
      },
    ],
    inputNama: "",
    idBankSoal: "",
    showModal: false,
  };

  onChangeNama = (event) => {
    this.setState({
      inputNama: event.target.value,
    });
  };

  fetchBankSoal = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/bank-soal`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          inputNama: "",
          listBankSoal: result,
        });
      })
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.fetchBankSoal();
  }

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ nama: this.state.inputNama });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/bank-soal`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchBankSoal();
      })
      .catch((error) => console.log("error", error));
  };

  handleEditButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ nama: this.state.inputNama });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/bank-soal/${this.state.idBankSoal}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.fetchBankSoal();
      })
      .catch((error) => console.log("error", error));
  };

  handleClickDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/bank-soal/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchBankSoal();
      })
      .catch((error) => console.log("error", error));
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, inputNama: "" });
  };

  handleClickEdit = (data) => {
    this.setState({
      inputNama: data.nama,
      showModal: true,
      edit: true,
      idBankSoal: data.id,
    });
  };

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          className="modal-custom"
          overlayClassName="modal-overlay-custom"
        >
          <h5>Tambah Bank Soal</h5>

          <label htmlFor="nama">Nama Bank Soal</label>
          <input
            value={this.state.inputNama}
            onChange={this.onChangeNama}
            type="text"
            className="form-control mb-3"
            id="nama"
            placeholder="Nama Bank Soal"
          />
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
        <BreadCumbs content="/Bank Soal" />
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
            <ReactTable
              head={this.state.head}
              body={this.state.listBankSoal}
            ></ReactTable>
          </div>
        </Container>
      </div>
    );
  }
}
