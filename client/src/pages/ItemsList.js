import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { DeleteButton } from '../components/buttons';
import api from '../api';
import { createTheme , ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';



import MaUTable from '@material-ui/core/Table';
import { CssBaseline, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const ItemImage = styled.img`
  margin: auto;
  max-height: 22em;
  object-fit: contain;
  max-width: 80%;
`;






  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow data-row-item-id={row.values._id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

class ItemsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    console.log('ItemsList: props');
    console.log(this.props);

    this.fetchAllItems();
  }

  fetchAllItems = () => {
    api
      .getAllExams()
      .then(resp => {
        const items = resp.data.exams;
        console.log('getAllExams: resp');
        console.log(items);
        this.setState({ items });
        console.log(this.state);
      })
      .catch(err => {
        console.error(`ERROR in 'getAllItems': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSingleItem = itemId => {
    return api
      .deleteExamById(itemId)
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
    var count = 0;
  
    const columns = [
      {
        Header: 'Patient ID',
        accessor: 'patientID',
        // filterable: true,
        Cell: props => {
          console.log(props);
          console.log(count++);
          const { original } = props.cell.row;
          return <span data-patientID={original.patientID}>{props.value}</span>;
        },
      },
      {
<<<<<<< HEAD
        Header: 'EXAM ID',
        accessor: 'examID',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-examID={original.examID}>{props.value}</span>;
=======
        Header: 'First Name',
        accessor: 'firstName',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.firstName}>{props.value}</span>;
>>>>>>> main
        },
      },

      {
<<<<<<< HEAD
        Header: 'Key Findings',
        accessor: 'keyFindings',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-keyFindings={original.keyFindings}>{props.value}</span>;
=======
        Header: 'Last Name',
        accessor: 'lastName',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.lastName}>{props.value}</span>;
>>>>>>> main
        },
      },
      
  
      {
<<<<<<< HEAD
        Header: 'IMAGES',
        accessor: 'imageFilename',
        Cell: props => {
          const { original } = props.cell.row;
          
          return <span data-imageFilename={original.imageFilename}>
                  {<img
                    src={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${props.value}`}
                    alt="Cannot find picture" width="150" height="150"
                    onClick={() =>{
                      // var source = image.src;
                      var source = `https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${props.value}`
                      window.open(source);
                    }
                    }
                  >
                  </img>
                  }
              </span>;
=======
        Header: 'Brixia Numbers',
        accessor: 'brix',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-timeframe={original.timeframeNote}>{props.value || '-'}</span>;
>>>>>>> main
        },
      },
      
      {
        Header: 'Update',
        accessor: '_update',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <Link data-update-id={original._id} to={`/exam/update?id=${original._id}`}>
              Update
            </Link>
          );
        },
      },
      {
        Header: 'Delete',
        accessor: '_delete',
        Cell: props => {
          const { original } = props.cell.row;
            return (
              <span data-delete-id={original._id}>
                <DeleteButton id={original._id} onDelete={this.handleRemoveItem} />
                  </span>
                );
        },
      },
       
    ];
    const theme = createTheme({
      overrides: {
          MuiTableCell: {
              root: {  
                  padding: '1%',
                  backgroundColor: '#F6F2D4'
                   
              },
          },
      },
  });
    return (
      <Wrapper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {(items || []).length > 0 ? (
          <Table data={items} columns={columns} />
        ) : (
          `No items to render... :(`
        )}
        </ThemeProvider>
      </Wrapper>
    );
  }
}

export default ItemsTable;