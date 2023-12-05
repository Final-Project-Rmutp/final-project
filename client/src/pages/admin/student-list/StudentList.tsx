import React from "react";
import {
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
  // Checkbox,
  ThemeProvider,
  // Button,
} from "@mui/material";
// import UserService from "../../../auth/service/UserService";
// import useUserState from "../../../auth/model/useUserState";
// import { ListItem, UserData } from "../../../auth/model/authTypes";
import theme from "../../../styles/theme";
import { 
  Checkbox, Button, Sheet, Table } from '@mui/joy';

import {
  // StyledTable,
  Tbody,
  Theader,
  // StyledButton,
  HeadStudentList,
  TableContainer,
  // StickyHeader
} from "./StudentListStyled";
import useStudentList from "./useStudentList";

const StudentList: React.FC = () => {
  const {
    listItems,
    selectAll,
    selectedItems,
    page,
    rowsPerPage,
    deleteDialogOpen,
    editDialogOpen,
    addDialogOpen,
    user,
    editingUser,
    handleInputChange,
    handleInputEditChange,
    handleAdd,
    handleEdit,
    handleCloseEditDialog,
    handleEditConfirmed,
    handleCloseAddDialog,
    handleAddConfirmed,
    handleSelectAll,
    handleCheckboxChange,
    handleDelete,
    handleDeleteConfirmed,
    handleDeleteAll,
    handleCloseDeleteDialog,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useStudentList();

  return (
    <ThemeProvider theme={theme}>
          <HeadStudentList>
            <TableContainer>
              <Sheet sx={{
                    '--TableCell-height': '40px',
                    // the number is the amount of the header rows.
                    '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                    minWidth:800,
                    height: 376,
                    overflow: 'auto',
                    background: (
                      theme,
                    ) => `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                      linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                      radial-gradient(
                        farthest-side at 50% 0,
                        rgba(0, 0, 0, 0.12),
                        rgba(0, 0, 0, 0)
                      ),
                      radial-gradient(
                          farthest-side at 50% 100%,
                          rgba(0, 0, 0, 0.12),
                          rgba(0, 0, 0, 0)
                        )
                        0 100%`,
                    backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'local, local, scroll, scroll',
                    backgroundPosition:
                      '0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%',
                    backgroundColor: 'background.surface',
                  }}>
                  <Table className="table mb-0" stickyHeader>
                      <colgroup>
                        <col style={{ minWidth: '43px' }}/>
                        <col style={{ minWidth: '80px' }}/>
                        <col style={{ minWidth: '176px' }}/>
                        <col style={{ minWidth: '62px' }}/>
                        <col style={{ minWidth: '176px' }}/>
                        <col style={{ minWidth: '176px' }}/>
                        <col style={{ minWidth: '220px' }}/>
                        <col style={{ minWidth: '220px' }}/>
                        <col style={{ minWidth: '146px' }}/>
                      </colgroup>
                    <Theader >
                      <tr >
                        <th className="py-2 ">No</th>
                        <th className="py-2 ">IMG</th>
                        <th className="py-2 ">Actions</th>
                        <th className="py-2 ">Active</th>
                        <th className="py-2 ">FirstName</th>
                        <th className="py-2 ">LastName</th>
                        <th className="py-2 ">ID Card</th>
                        <th className="py-2 ">Student ID</th>
                        <th className="py-2 ">Account Type</th>
                      </tr>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                          <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAll}
                            color="primary"
                          />
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </Theader>
                    <Tbody>
                      {listItems
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => (
                          <tr className="text-center" key={item.id}>
                            <td>{index + 1 + page * rowsPerPage}</td>
                            <td>
                              <img
                                src={`https://picsum.photos/60/60?random=${item.id}`}
                                alt={`User ${item.id}`}
                                width="50"
                                height="50"
                              />
                            </td>
                            <td >
                              <div className="d-flex gap-1 justify-center">
                                <Button
                                  variant="outlined"
                                  color="warning"
                                  className="edit"
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="danger"
                                  variant="outlined"
                                  onClick={() => handleDelete(item.id)}
                                  className="delete"
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                            <td>
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                              color="primary"
                            />
                            </td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.pin}</td>
                            <td>{item.citizen_id}</td>
                            <td>{item.accounttype}</td>
                          </tr>
                        ))}
                    </Tbody>
                  </Table>
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
                      <Button 
                        color="neutral"
                        variant="soft"
                        onClick={handleCloseDeleteDialog}>Cancel</Button >
                      <Button 
                        color="danger"
                        variant="soft"
                        onClick={handleDeleteConfirmed} >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
              </Sheet>
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
            </TableContainer>
            <div className="card-footer">
              <div className="this-btn d-flex justify-center align-center gap-2">
                <Button
                  sx={{width:'150px',padding:'15px !important'}}
                  id="delete"
                  color="danger"
                  variant="soft"
                  className="text-red p-2"
                  onClick={handleDeleteAll}
                >
                Delete All
                </Button>
                <Button
                  sx={{width:'150px',padding:'15px !important'}}
                  id="add"
                  color="primary"
                  variant="soft"
                  className="text-primary p-2"
                  onClick={handleAdd}
                >
                  Add
                </Button>
                </div>
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
                        sx={{ marginBottom: 2, marginTop: 2 }}
                      />
                    <TextField
                      label="Citizen ID"
                      name="citizen_id"
                      value={editingUser.citizen_id}
                      onChange={handleInputEditChange}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      label="First Name"
                      name="firstname"
                      value={editingUser.firstname}
                      onChange={handleInputEditChange}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      label="Last Name"
                      name="lastname"
                      value={editingUser.lastname}
                      onChange={handleInputEditChange}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
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
                <Button onClick={handleCloseAddDialog}>Cancel</Button>
                <Button onClick={handleAddConfirmed} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </HeadStudentList>
    </ThemeProvider>
  );
};

export default StudentList;
