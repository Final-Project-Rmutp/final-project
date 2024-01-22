import React,{ useEffect }from "react";
import useReportAdminList from "./useReportList";
import axios from "axios";
import { Sheet, Table, } from '@mui/joy';
import {
  Tbody,
  Theader,
  HeadList,
  TableContainer,
} from "../student-list/StudentListStyled";
import CustomPagination from "../../../shared/components/pagination/Pagination";

const ReportList: React.FC = () => {
    const { 
        reportList,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage, 
        fetchReportList
    } = useReportAdminList();

    const updateReportStatus = async (reportId: number, newStatus: string) => {
        try {
            const response = await axios.patch(`/admin/updatereportstatus/${reportId}`, {
                report_status: newStatus,
            });

            if (response.status === 200) {
                console.log("Report status updated successfully");
                await fetchReportList();
            } else {
                console.error("Failed to update report status:", response.data);
            }
        } catch (error) {
            console.error("Error updating report status:", error);
        }
    };
    useEffect(() => {
        fetchReportList();
    }, [fetchReportList]);

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
                <Theader >
                    <tr >
                        <th>No</th>
                        <th>Name</th>
                        <th>Report</th>
                        <th>Room</th>
                        <th>Date time</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </Theader>
                    <Tbody>
                        {reportList.map((item,index) => (
                            <tr className="text-center" key={item.id || index}>
                            <th>{index + 1}</th>
                            <th>{item.user_id}</th>
                            <th>{item.room_id}</th>
                            <th>{item.report_id}</th>
                            <th>{item.report_detail}</th>
                            <th>{formatTimestamp(item.timestamp)}</th>
                            <th>{item.report_status}</th>
                            <th>
                                <button
                                    onClick={() => updateReportStatus(item.report_id, "0")}>Update Status
                                </button>
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
        </HeadList>
    );
};

export default ReportList;

function formatTimestamp(timestamp: string | number): string {
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp, 10) * 1000 : timestamp * 1000);
    return `${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`;
}