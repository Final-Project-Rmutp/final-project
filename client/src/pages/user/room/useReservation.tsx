// import RoomService, { ReservationListUser } from "../../../auth/service/RoomService";
// import { useCallback, useEffect, useState } from "react";

// const useReservationList = () => {
//     const [loadDataList, setListItems] = useState<ReservationListUser[]>([]);
//     const [page, setPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     const fetchReservationList = useCallback(async () => {
//             const response = await RoomService.getReservationList();
//             setListItems(response);
//             return response.data;

//     }, []);

//     useEffect(() => {
//         fetchReservationList();
//     }, [fetchReservationList]);

//     const handleChangePage = async (newPage: number) => {
//         setPage(newPage);
//         await fetchReservationList();
//     };

//     const handleChangeRowsPerPage = (newRowsPerPage: number) => {
//         setRowsPerPage(newRowsPerPage);
//         setPage(1);
//         fetchReservationList();
//     };

//     return {
//         loadDataList,
//         page,
//         rowsPerPage,
//         handleChangePage,
//         handleChangeRowsPerPage,
//         fetchReservationList
//     };
// };

// export default useReservationList;
