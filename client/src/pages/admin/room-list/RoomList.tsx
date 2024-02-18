import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Checkbox, Button, Sheet, Table, ModalDialog, Modal, Divider, FormControl, FormLabel, Stack, Input, Box, Select,Option,
  DialogTitle,
  Chip,
 } from '@mui/joy';
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
import axiosInstance from "../../../environments/axiosInstance";

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
    setAddRoom,
    fetchRoomList,
    fetchFacilities,
    facilities
  } = useRoomList();

  
  useEffect(() => {
    fetchRoomList();
    fetchFacilities();
  }, [fetchRoomList,fetchFacilities,page, rowsPerPage]);
  
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [roomnumber, setRoomnumber] = useState<{ room_id: string; room_number: string }[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [availableFloorsApi, setRoomFloorsApi] = useState<string[]>([]);
  useEffect(() => {
    const fetchRoomLevel = async () => {
      try {
        const response = await axiosInstance.get(`/admin/room/getroomlevel`);
        setRoomFloorsApi(response.data.roomlevel);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };
    
    fetchRoomLevel();
    
  }, []); 
  useEffect(() => {
    const fetchRoomNumber = async () => {
      if (selectedFloor) {
        try {
          const response = await axiosInstance.get(`/admin/room/getroomnumber/${selectedFloor}`);
          setRoomnumber(response.data);
        } catch (error) {
          console.error("Error fetching room numbers:", error);
        }
      }
    };

    if (selectedFloor) {
      fetchRoomNumber();
    }
  }, [selectedFloor]);
  // useEffect(() => {
  //     fetchUserOptions();
  // }, []);
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axiosInstance.get(`/admin/room/getroomtype/{roomtype_id}`);
        setRoomTypes(response.data.room_types);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };
    
    fetchRoomTypes();
  }, []); 


  
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
                        height: 375,
                        overflow: "auto",
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
                        <th style={{ width: 150 }}>Number</th>
                        <th style={{ width: 100 }}>Type</th>
                        <th style={{ width: 100 }}>Capacity</th>
                        <th style={{ width: 150 }}>Facilities</th>
                        <th style={{ width: 100 }}>Floor</th>
                        <th style={{ width: 150 }}>Status</th>
                        <th style={{ width: 100 }}>Actions</th>
                        <th style={{ width: 180 }}>Active</th>
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
                            disabled={false}
                            size="md"
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
                              disabled={false}
                              size="md"
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
                  <Modal open={deleteDialogOpen} onClose={handleCloseDeleteDialog} >
                    <ModalDialog variant="outlined" role="alertdialog" color="danger" sx={{borderWidth: '3px'}}>
                      <DialogTitle color="danger" variant="plain" level="body-lg">
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
                        <Button variant="solid" color="neutral" onClick={handleCloseDeleteDialog}>
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
                  disabled={selectedItems.length === 0}
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
                        <FormLabel required>Floor</FormLabel>
                        <Select
                            variant="solid"
                            color="primary"
                            placeholder="เลือกชั้น"
                            onChange={(_, value) => setSelectedFloor(value as string | null)}
                        >
                            {availableFloorsApi.map((floor) => (
                            <Option key={floor} value={floor}>
                                {floor}
                            </Option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel required>Room</FormLabel>
                        <Select
                            required
                            variant="solid"
                            color="primary"
                            name="room_id"
                            value={editingRoom.room_id}
                            onChange={(_, value) =>
                              setEditRoom({ ...editingRoom, room_id: value as string })
                            }
                            size="lg"
                        >
                            {roomnumber.map((user) => (
                                <Option key={user.room_id} value={user.room_id}>
                                    {user.room_number}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                    {/* <FormControl>
                      <FormLabel required>Number</FormLabel>
                      <Input autoFocus required 
                        name="room_number"
                        value={editingRoom.room_number}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                      />
                    </FormControl> */}
                    <FormControl>
                      <FormLabel required>Type</FormLabel>
                      <Select
                        variant="solid"
                        color="primary"
                        required
                        name="room_type"
                        value={editingRoom.room_type}
                        sx={{ width: '100%' }}
                        onChange={(_, value) =>
                          setEditRoom({ ...editingRoom, room_type: value as string })
                        }
                      >
                        {roomTypes.map((type) => (
                          <Option key={type} value={type}>
                            {type}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel required>Capacity</FormLabel>
                      <Input required 
                        name="room_capacity"
                        value={editingRoom.room_capacity}
                        onChange={handleInputEditChange}
                        fullWidth
                        size="lg"
                        color="primary"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel required>Facilities</FormLabel>
                      <Select
                      variant="solid"
                      color="primary"
                        required
                        name="facilities_id"
                        value={editingRoom.facilities_id}
                        onChange={(_, values) =>
                          setEditRoom({
                            ...editingRoom,
                            facilities_id: values as number[],
                          })
                        }
                        multiple
                      >
                        {facilities.map((facility) => (
                          <Option key={facility.facility_id} value={facility.facility_id.toString()}>
                            {facility.facility_name}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel required>Status</FormLabel>
                      <Select
                      variant="solid"
                      color="primary"
                        defaultValue="select"
                        required
                        name="room_status"
                        value={editingRoom.room_status}
                        onChange={(_, value) =>
                          setEditRoom({ ...editingRoom, room_status: value as string })
                        }
                      >
                        <Option value="0">
                          <Chip
                          color="danger"
                          variant="solid"
                          >ห้องใช้งานไม่ได้
                          </Chip>
                        </Option>
                        <Option value="1">
                        <Chip
                          color="success"
                          variant="solid"
                          >ห้องใช้งานได้
                          </Chip>
                        </Option>
                      </Select>
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
                      <FormLabel required>Floor</FormLabel>
                      <Input required 
                        name="room_level"
                        value={AddRoom.room_level}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                        color="primary"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel required>Room</FormLabel>
                      <Input required 
                        name="room_number"
                        value={AddRoom.room_number}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                        color="primary"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel required>Type</FormLabel>
                      <Select
                        variant="solid"
                        color="primary"
                        required
                        name="room_type"
                        value={AddRoom.room_type}
                        sx={{ width: '100%' }}
                        onChange={(_, values) =>
                          setAddRoom({
                            ...AddRoom,
                            room_type: values as string,
                          })
                        }
                        
                      >
                        {roomTypes.map((type) => (
                          <Option key={type} value={type}>
                            {type}
                          </Option>
                        ))}
                      </Select>
                      {/* <Input required 
                        name="room_type"
                        value={AddRoom.room_type}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                      /> */}
                    </FormControl>
                    <FormControl>
                      <FormLabel required>Capacity</FormLabel>
                      <Input required 
                        name="room_capacity"
                        value={AddRoom.room_capacity}
                        onChange={handleInputChange}
                        fullWidth
                        size="lg"
                        color="primary"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel required>Facilities</FormLabel>
                      <Select
                      variant="solid"
                      color="primary"
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
                        {facilities.map((facility) => (
                          <Option key={facility.facility_id} value={facility.facility_id.toString()}>
                            {facility.facility_name}
                          </Option>
                        ))}
                      </Select>
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
