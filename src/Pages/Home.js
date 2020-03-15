import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import { AuthContext } from "../Contexts/Authentication";
import SideBar from "../Components/SideBar";
import BreadCumbs from "../Components/BreadCumbs";
import Container from "../Components/Container";
import NavLink from "../Components/NavLink";

import "./Home.css";

const TableKelas = props => {
  const { no, nama } = props;
  return (
    <tr>
      <td>{no}</td>
      <td>{nama}</td>
    </tr>
  );
};

class ModalEnd extends Component {
  state = {
    id: "",
    inputNama: "",
    inputEmail: "",
    inputMataPelajaran: "",
    password: ""
  };

  changeAllState = (id, nama, email, mataPelajaran, password) => {
    this.setState({
      id: id,
      inputNama: nama,
      inputEmail: email,
      inputMataPelajaran: mataPelajaran,
      password: password
    });
  };

  changeNama = event => {
    this.setState({
      inputNama: event.target.value
    });
  };

  changeEmail = event => {
    this.setState({
      inputEmail: event.target.value
    });
  };

  changeMataPelajaran = event => {
    this.setState({
      inputMataPelajaran: event.target.value
    });
  };

  handleClickEdit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: this.state.inputEmail,
      mata_pelajaran: this.state.inputMataPelajaran,
      password: this.state.password,
      nama: this.state.inputNama
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`http://127.0.0.1:5000/guru/${this.state.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        this.props.onHide();
      })
      .catch(error => console.log("error", error));
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-secondary">
          <Modal.Title
            className="text-light"
            id="contained-modal-title-vcenter"
          >
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            className="form-control mb-2"
            value={this.state.inputNama}
            onChange={this.changeNama}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control mb-2"
            value={this.state.inputEmail}
            onChange={this.changeEmail}
          />

          <label htmlFor="mata-pelajaran">Mata Pelajaran</label>
          <input
            type="text"
            id="mata-pelajaran"
            className="form-control"
            value={this.state.inputMataPelajaran}
            onChange={this.changeMataPelajaran}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={this.handleClickEdit}
            className="btn btn-warning text-white"
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.onHide();
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default class Home extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.modalElement = React.createRef();
  }

  state = {
    daftarKelas: [],
    modalShow: false,
    setModalShow: false,
    nama: "",
    email: "",
    pelajaran: ""
  };

  handleClickChangeChild = () => {
    this.modalElement.current.changeAllState(
      this.context.data.id,
      this.state.nama,
      this.state.email,
      this.state.pelajaran,
      this.context.data.password
    );
  };

  setModalShow = x => {
    this.setState({
      modalShow: x
    });
    if (x === false) {
      this.fetchGuru();
    }
  };

  fetchGuru = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`http://127.0.0.1:5000/guru/${this.context.data.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          nama: result.nama,
          email: result.email,
          pelajaran: result.mata_pelajaran
        });
      })
      .catch(error => console.log("error", error));
  };

  fetchDaftarKelas = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(
      `http://127.0.0.1:5000/kelases/${this.context.data.id}`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        this.setState({
          daftarKelas: result,
          nama: this.context.data.nama,
          email: this.context.data.email,
          pelajaran: this.context.data.mata_pelajaran
        });
      })
      .catch(error => console.log("error", error));
  };

  componentDidMount() {
    this.fetchDaftarKelas();
  }

  render() {
    const { nama, email, pelajaran } = this.state;
    return (
      <div>
        <SideBar />
        <BreadCumbs content="/Beranda" />
        <Container>
          <div className="page-box">
            <div className="row">
              <div className="col-5">
                <h3 className="home-nama text-center">{nama}</h3>
                <hr />
                <div className="row justify-content-center">
                  <div className="col-6">
                    <img
                      src="https://ppmschool.ac.id/id/wp-content/uploads/2016/01/tutor-8.jpg"
                      alt="profile"
                      className="img-fluid home-image"
                    />
                  </div>
                </div>

                <hr />
                <div className="text-center">
                  <div className="home-detail">Email : {email}</div>
                  <div className="home-detail">
                    Mata Pelajaran : {pelajaran}
                  </div>
                </div>
                <hr />
                <button
                  onClick={() => {
                    this.setModalShow(true);
                    this.handleClickChangeChild();
                  }}
                  className="btn btn-outline-warning form-control"
                >
                  Edit
                </button>
                <ModalEnd
                  ref={this.modalElement}
                  show={this.state.modalShow}
                  onHide={() => this.setModalShow(false)}
                />
              </div>
              <div className="col-7">
                <h3 className="text-center home-nama">Daftar Kelas</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>Nama Kelas</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.daftarKelas.map((data, index) => {
                      return (
                        <TableKelas
                          key={data.id}
                          no={index + 1}
                          nama={data.nama}
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
