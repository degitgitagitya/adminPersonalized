import React, { Component } from 'react';
import ReactModal from 'react-modal';

import SideBar from '../Components/SideBar';
import BreadCumbs from '../Components/BreadCumbs';
import Container from '../Components/Container';
import ReactTable from '../Components/ReactTable';

import './SubMateri.css';

export default class SubMateri extends Component {
  state = {
    head: [
      {
        Header: 'Data Kuesioner',
        columns: [
          {
            Header: 'No',
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: 'Nama',
            accessor: 'nama',
            sortType: 'basic',
          },
          {
            Header: 'Gaya Belajar',
            accessor: 'id_gaya_belajar',
            sortType: 'basic',
          },
          {
            Header: 'Keterangan',
            accessor: 'keterangan',
            sortType: 'basic',
          },
          {
            Header: 'Url',
            accessor: 'url',
            sortType: 'basic',
          },
          {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ row }) => (
              <div>
                <button
                  onClick={() => {
                    this.handleClickDelete(row.original.id);
                  }}
                  className='action-button-delete'
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    this.handleClickEdit(row.original);
                  }}
                  className='action-button-edit'
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
    showModal: false,
    edit: false,
    idMateri: '',
    idSubMateri: '',
    judulMateri: '',
    idGaya: '',
    inputNama: '',
    inputGaya: '',
    inputKeterangan: '',
    inputUrl: '',
  };

  onChangeNama = (event) => {
    this.setState({
      inputNama: event.target.value,
    });
  };

  onChangeGaya = (event) => {
    this.setState({
      inputGaya: event.target.value,
    });
  };

  onChangeKeterangan = (event) => {
    this.setState({
      inputKeterangan: event.target.value,
    });
  };

  onChangeUrl = (event) => {
    this.setState({
      inputUrl: event.target.value,
    });
  };

  onChangeFilterGaya = (event) => {
    this.setState({
      idGaya: event.target.value,
    });
  };

  fetchDataSubMateri = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const idMateri = params.get('id_materi');
    const judul = params.get('judul');

    let url = `${process.env.REACT_APP_API_URL}/submateri/${idMateri}`;

    if (this.state.idGaya !== '') {
      url = `${process.env.REACT_APP_API_URL}/submateri/${idMateri}/${this.state.idGaya}`;
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          idMateri: idMateri,
          judulMateri: judul,
          body: result,
        });
      })
      .catch((error) => console.log('error', error));
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      id_gaya_belajar: this.state.inputGaya,
      id_materi: this.state.idMateri,
      nama: this.state.inputNama,
      keterangan: this.state.inputKeterangan,
      url: this.state.inputUrl,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/submateri`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchDataSubMateri();
        this.handleCloseModal();
      })
      .catch((error) => console.log('error', error));
  };

  handleClickDelete = (id) => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/submateri/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchDataSubMateri();
      })
      .catch((error) => console.log('error', error));
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  updateSubMateri = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      id_gaya_belajar: this.state.inputGaya,
      id_materi: this.state.idMateri,
      keterangan: this.state.inputKeterangan,
      nama: this.state.inputNama,
      url: this.state.inputUrl,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/submateri/${this.state.idSubMateri}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.fetchDataSubMateri();
        this.handleCloseModal();
      })
      .catch((error) => console.log('error', error));
  };

  handleClickEdit = (data) => {
    this.setState({
      showModal: true,
      edit: true,
      idSubMateri: data.id,
      inputNama: data.nama,
      inputGaya: data.id_gaya_belajar,
      inputKeterangan: data.keterangan,
      inputUrl: data.url,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      inputNama: '',
      inputGaya: '',
      inputKeterangan: '',
      inputUrl: '',
    });
  };

  componentDidMount() {
    this.fetchDataSubMateri();
  }

  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content='/Materi/Sub Materi' />
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
                <h5>Tambah Sub Materi</h5>

                <label htmlFor='nama'>Nama Sub Materi</label>
                <input
                  value={this.state.inputNama}
                  onChange={this.onChangeNama}
                  type='text'
                  className='form-control mb-3'
                  id='nama'
                />

                <label htmlFor='gaya'>Gaya Belajar</label>
                <select
                  onChange={this.onChangeGaya}
                  value={this.inputGaya}
                  name='gaya'
                  className='form-control mb-3'
                  id='gaya'
                >
                  <option value='1'>Accommodator</option>
                  <option value='2'>Diverger</option>
                  <option value='3'>Assimilator</option>
                  <option value='4'>Converger</option>
                </select>

                <label htmlFor='keterangan'>Keterangan</label>
                <input
                  value={this.state.inputKeterangan}
                  onChange={this.onChangeKeterangan}
                  type='text'
                  className='form-control mb-3'
                  id='keterangan'
                />

                <label htmlFor='url'>Url Video Materi</label>
                <input
                  value={this.state.inputUrl}
                  onChange={this.onChangeUrl}
                  type='text'
                  className='form-control mb-3'
                  id='url'
                />

                {this.state.edit ? (
                  <button
                    className='btn btn-success mr-3'
                    onClick={this.updateSubMateri}
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
            <div className='row'>
              <div className='col-md-3'>
                <label htmlFor='gaya'>Lihat Berdasarkan Gaya Belajar</label>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-3'>
                <select
                  onChange={this.onChangeFilterGaya}
                  value={this.idGaya}
                  name='gaya'
                  className='form-control mb-3'
                  id='gaya'
                >
                  <option value=''>Lihat Semua</option>
                  <option value='1'>Accommodator</option>
                  <option value='2'>Diverger</option>
                  <option value='3'>Assimilator</option>
                  <option value='4'>Converger</option>
                </select>
              </div>
              <div className='col-md-3'>
                <button
                  className='btn btn-success'
                  onClick={this.fetchDataSubMateri}
                >
                  Pilih
                </button>
              </div>
            </div>
            <h3>Materi {this.state.judulMateri}</h3>
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
