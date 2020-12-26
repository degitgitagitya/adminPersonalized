import React, { Component } from 'react';

import { AuthContext } from '../Contexts/Authentication';
import SideBar from '../Components/SideBar';
import BreadCumbs from '../Components/BreadCumbs';
import Container from '../Components/Container';
import ReactTable from '../Components/ReactTable';

import './Aktivitas.css';
import { withRouter } from 'react-router-dom';

class Aktivitas extends Component {
  static contextType = AuthContext;

  state = {
    head: [
      {
        Header: 'Log Aktivitas',
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
            Header: "Akses Gaya Belajar",
            accessor: "gaya",
            sortType: 'basic',
          },
          {
            Header: "Waktu",
            accessor: "waktu"
          },
        ],
      },
    ],
    body: [],
    id_siswa: -1,
    siswa: [],
    activity: []
  };

  fetchDataAktivitas = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

      fetch(
      `${process.env.REACT_APP_API_URL}/log_activity`,
      requestOptions
    )
      .then((response) => response.json())
        .then((result) => {
          this.setState({ activity: result });
        const res = this.populateAktivitas(result);
        this.setState({
          body: res
        });
      })
      .catch((error) => console.log('error', error));
  };

  fetchDataSiswa = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/siswas`, requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          siswa: result
        })
        this.fetchDataAktivitas();
      }).catch((error) => console.log('error', error));
  };

  populateAktivitas = (res) => {
    return res.map((data) => {
      let gayaBelajar = 'Accommodator';
      
      if (data.id_gaya_belajar === 2) {
        gayaBelajar = 'Diverger';
      } else if (data.id_gaya_belajar === 3) {
        gayaBelajar = 'Assimilator';
      } else if (data.id_gaya_belajar === 4) {
        gayaBelajar = 'Converger';
      }
        
      return {
        nama: this.state.siswa.find((el) => el.id === data.id_siswa).nama,
        gaya: gayaBelajar,
        waktu: data.waktu
      }
    });
  };

  handleChangeSiswa = (event) => {
    const target_value = Number(event.target.value);
    this.setState({ id_siswa: target_value });
    let filterActivity = this.state.activity;
    if (target_value !== -1) {
      filterActivity = this.state.activity.filter((data) => data.id_siswa === target_value);
    }

    this.setState({
      body: this.populateAktivitas(filterActivity)
    });
  }

  componentDidMount() {
    this.fetchDataSiswa();
  }

  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content='/Aktivitas' />
        <Container>
          <div className='page-box'>
            <div className='page-button-container'>
              <div className='form-group'>
                <label for='pilih-siswa'>Pilih Siswa</label>
                <select className='custom-select' onChange={this.handleChangeSiswa} id='pilih-siswa'
              defaultValue={this.state.id_siswa}>
                <option value="-1">Tidak ada siswa yang dipilih</option>
                {this.state.siswa.map((data) => {
                  return <option key={data.id} value={data.id}>{ data.nama }</option>
                })}
              </select>
              </div>
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

export default withRouter(Aktivitas);
