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

export const HeadList = styled('div')`
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
  height: 100%;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.main.bg};
  border-radius: 15px;  
  margin-top: 10px;
  padding: 20px;

`;

export const Theader = styled('thead')`
tr {
  th {
    position: sticky;
    left: 0;
    z-index: 2 !important;
    text-align: center;
    padding: 10px;
    border: none !important;
  }
  td {
    z-index: 1 !important;
  }
}
`;

export const Tbody = styled('tbody')`
 img {
    display: flex;
    align-items: center;
  }
  tr {
    align-items: center;
    justify-content: center;
    th {
      position: sticky;
      left: 0;
      padding: 10px;
      align-items: center;
      text-align: center;
      vertical-align: middle;
      font-weight: 500;
    }
  }
`;
export const StyledCheckbox = styled(Checkbox)`
  // Add your styles for Checkbox here
`;

export const StyledModalDialog = styled(ModalDialog)`
  // Add your styles for ModalDialog here
`;

export const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

