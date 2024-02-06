import React,{ useEffect }from "react";
import useReportAdminList from "./useReportList";
import { Button, Chip, Sheet, Table, Checkbox} from '@mui/joy';
import {
  Tbody,
  Theader,
  HeadList,
  TableContainer,
} from "../student-list/StudentListStyled";
import CustomPagination from "../../../shared/components/pagination/Pagination";
import axiosInstance from "../../../environments/axiosInstance";

const ReportList: React.FC = () => {
    const { 
        reportList,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage, 
        fetchReportList
    } = useReportAdminList();
    const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
    const [selectAllChecked, setSelectAllChecked] = React.useState(false);

    const handleToggleCheckbox = (reportId: number) => {
        const updatedSelection = selectedItems.includes(reportId)
          ? selectedItems.filter((id) => id !== reportId)
          : [...selectedItems, reportId];
        setSelectedItems(updatedSelection);
      };
      
      const handleToggleSelectAll = () => {
        const allIds = reportList.map((item) => item.report_id);
        const updatedSelection = selectAllChecked ? [] : allIds;
        setSelectedItems(updatedSelection);
        setSelectAllChecked(!selectAllChecked);
      };

      const updateReportStatus = async (reportId: number, status: string) => {
        const newStatus = status === "Cancel" ? "0" : status === "In Progress" ? "1" : "2";
        const response = await axiosInstance.patch(`/admin/updatereportstatus/${reportId}`, {
            report_status: newStatus,
        });
        await fetchReportList();
        return response.data;
    };
    
    const handleCancel = async () => {
        for (const reportId of selectedItems) {
          await updateReportStatus(Number(reportId), "Cancel");
        }
        await fetchReportList();
        setSelectedItems([]);
      };
      
      const handleApprove = async () => {
        for (const reportId of selectedItems) {
          await updateReportStatus(Number(reportId), "Approve");
        }
        await fetchReportList();
        setSelectedItems([]);
      };
      
      const handleInProgress = async () => {
        for (const reportId of selectedItems) {
          await updateReportStatus(Number(reportId), "In Progress");
        }
        await fetchReportList();
        setSelectedItems([]);
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
                        height: 331,
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
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Report</th>
                        <th>Room</th>
                        <th>Date time</th>
                        <th>Status</th>
                        <th>Select</th>
                    </tr>
                    <tr>
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
                        {reportList.map((item,index) => (
                            <tr className="text-center" key={item.id || index}>
                            <th>{(page - 1) * rowsPerPage + index + 1}</th>
                            <th>{item.fullname}</th>
                            <th>{item.room_number}</th>
                            <th>{item.report_detail}</th>
                            <th>{formatTimestamp(item.timestamp)}</th>
                            <th>
                                <Chip color={item.report_status === 0 ? "danger" : item.report_status === 1 ? "warning" : "success"} variant="solid" size="lg">
                                    {item.report_status === 0 ? "Cancel" : item.report_status === 1 ? "In Progress" : "Approve"}
                                </Chip>
                            </th>
                            <th>
                                <Checkbox
                                    checked={selectedItems.includes(item.report_id)}
                                    onChange={() => handleToggleCheckbox(item.report_id)}
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
    );
};

export default ReportList;

const formatTimestamp = (timestamp: string | number): string => {
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp, 10) * 1000 : timestamp * 1000);
    return `${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`;
}