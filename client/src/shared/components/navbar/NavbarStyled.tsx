import { styled } from '@mui/system';

import { Sheet,Card } from '@mui/joy';



export const Layout = styled(Sheet)`
  background-color: ${({ theme }) => theme.palette.main.bg};
`;

export const Main = styled(Sheet)`
  background-color: ${({ theme }) => theme.palette.main.bg};
`;

export const Left = styled(Sheet)`
  background-color: ${({ theme }) => theme.palette.main.bg};
`;

export const Header = styled(Sheet)`
  padding:20px;
  background-color: ${({ theme }) => theme.palette.nav.bg};
  border:1px solid;
  border-color:${({ theme }) => theme.palette.nav.color};
`;

export const Sidebar = styled(Card)`
  background-color: ${({ theme }) => theme.palette.nav.bg};
  border:1px solid;
  border-color:${({ theme }) => theme.palette.nav.color};
`;
export const CardStyle = styled(Card)`
  background-color: ${({ theme }) => theme.palette.main.bg};
  border-color:${({ theme }) => theme.palette.nav.color};

`;
