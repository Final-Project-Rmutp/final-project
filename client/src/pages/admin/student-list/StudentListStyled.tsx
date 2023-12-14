import { styled } from '@mui/system';
import { Button, Checkbox, Table, ModalDialog,Sheet } from '@mui/joy';

export const StyledTable = styled(Table)`
  overflow: auto;
  border-radius: 20px;
  table-layout:auto;
  tbody {
    overflow: auto;
    width: 100%;
    min-width: 925px;
  }

  th,
  td {
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    padding: 5px;
  }

  th {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.background.default};
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

export const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.palette.background.default};
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.primary.main};

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const HeadStudentList = styled('div')`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  .card-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .this-btn {
      @media (max-width: 390px) {
        flex-direction: column;
      }
    }
  }
`;

export const TableContainer = styled(Sheet)`
  height: 500px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: 15px;  
  margin-top: 10px;
  padding: 20px;
  overflow: auto;
`;

export const Theader = styled('thead')`
  tr {
    th {
      z-index: 1 !important;
      text-align: center;
      padding: 10px;
    }
    td {
    }
  }
`;

export const Tbody = styled('tbody')`
  img {
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
  }
  tr {
    align-items: center;
    justify-content: center;
    th {
      padding: 10px;
      align-items: center;
      text-align: center;
      
    }
    td {
      padding: 10px;
    }
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  // Add your styles for Checkbox here
`;

export const StyledModalDialog = styled(ModalDialog)`
  // Add your styles for ModalDialog here
`;

// Continue adding styled components for other Material-UI components as needed
