import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Checkbox, Button, Sheet, Table, ModalDialog, Modal, Divider, FormControl, FormLabel, Stack, Input, Box, Select,Option } from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  Tbody,
  Theader,
  HeadList,
  TableContainer,
} from "../student-list/StudentListStyled";
import useRoomList from "./useRoomList";
import DeleteForever from "@mui/icons-material/DeleteForever";
import CustomPagination from "../../../shared/components/pagination/Pagination";


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
    setEditRoom,
    setAddRoom
  } = useRoomList();
  const mapFacilityValueToLabel = (values: number[]) => {
    if (!Array.isArray(values)) {
      return [];
    }
  
    return values.map((value) => {
      switch (value) {
        case 1:
          return "computer";
        case 2:
          return "projector";
        default:
          return "";
      }
    });
  };
  
  return (
          <HeadList>
            <TableContainer>
              <Sheet
                    sx={{
                        "--TableCell-height": "40px",
                        "--TableHeader-height": "calc(1 * var(--TableCell-height))",
                        "--Table-firstColumnWidth": "80px",
                        "--Table-lastColumnWidth": "144px",
                        "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
                        "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
                        height: 370,
                        overflow: "auto",
                        background: (
                        theme
                        ) => `linear-gradient(${theme.vars.palette.background.surface} ,
                                0 100%`,
                        backgroundSize:
                        "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "local, local, scroll, scroll",
                        backgroundPosition:
                        "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
                        backgroundColor: "nav.bg",
                    }}
                    >
                    <Table
                        className="table mb-0"
                        borderAxis="bothBetween"
                        stickyHeader
                        hoverRow
                        sx={{
                        "--Table-headerUnderlineThickness": "1px",
                        "--TableCell-paddingX": "10px",
                        "--TableCell-paddingY": "7px",
                        "& tr > *:first-of-type": {
                            position: "sticky",
                            zIndex: 1,
                            left: 0,
                            boxShadow: "1px 0 var(--TableCell-borderColor)",
                            // bgcolor: 'background.surface',
                        },
                        "& tr > *:last-child": {
                            position: "sticky",
                            right: 0,
                            bgcolor: "var(--TableCell-headBackground)",
                        },
                        }}
                    >
                    <Theader >
                      <tr >
                        <th style={{ width: 50 }}>No</th>
                        <th style={{ width: 100 }}>Number</th>
                        <th style={{ width: 100 }}>Type</th>
                        <th style={{ width: 50 }}>Capacity</th>
                        <th style={{ width: 100 }}>Facilities</th>
                        <th style={{ width: 50 }}>Floor</th>
                        <th style={{ width: 100 }}>Stauts</th>
                        <th style={{ width: 80 }}>Actions</th>
                        <th style={{ width: 150 }}>Active</th>
                      </tr>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                        <Checkbox
                            key="selectAllCheckbox"
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
                          <tr className="text-center" key={item.id || index}>
                            <th>{(page - 1) * rowsPerPage + index + 1}</th>
                            <th>
                                {item.room_number}
                            </th>
                            <th>{item.room_type}</th>
                            <th>{item.room_capacity}</th>
                            <th>{Array.isArray(item.room_facilities) ? item.room_facilities.join(", ") : item.room_facilities}</th>
                            <th>{item.room_level}</th>
                            <th>{parseInt(item.room_status, 10) === 1 ? "ห้องใช้งานได้" : "ห้องใช้งานไม่ได้"}</th>
                            <th>
                            <Checkbox
                              checked={selectedItems.includes(item.room_id)}
                              onChange={() => handleCheckboxChange(item.room_id)}
                              color="primary"
                            />
                            </th>
                            <th>
                            <Box sx={{ display: 'flex', gap: 1, justifyContent:'center', alignItems:'center' }}>
                                <Button
                                  variant="solid"
                                  color="warning"
                                  className="edit"
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="danger"
                                  variant="solid"
                                  endDecorator={<DeleteForever />}
                                  onClick={() => handleDelete(item.room_id)}
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
                  variant="solid"
                  className="text-red p-2"
                  onClick={handleDeleteAll}
                >
                Delete All
                </Button>
                <Button
                  sx={{
                    width: "150px",
                    padding: "15px !important",
                    ":hover": {
                      boxShadow: "0 1px 20px 1px #0D6EFD",
                      border: "1px solid #0D6EFD",
                    },
                  }}
                  id="add"
                  color="primary"
                  variant="solid"
                  className=" p-2"
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
                      {/* <Input required 
                        name="room_facilities"
                        value={editingRoom.room_facilities}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      /> */}
                      <Select
                          defaultValue={['1']}
                          required
                          name="room_facilities"
                          value={editingRoom.room_facilities.map(String)}
                          onChange={(_, values) =>
                            setEditRoom({
                              ...editingRoom,
                              room_facilities: values.map(Number),
                            })
                          }
                          multiple
                        >
                          <Option value="1">{mapFacilityValueToLabel([1])}</Option>
                          <Option value="2">{mapFacilityValueToLabel([2])}</Option>
                        </Select>
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
            <Modal open={addDialogOpen} onClose={handleCloseAddDialog}>
              <ModalDialog
                size="lg"
                variant="outlined"
                layout="center"
                color="primary"
                sx={{width:450}}>  
                <DialogTitle>Add New Room</DialogTitle>
                <form
                  onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                  }}
                >
                  <Stack spacing={3}>
                    <>
                    <FormControl>
                      <FormLabel>Number</FormLabel>
                      <Input autoFocus required 
                        name="room_number"
                        value={AddRoom.room_number}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Type</FormLabel>
                      <Input required 
                        name="room_type"
                        value={AddRoom.room_type}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Capacity</FormLabel>
                      <Input required 
                        name="room_capacity"
                        value={AddRoom.room_capacity}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Facilities</FormLabel>
                      {/* <Input required 
                        name="room_facilities"
                        value={AddRoom.room_facilities}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                      /> */}
                      <Select
                          defaultValue={['1']}
                          required
                          name="facilities_id"
                          value={AddRoom.facilities_id.map(String)}
                          onChange={(_, values) =>
                            setAddRoom({
                              ...AddRoom,
                              facilities_id: values.map(Number),
                            })
                          }
                          multiple
                        >
                          <Option value="1">{mapFacilityValueToLabel([1])}</Option>
                          <Option value="2">{mapFacilityValueToLabel([2])}</Option>
                        </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Floor</FormLabel>
                      <Input required 
                        name="room_level"
                        value={AddRoom.room_level}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl>
                    </>
                    <DialogActions>
                      <Button type="cancel" onClick={handleCloseAddDialog}>Cancel</Button>
                      <Button type="submit" onClick={handleAddConfirmed}>Confirm</Button>
                    </DialogActions>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
          </HeadList>
  );
};

export default RoomList;
