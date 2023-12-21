import React from "react";
import { Button, Stack, Typography, Select, Option } from "@mui/joy";

interface CustomPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleRowsPerPageChange = (value: number) => {
    onRowsPerPageChange(value);
  };

  return (
    <Stack
    direction={{ xs:'column',sm:'row'}}
    spacing={{ xs: 1, sm: 2, md: 4 }}
    alignItems="center"
      sx={{ marginTop: 2 }}
    >
      <Typography>
        Page {page} of {totalPages}
      </Typography>
      <Button
        variant="solid"
        color="primary"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="solid"
        color="primary"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
      <Typography>Rows per page:</Typography>
      <Select
        value={rowsPerPage}
        onChange={(_, value) => handleRowsPerPageChange(value as number)}
      >
        {[5, 10, 25].map((option) => (
          <Option key={option} value={option}>
            <Typography>{option}</Typography>
          </Option>
        ))}
      </Select>
    </Stack>
  );
};

export default CustomPagination;
