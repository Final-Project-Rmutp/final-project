import React, { useEffect } from "react";
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
  Box,
  SvgIcon,
  Tooltip,
  Select
} from "@mui/joy";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Tbody, HeadList, TableContainer ,OptionStyle} from "./StudentListStyled";
import useStudentList from "./useStudentList";
import CustomPagination from "../../../shared/components/pagination/Pagination";
import { VisuallyHiddenInput } from "./StudentListStyled";
// import { Icon } from '@iconify/react';
import { ListItem } from "../../../auth/model/authTypes";
import { TableHeaderRows } from "./table-header-rows";

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
    // setSearchTerm,
    citizenIdError,
    pinIdError,
    handleAddConfirmed,
    handleInputChange,
    handleInputChangeCitizen,
    handleInputChangePin,
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
    handleChange,
    handleImageChange,
    fetchUserList,
    handleEditImageChange,
  } = useStudentList();
  useEffect(() => {
    fetchUserList();
  }, [fetchUserList, page, rowsPerPage]);
  interface Item {
    updated: boolean;
  }
  const rowStyle = (item: Item) => ({
    background: item.updated ? "#197419" : "",
    color: item.updated ? "white" : "",
    // borderRadius: item.updated ? '10px' : '',
  });

  // const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
  const [clickedImageUrl, setClickedImageUrl] = React.useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] = React.useState<ListItem | null>(null);
  // const currentTime = useMemo(() => new Date().toLocaleTimeString(), []);

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
            height: 385,
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
            <TableHeaderRows
              searchTerm={searchTerm}
              handleChange={handleChange}
              handleSelectAll={handleSelectAll}
              selectAll={selectAll}
            />

            <Tbody>
              {listItems.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    style={{ borderRadius: item.updated ? "10px" : "" }}
                  >
                    <th style={rowStyle(item)}>
                      {(page - 1) * rowsPerPage + index + 1}
                    </th>
                    <th style={rowStyle(item)}>
                      {item.user_img_path !== null && (
                        <img
                          style={{
                            cursor: "pointer",
                            display: "block",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          src={`${item.user_img_path}?t=${new Date().toLocaleTimeString()} `}
                          alt={`User ${item.id}`}
                          width="50"
                          height="50"
                          onClick={() => {
                            setClickedImageUrl(
                              `${item.user_img_path}?t=${new Date().toLocaleTimeString()}`
                            );
                            setSelectedItem(item);
                          }}
                        />
                      )}
                    </th>
                    <th>
                      <Tooltip  title={item.firstname} arrow>
                        <span>{item.firstname}</span>
                      </Tooltip> 
                    </th>
                    <th>
                      <Tooltip  title={item.lastname} arrow>
                        <span>{item.lastname}</span>
                      </Tooltip> 
                    </th>
                    <th>
                      <Tooltip  title={item.pin} arrow>
                        <span>{item.pin}</span>
                      </Tooltip> 
                    </th>
                    <th>
                      <Tooltip  title={item.citizen_id} arrow>
                        <span>{item.citizen_id}</span>
                      </Tooltip> 
                    </th>
                    <th>
                      <Tooltip  title={item.account_type} arrow>
                        <span>{item.account_type}</span>
                      </Tooltip> 
                    </th>
                    <th>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        color="primary"
                        disabled={false}
                        size="md"
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
                );
              })}
            </Tbody>
          </Table>
          <Modal open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
            <ModalDialog
              variant="outlined"
              role="alertdialog"
              sx={{ width: "80%", maxWidth: 400 }}
            >
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
          count={1000}
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
          sx={{ width: "80%", maxWidth: 400 }}
        >
          <DialogTitle>Edit User</DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
            }}
            encType="multipart/form-data"
          >
            <Stack spacing={0.5} direction="column" justifyContent="flex-start">
              {editingUser && (
                <>
                  <FormControl>
                    <FormLabel required>Student ID</FormLabel>
                    <Input
                      autoFocus
                      required
                      name="pin"
                      value={editingUser.pin}
                      onChange={handleInputEditChange}
                      fullWidth
                      size="lg"
                      color="primary"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel required>ID Card</FormLabel>
                    <Input
                      required
                      name="citizen_id"
                      value={editingUser.citizen_id}
                      onChange={handleInputEditChange}
                      fullWidth
                      size="lg"
                      color="primary"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel required>FirstName</FormLabel>
                    <Input
                      required
                      name="firstname"
                      value={editingUser.firstname}
                      onChange={handleInputEditChange}
                      fullWidth
                      size="lg"
                      color="primary"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel required>LastName</FormLabel>
                    <Input
                      required
                      name="lastname"
                      value={editingUser.lastname}
                      onChange={handleInputEditChange}
                      fullWidth
                      size="lg"
                      color="primary"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel required>Upload New Image</FormLabel>
                    <Button
                      component="label"
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
                      Upload a new image
                      <VisuallyHiddenInput
                        type="file"
                        name="user_img_path"
                        onChange={(e) => handleEditImageChange(e)}
                      />
                    </Button>
                  </FormControl>
                  {editingUser.user_img_path !== null && (
                    <span>FileName : {editingUser.imageFileName}</span>
                  )}
                </>
              )}
              <DialogActions>
                <Button type="cancel" onClick={handleCloseEditDialog}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleEditConfirmed}>
                  Confirm
                </Button>
              </DialogActions>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <Modal open={addDialogOpen} onClose={handleCloseAddDialog}>
        <ModalDialog
          size="lg"
          layout="center"
          color="primary"
          sx={{ width: "80%", maxWidth: 400 }}
        >
          <DialogTitle>Add New User</DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
            }}
            encType="multipart/form-data"
          >
            <Stack spacing={0.5} direction="column" justifyContent="flex-start">
              <>
                <FormControl>
                  <FormLabel required>Student ID</FormLabel>
                  <Input
                    required
                    error={pinIdError}
                    name="pin"
                    value={AddUser.pin}
                    onChange={handleInputChangePin}
                    fullWidth
                    size="lg"
                    color="primary"
                  />
                  {pinIdError && (
                    <p style={{ color: "red" }}>
                      Citizen ID is required and must be valid.
                    </p>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel required>ID Card</FormLabel>
                  <Input
                    required
                    error={citizenIdError}
                    name="citizen_id"
                    value={AddUser.citizen_id}
                    onChange={handleInputChangeCitizen}
                    fullWidth
                    size="lg"
                    color="primary"
                  />
                  {citizenIdError && (
                    <p style={{ color: "red" }}>
                      Citizen ID is required and must be valid.
                    </p>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel required>FirstName</FormLabel>
                  <Input
                    required
                    name="firstname"
                    value={AddUser.firstname}
                    onChange={handleInputChange}
                    fullWidth
                    size="lg"
                    color="primary"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel required>LastName</FormLabel>
                  <Input
                    required
                    name="lastname"
                    value={AddUser.lastname}
                    onChange={handleInputChange}
                    fullWidth
                    size="lg"
                    color="primary"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel required>AccountType</FormLabel>
                  <Select
                    defaultValue="select"
                    required
                    color="primary"
                    variant="outlined"
                    name="account_type"
                    value={AddUser.account_type}
                    onChange={(_, value) =>
                      setAddUser({ ...AddUser, account_type: value as string })
                    }
                  >
                    <OptionStyle value="student">Student</OptionStyle>
                    <OptionStyle value="teacher">Teacher</OptionStyle>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel required>Upload</FormLabel>
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
                    <VisuallyHiddenInput
                      type="file"
                      name="user_img_path"
                      onChange={handleImageChange}
                    />
                  </Button>
                </FormControl>
                {AddUser.user_img_path !== null && (
                    <span>FileName : {AddUser.imageFileName}</span>
                  )}
              </>
            </Stack>
            <Stack>
              <DialogActions>
                <Button type="cancel" onClick={handleCloseAddDialog}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleAddConfirmed}>
                  Confirm
                </Button>
              </DialogActions>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <Modal open={!!clickedImageUrl} onClose={() => setClickedImageUrl(null)}>
        <ModalDialog
          size="lg"
          variant="outlined"
          layout="center"
          color="primary"
          sx={{ width: "80%", maxWidth: 400 }}
        >
          <DialogTitle>{selectedItem && selectedItem.firstname}</DialogTitle>
          <DialogContent>
            {clickedImageUrl && (
              <img
                src={clickedImageUrl}
                alt="Full-size"
                style={{ width: "20rem", height: "20rem" }}
              />
            )}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={() => setClickedImageUrl(null)}>Close</Button> */}
          </DialogActions>
        </ModalDialog>
      </Modal>
    </HeadList>
  );
};

export default StudentList;
