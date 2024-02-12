import { AdminReportModel } from "../../../auth/model/report";
import RoomService from "../../../auth/service/RoomService";
import { useCallback, useEffect, useState } from "react";

const useReportAdminList = () => {
    const [reportList, setListItems] = useState<AdminReportModel[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchReportList = useCallback(async () => {
            const response = await RoomService.getAdminReportList({ page, pageSize: rowsPerPage });
            setListItems(response);
            return response.data;

    }, [page, rowsPerPage]);

    useEffect(() => {
        fetchReportList();
    }, [fetchReportList]);

    const handleChangePage = async (newPage: number) => {
        setPage(newPage);
        await fetchReportList();
    };

    const handleChangeRowsPerPage = async (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        await fetchReportList();
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
