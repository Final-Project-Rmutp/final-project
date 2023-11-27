import React, { useState, useEffect } from 'react';
import {
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import styled from 'styled-components';
import UserService from '../../../auth/service/UserService';

interface ListItem {
  id: string;
  firstname: string;
  lastname: string;
  citizen_id: string;
  accounttype: string;
  accountstatus: string;
  accountrole: string;
}

const StyledTable = styled.table`
  overflow: auto;
  min-width: 925px;
  border-radius: 20px;

  tbody {
    overflow: auto;
    width: 100%;
    min-width: 925px;
  }

  th, td {
    border: 2px solid white;
    padding: 5px;
  }

  th {
    background-color: rgb(87, 90, 87);
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

const StyledButton = styled.button`
  color: white;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

const HeadStudentList = styled.div`
  padding: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  .card-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  min-width: 100%;
  max-width: 925px;
  height: 450px;
  border: 1px solid rgb(41, 42, 41);
  margin-top: 10px;
  padding: 20px;
  overflow-x: auto;
`;

const StickyHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: rgb(0, 0, 0);
  z-index: 1;
`;

const StudentList: React.FC = () => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ListItem | null>(null);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    id: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
    accounttype: '',
  });

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const data = await UserService.getAllUsers();
        setListItems(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserList();
  }, []);


  const handleAdd = () => {
    setAddDialogOpen(true);
  };
  const handleEdit = (user: ListItem) => {
    setEditingUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditingUser(null);
    setEditDialogOpen(false);
  };


  const handleEditConfirmed = async () => {
    try {
      const userData = await UserService.getUserById(editingUser?.id || '');
      console.log('User details:', userData);
      setEditingUser(null);
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };


  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddConfirmed = async () => {
    try {
      await UserService.addUser(newUser);
      // Fetch new data after addition
      const updatedList = await UserService.getAllUsers();
      setListItems(updatedList);
      // Close the Modal
      setAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : listItems.map((item) => item.id));
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (itemToDelete !== null) {
      const updatedList = listItems.filter((item) => item.id !== itemToDelete);
      setListItems(updatedList);
      setItemToDelete(null);
    } else {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name!]: value,
    }));
  };

  return (
    <HeadStudentList>
      <TableContainer>
        <StyledTable className='table mb-0'>
          <StickyHeader>
            <tr className="text-center">
              <th className='py-2'>No</th>
              <th className='py-2'>Actions</th>
              <th className='py-2'>Active</th>
              <th className='py-2'>FirstName</th>
              <th className='py-2'>LastName</th>
              <th className='py-2'>ID Card</th>
              <th className='py-2'>Student ID</th>
            </tr>
            <tr className="text-center">
              <th></th>
              <th></th>
              <th>
                <input type='checkbox' checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </StickyHeader>
          <tbody>
            {listItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <tr className="text-center" key={item.id}>
                <td>{index + 1 + page * rowsPerPage}</td>
                <td>
                  <button color='primary' className='edit' onClick={() => handleEdit(item)}>
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
                  <input
                    type='checkbox'
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.citizen_id}</td>
                <td>{item.accounttype}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete the selected item(s)?</Typography>
          </DialogContent>
          <DialogActions>
            <button onClick={handleCloseDeleteDialog}>Cancel</button>
            <button onClick={handleDeleteConfirmed} color='secondary'>
              Delete
            </button>
          </DialogActions>
        </Dialog>
      </TableContainer>
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
      <div className="card-footer">
        <StyledButton
          id='delete'
          color='secondary'
          className='bg-red-500 text-white p-2'
          onClick={handleDeleteAll}
        >
          Delete All
        </StyledButton>
        <StyledButton
          id='add'
          color='primary'
          className='bg-blue-500 text-white p-2'
          onClick={handleAdd}
        >
          Add
        </StyledButton>
      </div>
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {/* Display user details for editing */}
          {editingUser && (
            <>
              <Typography>ID: {editingUser.id}</Typography>
              <TextField
                label="Citizen ID"
                name="citizen_id"
                value={editingUser.citizen_id}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="First Name"
                name="firstname"
                value={editingUser.firstname}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastname"
                value={editingUser.lastname}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField label="Account Type" name="accounttype" value={editingUser.accounttype} onChange={handleInputChange} select fullWidth>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseEditDialog}>Cancel</button>
          <button onClick={handleEditConfirmed} color='primary'>
            Save
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="ID"
            name="id"
            value={newUser.id}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Citizen ID"
            name="citizen_id"
            value={newUser.citizen_id}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="First Name"
            name="firstname"
            value={newUser.firstname}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastname"
            value={newUser.lastname}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField label="Account Type" name="accounttype" value={newUser.accounttype} onChange={handleInputChange} select fullWidth>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseAddDialog}>Cancel</button>
          <button onClick={handleAddConfirmed} color='primary'>
            Add
          </button>
        </DialogActions>
      </Dialog>
    </HeadStudentList>
  );
};

export default StudentList;
