import React, { useState } from 'react';
import {

    TableContainer,
    // Checkbox,
    // Button,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Paper,
} from '@mui/material';
import './StudentList.scss';
import '../../../scss/custom.scss'
interface ListItem {
  id: number;
  name: string;
  idCard: string;
  studentId: string;
}

const StudentList: React.FC = () => {
  const [listItems, setListItems] = useState<ListItem[]>([
    { id: 1, name: 'จตุโชค ชูมา1', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 2, name: 'จตุโชค ชูมา2', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 3, name: 'จตุโชค ชูมา3', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 4, name: 'จตุโชค ชูมา4', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 5, name: 'จตุโชค ชูมา5', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 6, name: 'จตุโชค ชูมา6', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 7, name: 'จตุโชค ชูมา7', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 8, name: 'จตุโชค ชูมา8', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 9, name: 'จตุโชค ชูมา9', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 10, name: 'จตุโชค ชูมา10', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 11, name: 'จตุโชค ชูมา11', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 12, name: 'จตุโชค ชูมา12', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 13, name: 'จตุโชค ชูมา13', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 14, name: 'จตุโชค ชูมา14', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 15, name: 'จตุโชค ชูมา15', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 16, name: 'จตุโชค ชูมา16', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 17, name: 'จตุโชค ชูมา17', idCard: '1102154345848', studentId: '056350201011-1' },
    { id: 18, name: 'จตุโชค ชูมา18', idCard: '1102154345848', studentId: '056350201011-1' },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : listItems.map((item) => item.id));
  };

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (itemToDelete !== null) {
      // Individual item deletion
      const updatedList = listItems.filter((item) => item.id !== itemToDelete);
      setListItems(updatedList);
      setItemToDelete(null);
    } else {
      // Delete all items
      const updatedList = listItems.filter((item) => !selectedItems.includes(item.id));
      setListItems(updatedList);
      setSelectedItems([]);
    }
  
    setDeleteDialogOpen(false);
  };

  const handleDeleteAll = () => {
    setDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="container-list">
        <div className='table-container'>
          <Paper className='w-full'>
            <TableContainer >
              <table className='table table-auto w-full text-center lg:table-fixed'>
                <thead className='bg-red-500 text-white'>
                  <tr>
                    <th className='py-2'>No</th>
                    <th className='py-2'>Actions</th>
                    <th className='py-2'>Active</th>
                    <th className='py-2'>Name</th>
                    <th className='py-2'>ID Card</th>
                    <th className='py-2'>Student ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <input type='checkbox' checked={selectAll} onChange={handleSelectAll} />
                    </td>
                    <td></td>
                  </tr>
                </tbody>
                <tbody>
                  {listItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1 + page * rowsPerPage}</td>
                      <td>
                        <button  color='primary'  className='edit'>
                          Edit
                        </button>
                        <button
                          color='secondary'
                          onClick={() => handleDelete(item.id)}
                          className='delete'
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <input type='checkbox' checked={selectedItems.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.idCard}</td>
                      <td>{item.studentId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <Typography>Are you sure you want to delete the selected item(s)?</Typography>
                </DialogContent>
                <DialogActions>
                  <button onClick={handleCloseDeleteDialog}>Cancel</button>
                  <button onClick={handleDeleteConfirmed} color='secondary' 
                  >
                    Delete
                  </button>
                </DialogActions>
              </Dialog>
            </TableContainer>
          </Paper>
          <div className='pagination-container'>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={listItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
        <div className="container-btn">
        <button
          id='delete'
          color='secondary'
          className='bg-red-500 text-white p-2'
          onClick={handleDeleteAll}
        >
          Delete All
        </button>
        </div>
      </div>
    </>
  );
};
export default StudentList;