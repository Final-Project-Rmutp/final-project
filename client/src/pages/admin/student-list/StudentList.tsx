import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { Checkbox, Button, Sheet, Table, ModalDialog, Modal, Divider, FormControl, FormLabel, Stack, Input, Avatar, Box } from '@mui/joy';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  Tbody,
  Theader,
  HeadStudentList,
  TableContainer,
} from "./StudentListStyled";
import useStudentList from "./useStudentList";
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
    searchTerm,
    setSearchTerm,
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
          <HeadStudentList>
            <TableContainer >
              <Sheet 
              sx={{
                '--TableCell-height': '40px',
                '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                '--Table-firstColumnWidth': '80px',
                '--Table-lastColumnWidth': '144px',
                '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                    minWidth:600,
                    height: 400,
                    overflow: 'auto',
                    background: (
                      theme,
                    ) => `linear-gradient(${theme.vars.palette.background.surface} ,
                      0 100%`,
                      backgroundSize:
                      '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'local, local, scroll, scroll',
                    backgroundPosition:
                      'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                    backgroundColor: 'nav.bg',
                  }}>
                  <Table className="table mb-0" 
                  borderAxis="bothBetween"
                  stickyHeader 
                  hoverRow
                  sx={{
                    "--Table-headerUnderlineThickness": "1px",
                    "--TableCell-paddingX": "10px",
                    "--TableCell-paddingY": "7px",
                    '& tr > *:first-of-type': {
                      position: 'sticky',
                      zIndex:1,
                      left: 0,
                      boxShadow: '1px 0 var(--TableCell-borderColor)',
                      // bgcolor: 'background.surface',
                    },
                    '& tr > *:last-child': {
                      position: 'sticky',
                      right: 0,
                      bgcolor: 'var(--TableCell-headBackground)',
                    },
                  }}
                  >
                    <Theader >
                      <tr >
                        <th style={{ width: 50 }}>No</th>
                        <th style={{ width: 80}}>IMG</th>
                        <th style={{ width: 200 }}>FirstName</th>
                        <th style={{ width: 200 }}>LastName</th>
                        <th style={{ width: 200 }}>ID Card</th>
                        <th style={{ width: 200 }}>Student ID</th>
                        <th style={{ width: 200 }}>Account Type</th>
                        <th style={{ width: 100 }}>Actions</th>
                        <th style={{ width: 200 }}>Active</th>
                      </tr>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                        <Input
                            disabled={false}
                            size="md"
                            placeholder="Find data here..."
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </th>
                        <th>
                        </th>
                        <th></th>
                        <th>
                        <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAll}
                            color="primary"
                          />
                        </th>
                        <th></th>
                      </tr>
                    </Theader>
                    <Tbody>
                      {listItems.map((item, index) => (
                          <tr key={item.id}>
                            <th >{(page - 1) * rowsPerPage + index + 1}</th>
                            <th >
                              {/* <img
                                src={`https://picsum.photos/60/60?random=${item.id}`}
                                alt={`User ${item.id}`}
                                width="50"
                                height="50"
                                src={item.user_img_path ?? ''}
                              /> */}
                              <div className="d-flex justify-content-center align-items-center">
                                <Avatar src={item.user_img_path ?? ''} sx={{zIndex:0
                                }}/>
                              </div>
                            </th>
                            <th>{item.firstname}</th>
                            <th>{item.lastname}</th>
                            <th>{item.pin}</th>
                            <th>{item.citizen_id}</th>
                            <th>{item.account_type}</th>
                            <th>
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                              color="primary"
                            />  
                            </th>
                            <th>
                              <Box sx={{ display: 'flex', gap: 1, justifyContent:'center', alignItems:'center' }}>
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
                                </Box>
                              </th>
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
                <CustomPagination
                      count={100}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
  );
};

export default StudentList;
