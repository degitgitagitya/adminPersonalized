import React, { Component } from "react";
import ReactModal from "react-modal";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

import "./Kuesioner.css";

export default class Kuesioner extends Component {
  state = {
    head: [
      {
        Header: "Data Kuesioner",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>
          },
          {
            Header: "Pertanyaan",
            accessor: "pertanyaan",
            sortType: "basic"
          },
          {
            Header: "Gaya Belajar",
            accessor: "id_gaya_belajar",
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
    modalShow: false,
    edit: false,
    inputPertanyaan: "",
    inputGaya: "",
    idQuesioner: ""
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      inputPertanyaan: "",
      inputGaya: ""
    });
  };

  onChangePertanyaan = event => {
    this.setState({
      inputPertanyaan: event.target.value
    });
  };

  onChangeGaya = event => {
    this.setState({
      inputGaya: event.target.value
    });
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id_gaya_belajar: this.state.inputGaya,
      pertanyaan: this.state.inputPertanyaan
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/kuesioner", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.fetchDataKuesioner();
        this.handleCloseModal();
      })
      .catch(error => console.log("error", error));
  };

  handleClickDelete = id => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    fetch(`http://127.0.0.1:5000/kuesioner/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.fetchDataKuesioner();
      })
      .catch(error => console.log("error", error));
  };

  fetchDataKuesioner = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/kuesioners", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          body: result
        });
      })
      .catch(error => console.log("error", error));
  };

  updateKuesioner = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id_gaya_belajar: this.state.inputGaya,
      pertanyaan: this.state.inputPertanyaan
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(
      `http://127.0.0.1:5000/kuesioner/${this.state.idQuesioner}`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        this.fetchDataKuesioner();
        this.handleCloseModal();
      })
      .catch(error => console.log("error", error));
  };

  handleClickEdit = data => {
    this.setState({
      showModal: true,
      edit: true,
      inputPertanyaan: data.pertanyaan,
      inputGaya: data.id_gaya_belajar,
      idQuesioner: data.id
    });
  };

  componentDidMount() {
    this.fetchDataKuesioner();
  }

  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content="/Kuesioner" />
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

                <label htmlFor="pertanyaan">Pertanyaan</label>
                <input
                  value={this.state.inputPertanyaan}
                  onChange={this.onChangePertanyaan}
                  type="text"
                  className="form-control mb-3"
                  id="pertanyaan"
                />

                <label htmlFor="gaya">Gaya Belajar</label>
                <input
                  value={this.state.inputGaya}
                  onChange={this.onChangeGaya}
                  type="text"
                  className="form-control mb-3"
                  id="gaya"
                />
                {this.state.edit ? (
                  <button
                    className="btn btn-success mr-3"
                    onClick={this.updateKuesioner}
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
