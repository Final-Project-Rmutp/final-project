import React,{ useEffect }from "react";
import useStatus from "./useStatus";
import {  Chip, Sheet, Table, useColorScheme } from '@mui/joy';
import {
  Tbody,
  Theader,
  HeadList,
  TableContainer,
} from "../../admin/student-list/StudentListStyled";
import CustomPagination from "../../../shared/components/pagination/Pagination";
// import axiosInstance from "../../../environments/axiosInstance";


const ReservationStatus: React.FC = () => {
    const { 
        reservation,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage, 
        fetchReservationList
    } = useStatus();
    // const [reportData, setReportData] = useState({
    // room_id: "",
    // report_detail: "",
    // });
    // const [isModalOpen, setModalOpen] = useState(false);

    // const handleReportSubmit = async () => {
    //         try {
    //         const response = await axiosInstance.post("/user/room/report", {
    //             room_id: reportData.room_id,
    //             report_detail: reportData.report_detail,
    //         });
        
    //         console.log(response.data);
        
    //         // Fetch the updated reservation list
    //         fetchReservationList();
        
    //         // Close the modal after submitting the report
    //         closeModal();
    //         } catch (error) {
    //         console.error("Error submitting report:", error);
    //         }
    // };
    // const closeModal = () => {
    //     setModalOpen(false);
    // };
    useEffect(() => {
        fetchReservationList();
    }, [fetchReservationList]);
    const { mode } = useColorScheme();

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
                        : { background: "#AA96DA" }),
                    padding: 5,
                    }}
                >       
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
                            
                        >
                    <Theader >
                        <tr>
                            <th style={{width:150}}>No</th>
                            <th style={{width:150}}>Room</th>
                            <th style={{width:150}}>Detail</th>
                            <th style={{width:150}}>Status</th>
                            <th style={{width:150}}>Reservation Date</th>
                            <th style={{width:150}}>Start time</th>
                            <th style={{width:150}}>End time</th>
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
                        <Tbody>
                            {reservation.map((item,index) => (
                                <tr className="text-center" key={item.id || index}>
                                <th>{index + 1}</th>
                                <th>{item.room_number}</th>
                                <th>{item.reservation_reason}</th>
                                <th>
                                <Chip color={item.reservation_status.toString() === "Cancel" ? "danger" : item.reservation_status.toString() === "In progress" ? "warning" : "success"} variant="solid" size="lg">
                                    {item.reservation_status}
                                </Chip>
                                </th>
                                <th>{formatTimestamp(item.reservation_date)}</th>
                                {/* <th>{formatTimestamp(item.timestamp)}</th> */}
                                <th>{item.start_time}</th>
                                <th>{item.end_time}</th>
                                {/* <th>
                                <Button onClick={() => {
                                    setReportData({
                                        room_id: item.id,
                                        report_detail: "", // Include the existing report_detail value
                                    });
                                    setModalOpen(true);
                                }}>
                                    Report
                                </Button>
                                </th> */}
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
                {/* <Modal open={isModalOpen} onClose={closeModal}>
                    <ModalDialog>
                    <Stack spacing={3}>
                        <FormControl>
                        <FormLabel>Room</FormLabel>
                        <Input
                            type="text"
                            value={reportData.room_id}
                        />
                        </FormControl>
                        <FormControl>
                        <FormLabel>Report Detail</FormLabel>
                        <Input
                            type="text"
                            value={reportData.report_detail}
                            onChange={(e) =>
                            setReportData({
                                ...reportData,
                                report_detail: e.target.value,
                            })
                            }
                        />
                        </FormControl>
                    </Stack>
                    <div className='d-flex gap-3'>
                        <Button onClick={handleReportSubmit}>Confirm</Button>
                        <Button onClick={closeModal}>Cancel</Button>
                    </div>
                    </ModalDialog>
                </Modal> */}
            </HeadList>
        </div>
    );
};

export default ReservationStatus;

const formatTimestamp = (timestamp: string | number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
  

