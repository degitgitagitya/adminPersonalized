import React, { Component } from "react";
import ReactModal from "react-modal";

import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

import "./Evaluasi.css";

export default class Evaluasi extends Component {
  state = {
    head: [
      {
        Header: "Data Evaluasi",
        columns: [
          {
            Header: "No",
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: "Nama Evaluasi",
            accessor: "mata_pelajaran",
            sortType: "basic",
          },
          {
            Header: "Durasi",
            accessor: "durasi",
            sortType: "basic",
            Cell: ({ row }) => <div>{row.original.durasi} Menit</div>,
          },
          {
            Header: "Bank Soal",
            accessor: "id_bank_soal",
            sortType: "basic",
            Cell: ({ row }) => (
              <div>
                <button
                  onClick={() => {
                    this.props.history.push(
                      `/soal?x=${row.original.id_bank_soal}`
                    );
                  }}
                  className="btn btn-info"
                >
                  Lihat Soal
                </button>
              </div>
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
    idUjian: "",
    inputMataPelajaran: "",
    inputDurasi: "",
    inputBankSoal: "",
    showModal: false,
    idKelas: "",
    status: "",
    tanggalTes: "",
    listBankSoal: [],
  };

  onChangeMataPelajaran = (event) => {
    this.setState({
      inputMataPelajaran: event.target.value,
    });
  };

  onChangeDurasi = (event) => {
    this.setState({
      inputDurasi: event.target.value,
    });
  };

  onChangeBankSoal = (event) => {
    this.setState({
      inputBankSoal: event.target.value,
    });
  };

  fetchUjian = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/ujian`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_API_URL}/bank-soal`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.setState({
              body: data,
              listBankSoal: result,
              inputMataPelajaran: "",
              inputDurasi: "",
              inputBankSoal: "",
            });
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id_kelas: 1,
      id_bank_soal: parseInt(this.state.inputBankSoal),
      mata_pelajaran: this.state.inputMataPelajaran,
      status: 1,
      tanggal_tes: "2020-4-4",
      durasi: this.state.inputDurasi,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/ujian`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchUjian();
      })
      .catch((error) => console.log("error", error));
  };

  handleEditButton = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id_kelas: this.state.idKelas,
      id_bank_soal: this.state.inputBankSoal,
      mata_pelajaran: this.state.inputMataPelajaran,
      status: this.state.status,
      tanggal_tes: this.state.tanggalTes,
      durasi: this.state.inputDurasi,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/ujian/${this.state.idUjian}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.fetchUjian();
      })
      .catch((error) => console.log("error", error));
  };

  handleClickDelete = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/ujian/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchUjian();
      })
      .catch((error) => console.log("error", error));
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      inputMataPelajaran: "",
      inputDurasi: "",
      inputBankSoal: "",
    });
  };

  handleClickEdit = (data) => {
    this.setState({
      inputMataPelajaran: data.mata_pelajaran,
      inputDurasi: data.durasi,
      inputBankSoal: data.id_bank_soal,
      showModal: true,
      edit: true,
      idUjian: data.id,
      idKelas: data.id_kelas,
      status: data.status,
      tanggalTes: data.tanggal_tes,
    });
  };

  componentDidMount() {
    this.fetchUjian();
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          className="modal-custom"
          overlayClassName="modal-overlay-custom"
        >
          <h5>Tambah Evaluasi</h5>

          <div>Nama Evaluasi</div>
          <input
            value={this.state.inputMataPelajaran}
            onChange={this.onChangeMataPelajaran}
            type="text"
            className="form-control mb-3"
            placeholder="Nama Evaluasi"
          />

          <div>Durasi (Menit)</div>
          <input
            value={this.state.inputDurasi}
            onChange={this.onChangeDurasi}
            type="number"
            className="form-control mb-3"
            placeholder="Durasi (Menit)"
          />

          <div>Bank Soal</div>
          <select
            className="form-control w-25 mb-4"
            name="bank-soal"
            id="bank-soal"
            value={this.inputBankSoal}
            onChange={this.onChangeBankSoal}
          >
            <option value="-1">Pilih Bank Soal</option>
            {this.state.listBankSoal.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.nama}
                </option>
              );
            })}
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
        <BreadCumbs content="/Evaluasi" />
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
              body={this.state.body}
            ></ReactTable>
          </div>
        </Container>
      </div>
    );
  }
}
