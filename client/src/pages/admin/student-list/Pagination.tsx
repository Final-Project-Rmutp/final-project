import React from 'react';
import { Button, Stack, Typography } from '@mui/joy';

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

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRowsPerPageChange(Number(event.target.value));
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography>
        Page {page} of {totalPages}
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
      <Typography>Rows per page:</Typography>
      <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
        {[5, 10, 25].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Stack>
  );
};

export default CustomPagination;
