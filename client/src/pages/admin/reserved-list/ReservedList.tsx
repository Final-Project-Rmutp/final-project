import React from "react";
import {   
  Button,
  Sheet,
  Table,
  Checkbox,
  Chip
} from "@mui/joy";
import {
  Tbody,
  Theader,
  HeadList,
  TableContainer,
} from "../student-list/StudentListStyled";
import CustomPagination from "../../../shared/components/pagination/Pagination";
import useReservedList from "./useReservedList"
const ReservedList: React.FC = () => {
    const { 
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        reservedtList, 
        fetchReservedList,
        // reserveRoom,
        // setReservationData,
        // reservationData,
        updateReservationStatus
    } = useReservedList();

    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleOpenModal = () => {
    //   setIsModalOpen(true);
    // };
  
    // const handleCloseModal = () => {
    //   setIsModalOpen(false);
    // };
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const { name, value } = event.target;
    //   setReservationData((prevUser) => ({
    //     ...prevUser,
    //     [name]: value,
    //   }));
    // };
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [selectAllChecked, setSelectAllChecked] = React.useState(false);

    const handleToggleCheckbox = (reservationId: string) => {
      const updatedSelection = selectedItems.includes(reservationId)
        ? selectedItems.filter((id) => id !== reservationId)
        : [...selectedItems, reservationId];
      setSelectedItems(updatedSelection);
    };
    const handleToggleSelectAll = () => {
      const allIds = reservedtList.map((item) => item.reservation_id);
      const updatedSelection = selectAllChecked ? [] : allIds;
      setSelectedItems(updatedSelection);
      setSelectAllChecked(!selectAllChecked);
    };
    

    const handleCancel = async () => {
        for (const reservationId of selectedItems) {
            await updateReservationStatus("1", reservationId);
        }
        await fetchReservedList();
        setSelectedItems([]);
    };
    const handleApprove = async () => {
      for (const reservationId of selectedItems) {
        await updateReservationStatus("2", reservationId);
      }
      await fetchReservedList();
      setSelectedItems([]);
    };
    
    const handleInProgress = async () => {
        for (const reservationId of selectedItems) {
            await updateReservationStatus("0", reservationId);
        }
        await fetchReservedList();
        setSelectedItems([]);
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
                    <Theader>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Room</th>
                        <th>Account Type</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Reservation Date</th>
                        {/* <th>Date Time</th> */}
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                      </tr>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                          <Checkbox
                            checked={selectAllChecked}
                            onChange={handleToggleSelectAll}
                          />
                        </th>
                      </tr>
                    </Theader>
                    <Tbody>
                        {reservedtList.map((item,index) => (
                            <tr className="text-center" key={item.id || index}>
                            <th>{index + 1}</th>
                            <th>{item.fullname}</th>
                            <th>{item.room_number}</th>
                            <th>{item.account_type}</th>
                            <th>{item.reservation_reason}</th>
                            <th>
                              <Chip color="success" variant="solid">{item.reservation_status}</Chip>
                            </th>
                            <th>{formatTimestamp(item.reservation_date)}</th>
                            {/* <th>{formatTimestamp(item.timestamp)}</th> */}
                            <th>{item.start_time}</th>
                            <th>{item.end_time}</th>
                            <th>
                              <Checkbox
                                  checked={selectedItems.includes(item.reservation_id)}
                                  onChange={() => handleToggleCheckbox(item.reservation_id)}
                              />
                            </th>
                            </tr>
                        ))}
                    </Tbody>
                </Table>
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
              <div className="d-flex mx-auto">
                <Button color="success" onClick={handleApprove}>
                  Approve
                </Button>
                <Button color="warning" onClick={handleInProgress}>
                  In Progress
                </Button>
                <Button color="danger"onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
                    {/* <Modal open={isModalOpen} onClose={handleCloseModal}>
                      <ModalDialog
                        size="lg"
                        variant="outlined"
                        layout="center"
                        color="primary"
                      >
                      <DialogTitle></DialogTitle>
                      <Stack>
                        <DialogContent>
                          <FormControl>
                            <FormLabel></FormLabel>
                            <Input
                              required
                              value={reservationData.reservation_date}
                              onChange={handleInputChange}
                              fullWidth
                              size="lg"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel></FormLabel>
                            <Input
                              required
                              value={reservationData.start_time}
                              onChange={handleInputChange}
                              fullWidth
                              size="lg"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel></FormLabel>
                            <Input
                              required
                              value={reservationData.end_time}
                              onChange={handleInputChange}
                              fullWidth
                              size="lg"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel></FormLabel>
                            <Input
                              required
                              value={reservationData.reservation_reason}
                              onChange={handleInputChange}
                              fullWidth
                              size="lg"
                            />
                          </FormControl>
                        </DialogContent>
                        <DialogActions>
                        <DialogActions>
                          <Button type="cancel" onClick={handleCloseEditDialog}>
                            Cancel
                          </Button>
                          <Button type="submit" onClick={handleEditConfirmed}>
                            Confirm
                          </Button>
                        </DialogActions>
                        </DialogActions>
                      </Stack>
                      </ModalDialog>
                    </Modal> */}
        </HeadList>
        
    );
};

export default ReservedList;

function formatTimestamp(timestamp: string | number): string {
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp, 10) * 1000 : timestamp * 1000);
    return `${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`;
}