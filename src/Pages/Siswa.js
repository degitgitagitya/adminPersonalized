import React, { Component } from 'react';
import ReactModal from 'react-modal';

import SideBar from '../Components/SideBar';
import BreadCumbs from '../Components/BreadCumbs';
import Container from '../Components/Container';
import ReactTable from '../Components/ReactTable';

import './Siswa.css';

export default class Siswa extends Component {
  state = {
    head: [
      {
        Header: 'Data Siswa',
        columns: [
          {
            Header: 'No',
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: 'Nama Siswa',
            accessor: 'nama',
            sortType: 'basic',
          },
          {
            Header: 'Email',
            accessor: 'email',
            sortType: 'basic',
          },
          {
            Header: 'Gaya Belajar',
            accessor: 'id_gaya_belajar',
            sortType: 'basic',
          },
          {
            Header: 'Password',
            accessor: 'password',
            sortType: 'basic',
          },
          {
            Header: 'Kunci',
            accessor: 'lock',
            sortType: 'basic'
          },
          {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ row }) => (
              <div>
                <button
                  onClick={() => {
                    this.onClickDelete(row.original.id);
                  }}
                  className='action-button-delete'
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    this.handleOpenModalEdit(row.original);
                  }}
                  className='action-button-edit'
                >
                  Edit
                </button>
                <button className='action-button-view'>View</button>
              </div>
            ),
          },
        ],
      },
    ],
    body: [],
    showModal: false,
    edit: false,
    inputNama: '',
    inputEmail: '',
    inputGaya: '',
    inputPassword: '',
    inputKonfirmasi: '',
    inputLock: 0,
    idSiswa: '',
    idKelas: '',
    namaKelas: '',
    jumlahSiswa: '',
  };

  onChangeNama = (event) => {
    this.setState({
      inputNama: event.target.value,
    });
  };

  onChangeEmail = (event) => {
    this.setState({
      inputEmail: event.target.value,
    });
  };

  onChangeGaya = (event) => {
    this.setState({
      inputGaya: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      inputPassword: event.target.value,
    });
  };

  onChangeKonfirmasi = (event) => {
    this.setState({
      inputKonfirmasi: event.target.value,
    });
  };

  onChangeLock = (event) => {
    this.setState({
      inputLock: event.target.checked ? 1 : 0
    })
  }

  onClickDelete = (id) => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/siswa/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchDataSiswaByKelas();
      })
      .catch((error) => console.log('error', error));
  };

  fetchDataSiswaByKelas = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('id_kelas');
    const nama = params.get('nama_kelas');

    fetch(`${process.env.REACT_APP_API_URL}/siswas/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          body: result,
          idKelas: id,
          namaKelas: nama,
          jumlahSiswa: result.length,
        });
      })
      .catch((error) => console.log('error', error));
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: this.state.inputEmail,
      id_gaya_belajar: this.state.inputGaya,
      id_kelas: this.state.idKelas,
      nama: this.state.inputNama,
      password: this.state.inputPassword,
      lock: this.state.inputLock
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/siswa`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchDataSiswaByKelas();
        this.handleCloseModal();
      })
      .catch((error) => console.log('error', error));
  };

  handleEditButton = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: this.state.inputEmail,
      id_gaya_belajar: this.state.inputGaya,
      id_kelas: this.state.idKelas,
      nama: this.state.inputNama,
      password: this.state.inputPassword,
      lock: this.state.inputLock
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/siswa/${this.state.idSiswa}`,
      requestOptions
    )
      .then((response) => {
        this.fetchDataSiswaByKelas();
        this.handleCloseModal();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  handleOpenModalEdit = (data) => {
    this.setState({
      showModal: true,
      edit: true,
      inputNama: data.nama,
      inputEmail: data.email,
      inputGaya: data.id_gaya_belajar,
      inputPassword: data.password,
      inputKonfirmasi: data.password,
      idSiswa: data.id,
      idKelas: data.id_kelas,
      inputLock: data.lock
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      inputNama: '',
      inputEmail: '',
      inputGaya: '',
      inputPassword: '',
      inputKonfirmasi: '',
      inputLock: 0
    });
  };

  componentDidMount() {
    this.fetchDataSiswaByKelas();
  }

  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content='/Siswa' />
        <Container>
          <div className='page-box'>
            <div className='page-button-container'>
              <button
                onClick={this.handleOpenModalAdd}
                className='btn btn-info'
              >
                <span>
                  <i className={`fas fa-plus`}></i>
                </span>
                Tambah
              </button>

              <ReactModal
                isOpen={this.state.showModal}
                className='modal-custom'
                overlayClassName='modal-overlay-custom'
              >
                <h5>Tambah Siswa</h5>

                <label htmlFor='nama'>Nama Siswa</label>
                <input
                  value={this.state.inputNama}
                  onChange={this.onChangeNama}
                  type='text'
                  className='form-control mb-2'
                  id='nama'
                />

                <label htmlFor='email'>Email Siswa</label>
                <input
                  value={this.state.inputEmail}
                  onChange={this.onChangeEmail}
                  type='text'
                  className='form-control mb-2'
                  id='email'
                />

                <label htmlFor='gaya'>Gaya Belajar</label>
                <input
                  value={this.state.inputGaya}
                  onChange={this.onChangeGaya}
                  type='text'
                  className='form-control mb-2'
                  id='gaya'
                />

                <label htmlFor='password'>Password</label>
                <input
                  value={this.state.inputPassword}
                  onChange={this.onChangePassword}
                  type='password'
                  className='form-control mb-2'
                  id='password'
                />

                <label htmlFor='konfirmasi'>Konfirmasi Password</label>
                <input
                  value={this.state.inputKonfirmasi}
                  onChange={this.onChangeKonfirmasi}
                  type='password'
                  className='form-control mb-3'
                  id='konfirmasi'
                />
                {this.state.inputPassword === this.state.inputKonfirmasi ? (
                  ''
                ) : (
                  <p className='text-danger'>
                    Password dan Konfirmasi Password Tidak Sama
                  </p>
                  )}
                
                <div className='form-group'>
                  <input
                    checked={this.state.inputLock === 1 ? true : false}
                    onChange={this.onChangeLock}
                    type='checkbox'
                    className='form-control mb-3'
                    id='kunci-gaya'
                  />
                  <label htmlFor='kunci-gaya'>Kunci Gaya Belajar</label>
                </div>

                {this.state.edit ? (
                  <button
                    className='btn btn-success mr-3'
                    onClick={this.handleEditButton}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className='btn btn-info mr-3'
                    onClick={this.handleAddButton}
                  >
                    Tambah
                  </button>
                )}

                <button
                  className='btn btn-warning'
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </button>
              </ReactModal>
            </div>
            <h3>Kelas {this.state.namaKelas}</h3>
            <h5>{this.state.jumlahSiswa} Siswa</h5>
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
