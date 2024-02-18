/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import useReportUserList from "./useUserReport";
import { Chip, Container, Table, useColorScheme,Button } from "@mui/joy";
import { Tbody, Theader, TableContainer } from "../style-list/StyleListUser";
import { UserReportModel } from "auth/model/report";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const UserReportList: React.FC = () => {
  const {
    reportList,

    fetchReportList,
  } = useReportUserList();

  useEffect(() => {
    fetchReportList();
  }, [fetchReportList]);
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

  type StatusColor = "primary" | "secondary" | "success" | "warning" | "danger";

  const renderStatusRow = (status: string, color: StatusColor) => {
    const filteredReport =
      reportList?.filter((item) => item.report_status === status) || [];
    return (
      <>
        {filteredReport.length > 0 ? (
          <tr
            key={status}
            className={`text-center ${
              expandedRows.includes(status) ? "expanded" : ""
            }`}
          >
            <th colSpan={5} className="cursor-pointer">
              <div
                className="d-flex justify-content-between p-3"
                style={{
                  border: "1px solid",
                  padding: 5,
                  borderRadius: "15px",
                }}
                onClick={() => toggleStatus(status)}
              >
                <div className="d-flex gap-4 align-items-center">
                  <span>
                    {expandedRows.includes(status) ? (
                      <SlArrowDown />
                    ) : (
                      <SlArrowUp />
                    )}
                  </span>
                  <Chip color={color as any} variant="solid">
                    {status}
                  </Chip>
                </div>
                <span className="text-success fw-bold">
                  Found Data {status}
                </span>
              </div>
            </th>
          </tr>
        ) : (
          <tr key={status} className="text-center">
            <th colSpan={5} className="cursor-no-drop">
              <Button
                disabled
                variant="outlined"
                className="d-flex justify-content-between p-3"
                style={{
                  border: "1px solid",
                  padding: 5,
                  borderRadius: "15px",
                  width:'100%'
                }}
              >
                <div className="d-flex gap-4 align-items-center">
                  <span>
                    {expandedRows.includes(status) ? (
                      <SlArrowDown />
                    ) : (
                      <SlArrowUp />
                    )}
                  </span>
                  <Chip color={color as any} variant="solid">
                    {status}
                  </Chip>
                </div>
                <span className="text-danger fw-bold">
                  No data for {status}
                </span>
              </Button>
            </th>
          </tr>
        )}
        {openStatus[status] && (
          <tr>
            <td colSpan={5}>
              <Table>
                <Tbody>
                  {filteredReport.map((item, index) =>
                    renderReportDetails(item, index)
                  )}
                </Tbody>
              </Table>
            </td>
          </tr>
        )}
      </>
    );
  };
  const renderReportDetails = (item: UserReportModel, index: number) => (
    <tr className="text-center" key={item.id || index}>
      <th>{index + 1}</th>
      <th>{item.room_number}</th>
      <th>{item.report_detail}</th>
      <th>
        <Chip
          color={
            item.report_status.toString() === "Canceled"
              ? "danger"
              : item.report_status.toString() === "In progress"
              ? "warning"
              : "success"
          }
          variant="solid"
          size="lg"
        >
          {item.report_status}
        </Chip>
      </th>
      <th>{formatTimestamp(item.timestamp)}</th>
    </tr>
  );
  return (
    <div
      className="py-24 sm:py-32 md:py-40 relative d-flex justify-center align-items-center"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        maxHeight: "calc(100vh - 0px)",
        overflowY: "auto" || "hidden",
        ...(mode === "dark"
        ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
        : { background: "linear-gradient(to bottom, #AA96DA, #6962AD)" }),
        padding: 5,
      }}
    >
      <Container sx={{width:'60%',maxWidth:'800px'}}>
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
            borderAxis="none"
            color="primary"
            stickyHeader
          >
            <Theader>
              <tr>
                <th style={{ width: 100 }}>No</th>
                <th style={{ width: 100 }}>Room</th>
                <th style={{ width: 100 }}>Report</th>
                <th style={{ width: 100 }}>Status</th>
                <th style={{ width: 100 }}>Date time</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </Theader>
            <Tbody>
              {renderStatusRow("Success", "success")}
              {renderStatusRow("In progress", "warning")}
              {renderStatusRow("Cancel", "danger")}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default UserReportList;

const formatTimestamp = (timestamp: string | number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
