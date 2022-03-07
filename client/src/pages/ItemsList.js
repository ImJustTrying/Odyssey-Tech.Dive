import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { DeleteButton } from '../components/buttons';
import api from '../api';

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
    this.fetchAllExams();
    // this.fetchAllItems();

  }

  fetchAllExams = () => {
    api.getAllExams().then(resp => {
      // const { items } = resp.data;
      const exams = {};
      console.log('getAllExams: resp');
        //items shows up as undefined in console
        for(var i = 0; i < resp.data.exams.length; i++){
                 exams[i] = resp.data.exams[0];
        }
        console.log(exams);
        // this.setState({ items });
        this.setState({exams});
    }
      ).catch(err => {
        console.error(`Error in 'getAllExams' : ${err}`)
        console.log(err);
      }
      
      );
  }
  // fetchAllItems = () => {
  //   api
  //     .getAllItems()
  //     .then(resp => {
  //       const { items } = resp.data;
  //       console.log('getAllItems: resp');
  //       console.log(items);
  //       this.setState({ items });
  //     })
  //     .catch(err => {
  //       console.error(`ERROR in 'getAllItems': ${err}`);
  //       console.error(err);
  //       return err;
  //     });
  // };

  deleteSingleItem = itemId => {
    return api
      .deleteExamById(itemId)
      .then(resp => {
        console.log('deleteExamById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSingleExam': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleRemoveItem = data => {
    const itemId = data;

    this.deleteSingleItem(itemId).then(resp => {
      console.log('handleRemoveExam: resp');
      console.log(resp);
      this.fetchAllExams();
    });
  };

  render() {
    const items = this.state.items || {};
    console.log(items);
    //get exams
    // const exams = {};
    // api.getAllExams().then(resp => {
    //     //console.log(resp.data.exams);
    //     //after recieving promise, iterate through data.exams
    //     //push values into array
    //     for(var i = 0; i < resp.data.exams.length; i++){
    //       exams[i] = resp.data.exams[0];
    //     }
    // })
    // console.log('Showing exam data');
    //  console.log(exams);

    const columns = [
      {
        Header: 'Patient ID',
        accessor: '_id',
        // filterable: true,
        Cell: props => {
          console.log(props);
          const { original } = props.cell.row;
          return <span data-item-id={original._id}>{props.value}</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'examID',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.examID}>{props.value}</span>;
        },
      },
      // {
      //   Header: 'Day(s)',
      //   accessor: 'daysOfWeek',
      //   // filterable: true,
      //   Cell: props => {
      //     const { daysOfWeek } = props.cell.row.original;
      //     let daysToDisplay = '';
      //     if (daysOfWeek && typeof daysOfWeek === 'object') {
      //       for (const day in daysOfWeek) {
      //         daysToDisplay =
      //           daysToDisplay === '' ? daysOfWeek[day] : `${daysToDisplay}, ${daysOfWeek[day]}`;
      //       }
      //     }
      //     return (
      //       <span
      //         data-daysofweek={daysOfWeek && JSON.stringify(daysOfWeek)}
      //         data-daysofweek-by-id={props.value}>
      //         {daysToDisplay || '-'}
      //       </span>
      //     );
      //   },
      // },
      {
        Header: 'Image',
        accessor: 'imageFilename',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-timeframe={original.imageFilename}>{props.value || '-'}</span>;
        },
      },
      // {
      //   Header: 'Priority',
      //   accessor: 'priority',
      //   // filterable: true,
      //   Cell: props => {
      //     const { original } = props.cell.row;
      //     return <span data-priority={original.priority}>{props.value}</span>;
      //   },
      // },
      {
        Header: 'Update',
        accessor: '_update',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <Link data-update-id={original._id} to={`/exam/update/${original._id}`}>
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

    return (
      <Wrapper>
        <CssBaseline />
        {(items || []).length > 0 ? (
          <Table data={items} columns={columns} />
         ) : (
          `No items to render... :(`
          
        )}  
      </Wrapper>
    );
  }
}

export default ItemsTable;
