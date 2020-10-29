import React, { Component } from 'react';
import ReactModal from 'react-modal';

import SideBar from '../Components/SideBar';
import BreadCumbs from '../Components/BreadCumbs';
import Container from '../Components/Container';
import ReactTable from '../Components/ReactTable';

export default class MediaCode extends Component {
  state = {
    head: [
      {
        Header: 'Data Media Code',
        columns: [
          {
            Header: 'No',
            Cell: ({ row }) => <div>{row.index + 1}</div>,
          },
          {
            Header: 'Name',
            accessor: 'name',
            sortType: 'basic',
          },
          {
            Header: 'Short Name',
            accessor: 'short_name',
            sortType: 'basic',
          },
          {
            Header: 'Ordinal',
            accessor: 'ordinal',
            sortType: 'basic',
          },
          {
            Header: 'Label',
            accessor: 'label',
            sortType: 'basic',
          },
          {
            Header: 'Time Limit',
            accessor: 'time_limit',
            sortType: 'basic',
          },
          {
            Header: 'External ID',
            accessor: 'externalid',
            sortType: 'basic',
          },
          {
            Header: 'RGB',
            accessor: 'rgb',
            sortType: 'basic',
          },
          {
            Header: 'Color',
            accessor: 'color',
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
  };

  fetchMediaCode = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_URL}/problem`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          body: result,
        });
      })
      .catch((error) => console.log('error', error));
  };

  componentDidMount() {
    this.fetchMediaCode();
  }

  render() {
    return (
      <div>
        <SideBar />
        <BreadCumbs content='/Media Code' />
        <Container>
          <div className='page-box'>
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
