import React, { useEffect } from "react";
import {   
  Button,
  Sheet,
  Table,
  Checkbox,
  Chip,
  Tooltip,
  Select,
  Container,
  Grid,
  FormLabel,
  Typography 
} from "@mui/joy";
import {
  Tbody,
  Theader,
  HeadList,
  TableContainer,
  OptionStyle,
  DateTime
} from "../student-list/StudentListStyled";
import CustomPagination from "../../../shared/components/pagination/Pagination";
import useReservedList from "./useReservedList"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/th";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ReservedList: React.FC = () => {
    const { 
      page,
      rowsPerPage,
      reservedtList,
      reservationStatus,
      reservationDate,
      selectAllChecked,
      selectedItems,
      handleChangePage,
      handleChangeRowsPerPage,
      handleToggleCheckbox,
      handleToggleSelectAll,
      handleCancel,
      handleApprove,
      handleInProgress,
      handleDateChange,
      handleStatusChange,
      fetchReservedList
    } = useReservedList();

    useEffect(() => {
      fetchReservedList();
    }, [page, rowsPerPage, reservationStatus, reservationDate, fetchReservedList]);
      
    
    

    
  
    return (
      <Container>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid>
                <FormLabel>Select Status</FormLabel>
                        <Select
                          placeholder="Select status"
                          value={reservationStatus}
                          onChange={handleStatusChange}
                        >
                          <OptionStyle value="">All</OptionStyle>
                          <OptionStyle value="2">Approve</OptionStyle>
                          <OptionStyle value="1">In Progress</OptionStyle>
                          <OptionStyle value="0">Cancel</OptionStyle>
                        </Select>
              </Grid>
              <Grid>
              <FormLabel>Select Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
                          <DateTime style={{position:'relative'}}
                          >
                            <DatePicker
                              className="datetime-picker"
                              format="DD MMMM YYYY"
                              value={reservationDate}
                              onChange={handleDateChange}
                            />
                            <img className="position-absolute top-0 right-0"
                            style={{pointerEvents:'none', transform:'translate(-50%,20%)',}}
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Tear-Off%20Calendar.png" alt="Stopwatch" width="25" height="25" />
                          </DateTime>
                        </LocalizationProvider>
              </Grid>
        </Grid>


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
                        height: 346,
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
                    <Theader>
                      <tr>
                        <th style={{ width: 150 }}>No</th>
                        <th style={{ width: 150 }}>Status</th>
                        <th style={{ width: 250 }}>Reservation Date</th>
                        <th style={{ width: 200 }}>Name</th>
                        <th style={{ width: 150 }}>Room</th>
                        <th style={{ width: 150 }}>Account Type</th>
                        <th style={{ width: 150 }}>Reason</th>
                        {/* <th>Date Time</th> */}
                        <th style={{ width: 150 }}>Start Time</th>
                        <th style={{ width: 150 }}>End Time</th>
                        <th style={{ width: 150 }}>Action</th>
                      </tr>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>

                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                          <Checkbox
                            checked={selectAllChecked}
                            onChange={handleToggleSelectAll}
                            color="primary"
                            disabled={false}
                            size="md"
                          />
                        </th>
                      </tr>
                    </Theader>
                    <Tbody>
                    {Array.isArray(reservedtList) && reservedtList.length === 0 && (
                          <tr>
                              <th colSpan={5}><Typography>No reservations found</Typography></th>
                          </tr>
                      )}
                        {Array.isArray(reservedtList) && reservedtList.map((item, index) => (
                            <tr className="text-center" key={item.id || index}>
                            <th>{(page - 1) * rowsPerPage + index + 1}</th>
                            <th>
                            <Tooltip  title={item.reservation_status} arrow>
                                <span>
                                  <Chip color={item.reservation_status === "Cancel" ? "danger" :
                                    item.reservation_status === "In progress"? "warning": "success"}
                                    variant="solid" 
                                    size="lg">
                                    {item.reservation_status}
                                  </Chip>
                                </span>
                            </Tooltip >
                            </th>
                            <th>
                            <Tooltip  title={formatTimestamp(item.reservation_date)} arrow>
                                            <span>{formatTimestamp(item.reservation_date)}</span>
                            </Tooltip >
                            </th>
                            <th>
                            <Tooltip  title={item.fullname} arrow>
                                            <span>{item.fullname}</span>
                            </Tooltip >
                            </th>
                            <th>
                            <Tooltip  title={item.room_number} arrow>
                                            <span>{item.room_number}</span>
                            </Tooltip >
                            </th>
                            <th>
                            <Tooltip  title={item.account_type} arrow>
                                            <span>{item.account_type}</span>
                            </Tooltip >
                            </th>
                            <th>
                            <Tooltip  title={item.reservation_reason} arrow>
                                            <span>{item.reservation_reason}</span>
                            </Tooltip >
                            </th>
                            <th>
                            <Tooltip  title={item.start_time} arrow>
                                            <span>{item.start_time}</span>
                            </Tooltip >
                            </th>
                            <th>
                            <Tooltip  title={item.end_time} arrow>
                                            <span>{item.end_time}</span>
                            </Tooltip >
                            </th>
                            <th>
                              <Checkbox
                                  checked={selectedItems.includes(item.reservation_id)}
                                  onChange={() => handleToggleCheckbox(item.reservation_id)}
                                  color="primary"
                                  disabled={false}
                                  size="md"
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
              <div className="d-flex mx-auto gap-3 mt-3">
                      <Button color="success" size="lg" onClick={handleApprove}
                          disabled={selectedItems.length === 0}
                          >
                      Approve
                      </Button>
                      <Button color="warning" size="lg" onClick={handleInProgress}
                          disabled={selectedItems.length === 0}
                          >
                      In Progress
                      </Button>
                      <Button color="danger" size="lg" onClick={handleCancel}
                          disabled={selectedItems.length === 0}
                          >
                      Cancel
                      </Button>
              </div>
        </HeadList>
      </Container>

        
    );
};

export default ReservedList;

const formatTimestamp = (timestamp: string | number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
}

