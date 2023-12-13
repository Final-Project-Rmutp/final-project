import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Typography,
  TextField,
  MenuItem,
  // Checkbox,
  // Button,
} from "@mui/material";
// import UserService from "../../../auth/service/UserService";
// import useUserState from "../../../auth/model/useUserState";
// import { ListItem, UserData } from "../../../auth/model/authTypes";
import { Checkbox, Button, Sheet, Table, ModalDialog, Modal, Divider, FormControl, FormLabel, Stack, Input } from '@mui/joy';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
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
import theme from "../../../styles/theme";
import { ThemeProvider } from '@mui/system';
import CustomPagination from "./Pagination";
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
    // user,
    AddUser,
    editingUser,
    handleInputChange,
    handleImageChange,
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
                  <Table className="table mb-0" stickyHeader 
                  >
                      {/* <colgroup>
                        <col style={{ minWidth: '43px' }}/>
                        <col style={{ minWidth: '80px' }}/>
                        <col style={{ minWidth: '206px' }}/>
                        <col style={{ minWidth: '62px' }}/>
                        <col style={{ minWidth: '176px' }}/>
                        <col style={{ minWidth: '176px' }}/>
                        <col style={{ minWidth: '220px' }}/>
                        <col style={{ minWidth: '220px' }}/>
                        <col style={{ minWidth: '146px' }}/>
                      </colgroup> */}
                    <Theader >
                      <tr >
                        <th>No</th>
                        <th>IMG</th>
                        <th>Actions</th>
                        <th>Active</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>ID Card</th>
                        <th>Student ID</th>
                        <th>Account Type</th>
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
                        .map((item, index) => (
                          <tr key={item.id}>
                            <th>{(page - 1) * rowsPerPage + index + 1}</th>
                            <th>
                              <img
                                // src={`https://picsum.photos/60/60?random=${item.id}`}
                                // alt={`User ${item.id}`}
                                // width="50"
                                // height="50"
                                src={item.user_img_path ?? ''}
                              />
                            </th>
                            <th >
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
                                  endDecorator={<DeleteForever />}
                                  onClick={() => handleDelete(item.id)}
                                  className="delete"
                                >
                                  Delete
                                </Button>
                              </div>
                            </th>
                            <th>
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                              color="primary"
                            />
                            </th>
                            <th>{item.firstname}</th>
                            <th>{item.lastname}</th>
                            <th>{item.pin}</th>
                            <th>{item.citizen_id}</th>
                            <th>{item.account_type}</th>
                          </tr>
                        ))}
                    </Tbody>
                  </Table>
                  <Modal open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                    <ModalDialog variant="outlined" role="alertdialog">
                      <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                      </DialogTitle>
                      <Divider />
                      <DialogContent>
                        {selectedItems.length > 1
                          ? "Are you sure you want to deactivate all selected users?"
                          : "Are you sure you want to deactivate the selected user?"}
                      </DialogContent>
                      <DialogActions>
                        <Button variant="plain" color="neutral" onClick={handleCloseDeleteDialog}>
                          Cancel
                        </Button>
                        <Button variant="solid"  color="danger" onClick={handleDeleteConfirmed}>
                          Confirm Delete
                        </Button>
                      </DialogActions>
                    </ModalDialog>
                  </Modal>
              </Sheet>
                <div className="pagination-container">
                  {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={listItems.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_event, newPage) => handleChangePage(newPage + 1)}
                    onRowsPerPageChange={(event) => handleChangeRowsPerPage(+event.target.value)}
                  /> */}
                  <CustomPagination
                    count={100}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </div>
            </TableContainer>
            <div className="card-footer">
              <div className="this-btn d-flex justify-center align-center gap-2">
                <Button
                  sx={{width:'150px',padding:'15px !important',":hover": {
                    boxShadow: '0 1px 20px 1px #A04C4C',
                    border: '1px solid #A04C4C'
                  }}}
                  id="delete"
                  color="danger"
                  variant="soft"
                  className="text-red p-2"
                  onClick={handleDeleteAll}
                >
                Delete All
                </Button>
                <Button
                  sx={{width:'150px',padding:'15px !important',":hover": {
                    boxShadow: '0 1px 20px 1px #0D6EFD',
                    border: '1px solid #0D6EFD'
                  }}}

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
            <Modal open={editDialogOpen} onClose={handleCloseEditDialog}>
              <ModalDialog
                size="lg"
                variant="outlined"
                layout="center"
                color="primary"
                sx={{width:450}}>  
                <DialogTitle>Edit User</DialogTitle>
                <form
                  onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                  }}
                >
                  <Stack spacing={3}>
                  {editingUser && (
                    <>
                    <FormControl>
                      <FormLabel>ID Card</FormLabel>
                      <Input autoFocus required 
                        name="pin"
                        value={editingUser.pin}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Student ID</FormLabel>
                      <Input required 
                        name="citizen_id"
                        value={editingUser.citizen_id}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>FirstName</FormLabel>
                      <Input required 
                        name="firstname"
                        value={editingUser.firstname}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>LastName</FormLabel>
                      <Input required 
                        name="lastname"
                        value={editingUser.lastname}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    </>
                    )}
                    <DialogActions>
                      <Button type="cancel" onClick={handleCloseEditDialog}>Cancel</Button>
                      <Button type="submit" onClick={handleEditConfirmed}>Confirm</Button>
                    </DialogActions>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
            <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
              <DialogTitle>Add New User</DialogTitle>
              <DialogContent>
                <TextField
                  label="PIN"
                  name="pin"
                  value={AddUser.pin}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2, marginTop:2 }}
                  inputProps={{ inputMode: "numeric" }}
                />
                <TextField
                  label="Citizen ID"
                  name="citizen_id"
                  value={AddUser.citizen_id}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  inputProps={{ inputMode: "numeric" }}
                />
                <TextField
                  label="First Name"
                  name="firstname"
                  value={AddUser.firstname}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  value={AddUser.lastname}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Account Type"
                  name="account_type"
                  value={AddUser.account_type}
                  onChange={handleInputChange}
                  select
                  fullWidth
                >
                  <MenuItem value="student" className="text-dark">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </TextField>
                <TextField
                  type="file"
                  label="User Image"
                  name="image"
                  value={AddUser.user_img_path}
                  onChange={handleImageChange}
                  fullWidth
                  sx={{ marginBottom: 2, marginTop: 2 }}
                />
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
