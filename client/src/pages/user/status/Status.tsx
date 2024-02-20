/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useStatus from "./useStatus";
import { Chip, Container, Table, useColorScheme } from '@mui/joy';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import {
  Tbody,
  Theader,
  TableContainer,
  HeadList,
} from "../style-list/StyleListUser";
import { ReservedListUserItem } from "../../../auth/service/UserService";
import "./Status.scss";
const ReservationStatus: React.FC = () => {
  const {
    reservation,
    fetchReservationList
  } = useStatus();

  useEffect(() => {
    fetchReservationList();
  }, [fetchReservationList]);

  const [openStatus, setOpenStatus] = useState<{ [key: string]: boolean }>({});
  const { mode } = useColorScheme();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(status)
        ? prevExpandedRows.filter((row) => row !== status)
        : [...prevExpandedRows, status]
    );
  
    setOpenStatus((prevOpenStatus) => ({
      ...prevOpenStatus,
      [status]: !prevOpenStatus[status],
    }));
  };
  
  

  type StatusColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';


const renderStatusRow = (status: string, color: StatusColor) => {
    const filteredReservations =
      reservation?.filter((item) => item.reservation_status === status) || [];
    return (
      <>
        {filteredReservations.length > 0 ? (
          <tr
                key={status}
                className={`text-center ${expandedRows.includes(status) ? 'expanded' : ''}`}
            >
            <th colSpan={7} className="cursor-pointer">
              <div className="d-flex justify-content-between p-3" style={{ border: '1px solid', padding: 5,borderRadius:'15px'  }}
               onClick={() => toggleStatus(status)}>
                <div className="d-flex gap-4 align-items-center">
                <span>{expandedRows.includes(status) ? <SlArrowDown /> : <SlArrowUp />}</span>
                <Chip color={color as any} variant="solid">
                  {status}
                </Chip>
                </div>
                <span className="text-success fw-bold">Found Data {status}</span>
                 
              </div>
            </th>
          </tr>
        ) : (
          <tr key={status} className="text-center">
            <th colSpan={7} className="cursor-no-drop">
              <div className="d-flex justify-content-between p-3" style={{ border: '1px solid', padding: 5,borderRadius:'15px' }}>
              <div className="d-flex gap-4 align-items-center">
                <span>{expandedRows.includes(status) ? <SlArrowDown /> : <SlArrowUp />}</span>
                <Chip color={color as any} variant="solid">
                  {status}
                </Chip>
                </div>
                <span className="text-danger fw-bold">No data for {status}</span>
              </div>
            </th>
          </tr>
        )}
        {openStatus[status] && (
          <tr>
            <td colSpan={7}>
              <Table>
                <Tbody>
                  {filteredReservations.map((item, index) =>
                    renderReservationDetails(item, index)
                  )}
                </Tbody>
              </Table>
            </td>
          </tr>
        )}
      </>
    );
  };
  



  const renderReservationDetails = (item: ReservedListUserItem, index: number) => (
    <tr  key={item.id || index} className="text-center">
      <th style={{ width: 100 }}>{index + 1}</th>
      <th style={{ width: 100 }}>{item.room_number}</th>
      <th style={{ width: 100 }}>{item.reservation_reason}</th>
      <th style={{ width: 100 }}>
        <Chip
          color={
            item.reservation_status.toString() === "Cancel"
              ? "danger"
              : item.reservation_status.toString() === "In progress"
              ? "warning"
              : "success"
          }
          variant="solid"
          size="lg"
        >
          {item.reservation_status}
        </Chip>
      </th>
      <th style={{ width: 100 }}>{formatTimestamp(item.reservation_date)}</th>
      <th style={{ width: 100 }}>{item.start_time}</th>
      <th style={{ width: 100 }}>{item.end_time}</th>
    </tr>
  );

  const formatTimestamp = (timestamp: string | number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="py-24 sm:py-32 md:py-40 relative d-flex justify-center align-items-center"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        maxHeight: "calc(100vh - 0  px)",
        overflowY: "auto" || "hidden",
        ...(mode === "dark"
        ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
        : { background: "linear-gradient(to bottom, #AA96DA, #6962AD)" }),
        padding: 5,
      }}
    >
        <Container>
            <HeadList>
                <TableContainer 
                style={{
                    overflowX: 'auto',
                    width: '100%',
                    height:'100%',
                    maxHeight:500,
                    minWidth: 650,
                    padding:5
                  }}
                >
                    
                        <Table
                        className="table mb-0"
                        borderAxis="bothBetween"
                        stickyHeader
                        >
                        <Theader>
                            <tr>
                            <th style={{ width: 150 }}>No</th>
                            <th style={{ width: 150 }}>Room</th>
                            <th style={{ width: 150 }}>Detail</th>
                            <th style={{ width: 150 }}>Status</th>
                            <th style={{ width: 150 }}>Reservation Date</th>
                            <th style={{ width: 150 }}>Start time</th>
                            <th style={{ width: 150 }}>End time</th>
                            </tr>
                            <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            </tr>
                        </Theader>
                        <Tbody 
                        sx={{ width:'100%', minWidth: 650 }}
                        >
                            {renderStatusRow("Approve", "success")}
                            {renderStatusRow("In progress", "warning")}
                            {renderStatusRow("Cancel", "danger")}
                        </Tbody>
                        </Table>
                    {/* <div className="pagination-container">
                        <CustomPagination
                        count={100}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div> */}
                    </TableContainer>
            </HeadList>
        </Container>
    </div>
  );
};

export default ReservationStatus;
