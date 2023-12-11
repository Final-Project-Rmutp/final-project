import React from "react";
import {
  TablePagination,

  DialogTitle,
  DialogContent,
  DialogActions,
  // Typography,

  // Checkbox,
  ThemeProvider,
  // Button,
} from "@mui/material";
// import UserService from "../../../auth/service/UserService";
// import useUserState from "../../../auth/model/useUserState";
// import { ListItem, UserData } from "../../../auth/model/authTypes";
import theme from "../../../styles/theme";
import { Checkbox, Button, Sheet, Table, ModalDialog, Modal, Divider} from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  // StyledTable,
  Tbody,
  Theader,
  // StyledButton,
  HeadStudentList,
  TableContainer,
  // StickyHeader
} from "./ReservedListStyled";
import useReservedList from "./useReservedList";

const ReservedList: React.FC = () => {
  const {
    listItems,
    selectAll,
    selectedItems,
    page,
    rowsPerPage,
    deleteDialogOpen,
    // user,
    handleSelectAll,
    handleCheckboxChange,
    handleDeleteConfirmed,
    handleCloseDeleteDialog,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useReservedList();
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
                                {item.user_name ?? ''}
                            </td>
                            <td >
                            </td>
                            <td>
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                              color="primary"
                            />
                            </td>
                            <td>{item.citizen_id}</td>
                            <td>{item.room_id}</td>
                            <td>{item.start_date}</td>
                            <td>{item.end_date}</td>
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
                </div>
            </div>
          </HeadStudentList>
    </ThemeProvider>
  );
};

export default ReservedList;
