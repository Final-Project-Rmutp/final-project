import React from "react";
import {
  TablePagination,

  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  Dialog,
  MenuItem,
  TextField,
} from "@mui/material";

import theme from "../../../styles/theme";
import { Checkbox, Button, Sheet, Table, ModalDialog, Modal, Divider, FormControl, FormLabel, Stack, Input } from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  Tbody,
  Theader,
  HeadStudentList,
  TableContainer,
} from "./RoomListStyled";
import useRoomList from "./useRoomList";
import DeleteForever from "@mui/icons-material/DeleteForever";

const RoomList: React.FC = () => {
  const {
    listItems,
    selectAll,
    selectedItems,
    page,
    rowsPerPage,
    deleteDialogOpen,
    editingRoom,
    AddRoom,
    editDialogOpen,
    addDialogOpen,
    // room,
    handleAddConfirmed,
    handleCloseEditDialog,
    handleCloseAddDialog,
    handleInputChange,
    handleInputEditChange,
    handleSelectAll,
    handleCheckboxChange,
    handleDeleteConfirmed,
    handleCloseDeleteDialog,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDelete,
    handleEdit,
    handleDeleteAll,
    handleAdd,
    handleEditConfirmed,
  } = useRoomList();
  
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
                      <colgroup>
                        <col style={{ minWidth: '43px' }}/>
                        <col style={{ minWidth: '80px' }}/>
                        <col style={{ minWidth: '176px' }}/>
                        <col style={{ minWidth: '62px' }}/>
                        <col style={{ minWidth: '176px' }}/>
                        <col style={{ minWidth: '176px' }}/>
                        <col style={{ minWidth: '220px' }}/>
                      </colgroup>
                    <Theader >
                      <tr >
                        <th className="py-2 ">No</th>
                        <th className="py-2 "></th>
                        <th className="py-2 "></th>
                        <th className="py-2 ">Number</th>
                        <th className="py-2 ">Type</th>
                        <th className="py-2 ">Capacity</th>
                        <th className="py-2 ">Facilities</th>
                        <th className="py-2 ">Floor</th>
                        <th className="py-2 ">Stauts</th>
                      </tr>
                      <tr>
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
                            <Checkbox
                              checked={selectedItems.includes(item.room_id)}
                              onChange={() => handleCheckboxChange(item.room_id)}
                              color="primary"
                            />
                            </td>
                            <td>
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
                                  onClick={() => handleDelete(item.room_id)}
                                  className="delete"
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                            <td>
                                {item.room_number}
                            </td>
                            <td>{item.room_type}</td>
                            <td>{item.room_capacity}</td>
                            <td>{item.room_facilities}</td>
                            <td>{item.room_level}</td>
                            <td>{item.room_status}</td>
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
                          ? "Are you sure you want to delete all selected rooms?"
                          : "Are you sure you want to delete the selected room?"}
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
                <DialogTitle>Edit Room</DialogTitle>
                <form
                  onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                  }}
                >
                  <Stack spacing={3}>
                  {editingRoom && (
                    <>
                    <FormControl>
                      <FormLabel>Number</FormLabel>
                      <Input autoFocus required 
                        name="room_number"
                        value={editingRoom.room_number}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Type</FormLabel>
                      <Input required 
                        name="room_type"
                        value={editingRoom.room_type}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Capacity</FormLabel>
                      <Input required 
                        name="room_capacity"
                        value={editingRoom.room_capacity}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Facilities</FormLabel>
                      <Input required 
                        name="room_facilities"
                        value={editingRoom.room_facilities}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Floor</FormLabel>
                      <Input required 
                        name="room_level"
                        value={editingRoom.room_level}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Input required 
                        name="room_status"
                        value={editingRoom.room_status}
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
              <DialogTitle>Add New Room</DialogTitle>
              <DialogContent>
                <TextField
                  label="Number"
                  name="room_number"
                  value={AddRoom.room_number}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2, marginTop:2 }}
                  inputProps={{ inputMode: "numeric" }}
                />
                <TextField
                  label="Type"
                  name="room_type"
                  value={AddRoom.room_type}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  inputProps={{ inputMode: "numeric" }}
                />
                <TextField
                  label="Capacity"
                  name="room_capacity"
                  value={AddRoom.room_capacity}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Facilities"
                  name="room_facilities"
                  value={AddRoom.room_facilities}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Floor"
                  name="room_level"
                  value={AddRoom.room_level}
                  onChange={handleInputChange}
                  select
                  fullWidth
                >
                  <MenuItem value="1" >1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
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

export default RoomList;
