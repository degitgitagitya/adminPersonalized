import React, { Component } from 'react';
import ReactModal from 'react-modal';

import { AuthContext } from '../Contexts/Authentication';
import SideBar from '../Components/SideBar';
import BreadCumbs from '../Components/BreadCumbs';
import Container from '../Components/Container';
import ReactTable from '../Components/ReactTable';

import './Kelas.css';
import { withRouter } from 'react-router-dom';

class Kelas extends Component {
  static contextType = AuthContext;

  state = {
    showModal: false,
    edit: false,
    head: [
      {
        Header: 'Data Kelas',
        columns: [
          {
            Header: 'No',
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: 'Nama Kelas',
            accessor: 'nama',
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
                      `/siswa?id_kelas=${row.original.id}&nama_kelas=${row.original.nama}`
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
    inputNama: '',
    idKelas: '',
  };

  onChangeNama = (event) => {
    this.setState({
      inputNama: event.target.value,
    });
  };

  handleClickEdit = (data) => {
    this.setState({
      inputNama: data.nama,
      showModal: true,
      edit: true,
      idKelas: data.id,
    });
  };

  updateKelas = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      id_guru: this.context.data.id,
      nama: this.state.inputNama,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/kelas/${this.state.idKelas}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.fetchDataKelas();
        this.handleCloseModal();
      })
      .catch((error) => console.log('error', error));
  };

  handleClickDelete = (id) => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/kelas/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.fetchDataKelas();
      })
      .catch((error) => console.log('error', error));
  };

  handleAddButton = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      id_guru: this.context.data.id,
      nama: this.state.inputNama,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/kelas`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.handleCloseModal();
        this.fetchDataKelas();
      })
      .catch((error) => console.log('error', error));
  };

  handleOpenModalAdd = () => {
    this.setState({ showModal: true, edit: false });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, inputNama: '' });
  };

  fetchDataKelas = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/kelases/${this.context.data.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          body: result,
        });
      })
      .catch((error) => console.log('error', error));
  };

  componentDidMount() {
    this.fetchDataKelas();
  }

  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content='/Kelas' />
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
                <h5>Tambah Kelas</h5>

                <label htmlFor='nama'>Nama Kelas</label>
                <input
                  value={this.state.inputNama}
                  onChange={this.onChangeNama}
                  type='text'
                  className='form-control mb-3'
                  id='nama'
                />
                {this.state.edit ? (
                  <button
                    className='btn btn-success mr-3'
                    onClick={this.updateKelas}
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

export default withRouter(Kelas);
