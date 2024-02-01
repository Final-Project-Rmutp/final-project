import UserService, { ReservedListUserItem } from "../../../auth/service/UserService";
import { useCallback, useEffect, useState } from "react";

const useStatus = () => {
    const [reservation, setListItems] = useState<ReservedListUserItem[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchReservationList = useCallback(async () => {
            const response = await UserService.getReservationListUser({
                page,
                pageSize: rowsPerPage
            });
            setListItems(response);
            return response.data;

    }, [page,rowsPerPage]);

    useEffect(() => {
    }, [fetchReservationList]);

    const handleChangePage = async (newPage: number) => {
        setPage(newPage);
        await fetchReservationList();
    };

    const handleChangeRowsPerPage = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        fetchReservationList();
    };

    return {
        reservation,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        fetchReservationList
    };
};

export default useStatus;
