import { styled } from '@mui/system';

import { Sheet,Card,IconButton,Menu,MenuItem } from '@mui/joy';



export const Layout = styled(Sheet)`
  background-color: ${({ theme }) => theme.palette.main.bg};
`;

export const Main = styled(Sheet)`
  background-color: ${({ theme }) => theme.palette.background.backdrop};
`;

export const Left = styled(Sheet)`
  background-color: ${({ theme }) => theme.palette.background.backdrop};
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
export const IconButtonHeader = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.common.white};
  &:hover {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
  `
export const MenuContainer = styled(Menu)`
  background-color: ${({ theme }) => theme.palette.menu.bg};
  color:${({ theme }) => theme.palette.nav.color};
  `
export const MenuItemContainer = styled(MenuItem)`
  background-color: ${({ theme }) => theme.palette.menu.bg};

  `