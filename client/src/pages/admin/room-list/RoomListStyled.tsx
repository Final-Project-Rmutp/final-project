import styled from "styled-components";
export const StyledTable = styled.table`
  overflow: auto;
  min-width: 925px;
  border-radius: 20px;

  tbody {
    overflow: auto;
    width: 100%;
    min-width: 925px;
  }

  th,
  td {
    border: 2px solid red;
    padding: 5px;
  }

  th {
    background-color: rgb(87, 90, 87);
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

export const StyledButton = styled.button`
  color: white;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

export const HeadStudentList = styled.div`
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

export const TableContainer = styled.div`
  height: 520px;
  border: 1px solid rgb(41, 42, 41);
  background-color: white;
  border-radius:15px;
  margin-top: 10px;
  padding: 20px;
  overflow:auto;
`;

export const Theader = styled.thead`
  tr {
    th{
      z-index:1 !important;
      text-align:center;
      padding:10px;
    }
    td{
    }
  }
`;

export const Tbody = styled.tbody`
img{
  display:flex;
  aling-items:center;
  width:40px;
  height:40px
}
  tr {
    align-items:center;
    justify-content:center;
    th{
      padding:10px;
    }
    td{
      padding:10px;
    }
  }
`