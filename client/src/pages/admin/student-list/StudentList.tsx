import React from "react";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import {
  Checkbox,
  Button,
  Sheet,
  Table,
  ModalDialog,
  Modal,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Avatar,
  Box,
  Select,
  Option,
  SvgIcon,
} from "@mui/joy";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {
  Tbody,
  Theader,
  HeadStudentList,
  TableContainer,
} from "./StudentListStyled";
import useStudentList from "./useStudentList";
import CustomPagination from "../../../shared/components/pagination/Pagination";
import { VisuallyHiddenInput } from "./StudentListStyled";
// import { Icon } from '@iconify/react';
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
    handleAddConfirmed,
    handleInputChange,
    handleInputEditChange,
    handleAdd,
    handleEdit,
    handleCloseEditDialog,
    handleEditConfirmed,
    handleCloseAddDialog,
    handleSelectAll,
    handleCheckboxChange,
    handleDelete,
    handleDeleteConfirmed,
    handleDeleteAll,
    handleCloseDeleteDialog,
    handleChangePage,
    handleChangeRowsPerPage,
    setAddUser,
  } = useStudentList();
  interface Item {
    updated: boolean;
  }
  const rowStyle = (item: Item) => ({
    background: item.updated ? "#197419" : "",
    color: item.updated ? "white" : "",
    // borderRadius: item.updated ? '10px' : '',
  });
  const TableHeaderRows: React.FC = () => (
    <Theader>
    <tr>
      <th style={{ width: 50 }}>No</th>
      <th style={{ width: 80 }}>IMG</th>
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
    </tr>
  </Theader>
  );

  const ModalEdit: React.FC<{ open: boolean; onClose: () => void; onConfirm: () => void }> = ({ open, onClose, onConfirm }) => (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="lg" variant="outlined" layout="center" color="primary" sx={{ width: 450 }}>
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
                  <Input
                    autoFocus
                    required
                    name="pin"
                    value={editingUser.pin}
                    onChange={handleInputEditChange}
                    fullWidth
                    size="lg"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Student ID</FormLabel>
                  <Input
                    required
                    name="citizen_id"
                    value={editingUser.citizen_id}
                    onChange={handleInputEditChange}
                    fullWidth
                    size="lg"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>FirstName</FormLabel>
                  <Input
                    required
                    name="firstname"
                    value={editingUser.firstname}
                    onChange={handleInputEditChange}
                    fullWidth
                    size="lg"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>LastName</FormLabel>
                  <Input
                    required
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
              <Button type="cancel" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" onClick={onConfirm}>
                Confirm
              </Button>
            </DialogActions>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
  const ModalAdd: React.FC<{ open: boolean; onClose: () => void; onConfirm: () => void }> = ({ open, onClose, onConfirm }) => (
    <Modal open={open} onClose={onClose}>
        <ModalDialog
          size="lg"
          layout="center"
          color="primary"
          sx={{ width: 450 }}
        >
          <DialogTitle>Add New User</DialogTitle>

          <Stack spacing={3}>
            <>
              <FormControl>
                <FormLabel>ID Card</FormLabel>
                <Input
                  autoFocus
                  required
                  name="pin"
                  value={AddUser.pin}
                  onChange={handleInputChange}
                  fullWidth
                  size="lg"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Student ID</FormLabel>
                <Input
                  required
                  name="citizen_id"
                  value={AddUser.citizen_id}
                  onChange={handleInputChange}
                  fullWidth
                  size="lg"
                />
              </FormControl>
              <FormControl>
                <FormLabel>FirstName</FormLabel>
                <Input
                  required
                  name="firstname"
                  value={AddUser.firstname}
                  onChange={handleInputChange}
                  fullWidth
                  size="lg"
                />
              </FormControl>
              <FormControl>
                <FormLabel>LastName</FormLabel>
                <Input
                  required
                  name="lastname"
                  value={AddUser.lastname}
                  onChange={handleInputChange}
                  fullWidth
                  size="lg"
                />
              </FormControl>
              <FormControl>
                <FormLabel>AccountType</FormLabel>
                <Select
                  defaultValue="select"
                  required
                  name="account_type"
                  value={AddUser.account_type}
                  onChange={(_, value) =>
                    setAddUser({ ...AddUser, account_type: value as string })
                  }
                >
                  <Option value="student">Student</Option>
                  <Option value="teacher">Teacher</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Upload</FormLabel>
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="solid"
                  color="success"
                  startDecorator={
                    <SvgIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                      </svg>
                    </SvgIcon>
                  }
                >
                  Upload a file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </FormControl>
            </>
            <DialogActions>
              <Button type="cancel" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" onClick={onConfirm}>
                Confirm
              </Button>
            </DialogActions>
          </Stack>
        </ModalDialog>
    </Modal>
  );
  return (
    <HeadStudentList>
      <TableContainer>
        <Sheet
          sx={{
            "--TableCell-height": "40px",
            "--TableHeader-height": "calc(1 * var(--TableCell-height))",
            "--Table-firstColumnWidth": "80px",
            "--Table-lastColumnWidth": "144px",
            "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
            "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
            minWidth: 600,
            height: 400,
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
            <TableHeaderRows />
            <Tbody>
              {listItems.map((item, index) => (
                <tr
                  key={item.id}
                  style={{ borderRadius: item.updated ? "10px" : "" }}
                >
                  <th style={rowStyle(item)}>
                    {(page - 1) * rowsPerPage + index + 1}
                  </th>
                  <th style={rowStyle(item)}>
                    {/* <img
                                src={`https://picsum.photos/60/60?random=${item.id}`}
                                alt={`User ${item.id}`}
                                width="50"
                                height="50"
                                src={item.user_img_path ?? ''}
                              /> */}
                    <div className="d-flex justify-content-center align-items-center">
                      <Avatar
                        src={item.user_img_path ?? ""}
                        sx={{ zIndex: 0 }}
                      />
                    </div>
                  </th>
                  <th style={rowStyle(item)}>{item.firstname}</th>
                  <th style={rowStyle(item)}>{item.lastname}</th>
                  <th style={rowStyle(item)}>{item.pin}</th>
                  <th style={rowStyle(item)}>{item.citizen_id}</th>
                  <th style={rowStyle(item)}>{item.account_type}</th>
                  <th>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      color="primary"
                    />
                  </th>
                  <th>
                    {/* {item.updated && 
                                  <Icon icon="icon-park:update-rotation" />} */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="solid"
                        color="warning"
                        className="edit"
                        onClick={() => {
                          handleEdit(item);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        variant="solid"
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
                <Button
                  variant="solid"
                  color="neutral"
                  onClick={handleCloseDeleteDialog}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={handleDeleteConfirmed}
                >
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
            sx={{
              width: "150px",
              padding: "15px !important",
              ":hover": {
                boxShadow: "0 1px 20px 1px #A04C4C",
                border: "1px solid #A04C4C",
              },
            }}
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
      <ModalEdit 
      open={editDialogOpen} 
      onClose={handleCloseEditDialog} 
      onConfirm={handleEditConfirmed} />
      <ModalAdd 
      open={addDialogOpen} 
      onClose={handleCloseAddDialog} 
      onConfirm={handleAddConfirmed} />
    </HeadStudentList>
  );
};

export default StudentList;
