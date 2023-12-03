import React, { useState, useEffect } from "react";
import {
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  ThemeProvider,
  Button,
} from "@mui/material";
import styled from "styled-components";
import UserService from "../../../auth/service/UserService";
import useUserState from "../../../auth/model/useUserState";
import { ListItem } from "../../../auth/model/authTypes";
import "./StudentList.scss";
import theme from "../../../styles/theme";

const StyledTable = styled.table`
  overflow: auto;
  min-width: 925px;
  border-radius: 20px;

  tbody {
    overflow: auto;
    width: 100%;
    min-width: 925px;
  }

  th,
  td {
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
  const { user, handleInputChange, resetUser } = useUserState();

  const fetchUserList = async () => {
    try {
      const data = await UserService.getAllUsers();
      setListItems(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserList();
  }, []);
  
  const handleAdd = () => {
    resetUser();
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
    if (editingUser) {
      try {
        const updatedUserData = {
          pin: user.pin,
          citizen_id: user.citizen_id,
          firstname: user.firstname,
          lastname: user.lastname,
        };
  
        const response = await UserService.updateUser(
          editingUser.id,
          updatedUserData
        );
  
        if (response.status === 200) {
          console.log("User updated successfully:", response.data);
          const updatedList = await UserService.getAllUsers();
          setListItems(updatedList);
          setEditingUser(null);
          setEditDialogOpen(false);
        } else {
          console.error("Failed to update user:", response.data);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
      await fetchUserList();
    }
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddConfirmed = async () => {
    try {
      const response = await UserService.addUser(user);
      console.log("API Response:", response);
      const updatedList = await UserService.getAllUsers();
      setListItems(updatedList);
      setAddDialogOpen(false);
      resetUser();
        await fetchUserList();
      
    } catch (error) {
      console.error("Error adding user:", error);
    }
  
    await fetchUserList();
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

  const handleDelete = async (id: string) => {
    await fetchUserList();
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (itemToDelete !== null) {
      try {
        await UserService.deactivateUser(itemToDelete);
        const updatedList = listItems.filter(
          (item) => item.id !== itemToDelete
        );
        setListItems(updatedList);
        setItemToDelete(null);
      } catch (error) {
        console.error("Error deactivating user:", error);
      }
    } else {
      try {
        await Promise.all(
          selectedItems.map(async (id) => {
            await UserService.deactivateUser(id);
          })
        );
        const updatedList = listItems.filter(
          (item) => !selectedItems.includes(item.id)
        );
        setListItems(updatedList);
        setSelectedItems([]);
      } catch (error) {
        console.error("Error deactivating users:", error);
      }
    }
    await fetchUserList();
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <HeadStudentList>
        <TableContainer>
          <StyledTable className="table mb-0">
            <StickyHeader>
              <tr className="text-center">
                <th className="py-2">No</th>
                <th className="py-2">IMG</th>
                <th className="py-2">Actions</th>
                <th className="py-2">Active</th>
                <th className="py-2">FirstName</th>
                <th className="py-2">LastName</th>
                <th className="py-2">ID Card</th>
                <th className="py-2">Student ID</th>
                <th className="py-2">Account Type</th>
              </tr>
              <tr className="text-center">
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAll}
                    defaultChecked
                    color="success"
                  />
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </StickyHeader>
            <tbody>
              {listItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <tr className="text-center" key={item.id}>
                    <td>{index + 1 + page * rowsPerPage}</td>
                    <td>
                      <img
                        src={`https://picsum.photos/50/50?random=${item.id}`}
                        alt={`User ${item.id}`}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>
                      
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                        className="delete"
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      defaultChecked
                      color="success"
                    />
                    </td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.pin}</td>
                    <td>{item.citizen_id}</td>
                    <td>{item.accounttype}</td>
                  </tr>
                ))}
            </tbody>
          </StyledTable>
          <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirm Deactivate</DialogTitle>
            <DialogContent>
              <Typography>
                {selectedItems.length > 1
                  ? "Are you sure you want to deactivate all selected users?"
                  : "Are you sure you want to deactivate the selected user?"}
              </Typography>
            </DialogContent>
            <DialogActions>
              <button onClick={handleCloseDeleteDialog}>Cancel</button>
              <button onClick={handleDeleteConfirmed} color="secondary">
                Delete
              </button>
            </DialogActions>
          </Dialog>
        </TableContainer>
        <div className="pagination-container">
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
        <div className="card-footer">
          <StyledButton
            id="delete"
            color="secondary"
            className="bg-red-500 text-white p-2"
            onClick={handleDeleteAll}
          >
            Delete All
          </StyledButton>
          <StyledButton
            id="add"
            color="primary"
            className="bg-blue-500 text-white p-2"
            onClick={handleAdd}
          >
            Add
          </StyledButton>
        </div>
        <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {editingUser && (
              <>
                <TextField
                  label="PIN"
                  name="pin"
                  value={user.pin}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2, marginTop:2 }}
                  inputProps={{ inputMode: "numeric" }}
                />
                <TextField
                  label="Citizen ID"
                  name="citizen_id"
                  value={user.citizen_id}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="First Name"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                {/* <TextField
                  label="Account Type"
                  name="accounttype"
                  value={user.accounttype}
                  onChange={handleInputChange}
                  select
                  fullWidth
                  sx={{ marginBottom: 2 }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </TextField> */}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <button onClick={handleCloseEditDialog}>Cancel</button>
            <button onClick={handleEditConfirmed} color="primary">
              Save
            </button>
          </DialogActions>
        </Dialog>
        <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              label="PIN"
              name="pin"
              value={user.pin}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2, marginTop:2 }}
              inputProps={{ inputMode: "numeric" }}
            />
            <TextField
              label="Citizen ID"
              name="citizen_id"
              value={user.citizen_id}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              inputProps={{ inputMode: "numeric" }}
            />
            <TextField
              label="First Name"
              name="firstname"
              value={user.firstname}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Last Name"
              name="lastname"
              value={user.lastname}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Account Type"
              name="accounttype"
              value={user.accounttype}
              onChange={handleInputChange}
              select
              fullWidth
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <button onClick={handleCloseAddDialog}>Cancel</button>
            <button onClick={handleAddConfirmed} color="primary">
              Add
            </button>
          </DialogActions>
        </Dialog>
      </HeadStudentList>
      </ThemeProvider>
  );
};

export default StudentList;
