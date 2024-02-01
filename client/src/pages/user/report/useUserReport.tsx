import { UserReportModel } from "../../../auth/model/report";
import UserService from "../../../auth/service/UserService";
import { useCallback, useEffect, useState } from "react";

const useReportUserList = () => {
    const [reportList, setListItems] = useState<UserReportModel[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchReportList = useCallback(async () => {
            const response = await UserService.getUserReportList();
            setListItems(response);
            return response.data;

    }, []);

    useEffect(() => {
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

export default useReportUserList;
