import React, { Component } from 'react';
import ReactModal from 'react-modal';

import SideBar from '../Components/SideBar';
import BreadCumbs from '../Components/BreadCumbs';
import Container from '../Components/Container';
import ReactTable from '../Components/ReactTable';

export default class Soal extends Component {
  state = {
    head: [
      {
        Header: 'Data Soal',
        columns: [
          {
            Header: 'No',
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: 'Pertanyaan',
            accessor: 'pertanyaan',
            sortType: 'basic',
          },
          {
            Header: 'Image URL',
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
                <button
                  onClick={() => {
                    this.props.history.push(
                      `/pilihansoal?x=${row.original.id}&y=${row.original.pertanyaan}`
                    );
                  }}
                  className='action-button-view'
                >
                  View
                </button>
              </div>
            ),
          },
        ],
      },
    ],
    body: [],
    inputPertanyaan: '',
    idPertanyaan: '',
    idBankSoal: '',
    inputUrl: '',
  };

  onChangePertanyaan = (event) => {
    this.setState({
      inputPertanyaan: event.target.value,
    });
  };

  onChangeUrl = (event) => {
    this.setState({
      inputUrl: event.target.value,
    });
  };

  fetchSoal = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('x');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/soal/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          idBankSoal: id,
          inputPertanyaan: '',
          inputUrl: '',
          body: result,
        });
      })
      .catch((error) => console.log('error', error));
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      id_bank_soal: this.state.idBankSoal,
      pertanyaan: this.state.inputPertanyaan,
      url: this.state.inputUrl,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/soal`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchSoal();
      })
      .catch((error) => console.log('error', error));
  };

  handleEditButton = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      id_bank_soal: this.state.idBankSoal,
      pertanyaan: this.state.inputPertanyaan,
      url: this.state.inputUrl,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/soal/${this.state.idPertanyaan}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.fetchSoal();
      })
      .catch((error) => console.log('error', error));
  };

  handleClickDelete = (id) => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/soal/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchSoal();
      })
      .catch((error) => console.log('error', error));
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, inputPertanyaan: '' });
  };

  handleClickEdit = (data) => {
    this.setState({
      inputPertanyaan: data.pertanyaan,
      inputUrl: data.url,
      showModal: true,
      edit: true,
      idPertanyaan: data.id,
    });
  };

  componentDidMount() {
    this.fetchSoal();
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          className='modal-custom'
          overlayClassName='modal-overlay-custom'
        >
          <h5>Tambah Pertanyaan</h5>

          <div>Pertanyaan</div>
          <input
            value={this.state.inputPertanyaan}
            onChange={this.onChangePertanyaan}
            type='text'
            className='form-control mb-3'
            placeholder='Pertanyaan'
          />
          <div>Pertanyaan</div>
          <input
            value={this.state.inputUrl}
            onChange={this.onChangeUrl}
            type='text'
            className='form-control mb-3'
            placeholder='Kosongkan Apabila Tidak Ada Gambar'
          />
          {this.state.edit ? (
            <button
              className='btn btn-success mr-3'
              onClick={() => {
                this.handleEditButton();
                this.handleCloseModal();
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className='btn btn-info mr-3'
              onClick={() => {
                this.handleAddButton();
                this.handleCloseModal();
              }}
            >
              Tambah
            </button>
          )}
          <button className='btn btn-warning' onClick={this.handleCloseModal}>
            Cancel
          </button>
        </ReactModal>
        <SideBar />
        <BreadCumbs content='/Soal' />
        <Container>
          <div className='page-box'>
            <div className='d-flex mb-3'>
              <button
                onClick={this.handleOpenModalAdd}
                className='btn btn-info'
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
