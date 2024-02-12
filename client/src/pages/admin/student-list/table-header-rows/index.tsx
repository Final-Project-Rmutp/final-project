import {
  Checkbox,
  Input,
} from "@mui/joy";

import {
  Theader,
} from "../StudentListStyled";

export const TableHeaderRows: React.FC<{searchTerm: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, selectAll: boolean, handleSelectAll: () => void }> = ({searchTerm, handleChange, selectAll, handleSelectAll}) => (
  <Theader>
  <tr>
    <th style={{ width: 50 }}>No</th>
    <th style={{ width: 80 }}>IMG</th>
    <th style={{ width: 150 }}>FirstName</th>
    <th style={{ width: 150 }}>LastName</th>
    <th style={{ width: 200 }}>ID Card</th>
    <th style={{ width: 200 }}>Student ID</th>
    <th style={{ width: 150 }}>Account Type</th>
    <th style={{ width: 100 }}>Actions</th>
    <th style={{ width: 200 }}>Active</th>
  </tr>
  <tr>
    <th></th>
    <th></th>
    <th colSpan={4}>
      <Input
        disabled={false}
        size="md"
        placeholder="Find data here..."
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
    </th>
    <th></th>
    <th>
      <Checkbox
        checked={selectAll}
        onChange={handleSelectAll}
        color="primary"
      />
    </th>
    <th></th>
  </tr>
</Theader>
);