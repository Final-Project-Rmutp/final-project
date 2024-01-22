import { AdminReportModel } from "../../../auth/model/report";
import RoomService from "../../../auth/service/RoomService";
import { useCallback, useEffect, useState } from "react";

const useReportAdminList = () => {
    const [reportList, setListItems] = useState<AdminReportModel[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchReportList = useCallback(async () => {
        try {
            const response = await RoomService.getAdminReportList();
            setListItems(response);
        } catch (error) {
            console.error("Error fetching room response:", error);
        }
    }, []);

    useEffect(() => {
        fetchReportList();
    }, [fetchReportList]);

    const handleChangePage = async (newPage: number) => {
        setPage(newPage);
        await fetchReportList();
    };

    const handleChangeRowsPerPage = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        fetchReportList();
    };

    return {
        reportList,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        fetchReportList
    };
};

export default useReportAdminList;
