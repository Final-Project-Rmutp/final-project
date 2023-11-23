import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Button,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from '@mui/material';
import UserProfileSidebar from '../../../shared/components/navbar/Navbar';
import './StudentList.scss';

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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <UserProfileSidebar />
      <div className='table-container'>
        <TableContainer className="just-table">
          <Table stickyHeader>
            <TableHead style={{ backgroundColor: 'red', color: 'white' }}>
              <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Actions</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">ID Card</TableCell>
                <TableCell align="center">Student ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={handleDeleteAll}
                  >
                    Delete All
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              {listItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="primary" size="small">
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(item.id)}>
                    Delete
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.idCard}</TableCell>
                  <TableCell align="center">{item.studentId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete the selected item(s)?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={handleDeleteConfirmed} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        </TableContainer>
        <div className='pagination-container'>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default StudentList;