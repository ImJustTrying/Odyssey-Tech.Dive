import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import styled from 'styled-components';

import 'react-table-6/react-table.css';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    console.log('ItemsList: props');
    console.log(this.props);
    // if (((this.props.itemData || {}).items || []).length) return;

    this.fetchAllItems();
  }

  fetchAllItems = () => {
    api
      .getAllPatients()
      .then(resp => {
        debugger;
        const items = resp.data.patients;
        console.log('getAllPatients: resp');
        console.log(items);
        this.setState({ items });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllItems': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSingleItem = itemId => {
    return api
      .deletePatientById(itemId)
      .then(resp => {
        console.log('deleteItemById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleRemoveItem = data => {
    const itemId = data;

    this.deleteSingleItem(itemId).then(resp => {
      console.log('handleRemoveItem: resp');
      console.log(resp);
      this.fetchAllItems();
    });
  };

  render() {
    const items = this.state.items || {};
    console.log(items);
    // api.getAllPatients().then(
    //   resp => {
    //     console.log(resp.data.patients);
    //   }
    // )

    const columns = [
      {
        Header: 'Patient ID',
        accessor: 'patientID',
        filterable: true,
        Cell: props => {
          // return <span data-item-id={props.original._id}>{props.original._id}</span>;
          return (
            <Link data-item-id={props.original.patientID} to={`/about`}>
              {props.original.patientID}
            </Link>

          );
        },
      },
      {
        Header: 'Age',
        accessor: 'age',
        filterable: true,
        Cell: props => {
          return <span data-age={props.original.age}>{props.original.age}</span>;
        },
      },

      {
        Header: 'Sex',
        accessor: 'sex',
        filterable: true,
        Cell: props => {
          return <span data-sex={props.original.sex}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Race',
        accessor: 'race',
        filterable: true,
        Cell: props => {
          return <span data-race={props.original.race}>{props.value}</span>;
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <Link data-update-id={props.original._id} to={`/patient/update/${props.original._id}`}>
              Update Item
            </Link>
          );
        },
      },
      {
        Header: '',
        accessor: '_delete',
        Cell: props => {
          return (
            <span data-delete-id={props.original._id}>
              <DeleteButton id={props.original._id} onDelete={this.handleRemoveItem} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        {(items || []).length > 0 ? ( // defeats the purpose of using `isLoading` prop?
          <ReactTable
            data={items}
            columns={columns}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={10}
          />
        ) : (
          `No items to render... :(`
        )}
      </Wrapper>
    );
  }
}

export default ItemsList;
