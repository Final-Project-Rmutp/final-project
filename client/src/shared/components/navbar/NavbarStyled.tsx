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
  padding:0 !important;
  .icon{
    left:-40px !important;
    top:-30px !important;
  }
  &.open {
    .icon{
      top:-40px !important;
      left:230px !important;
    }
  }
`;

export const Header = styled(Sheet)`
  z-index:3;
  padding:20px;
  border-bottom:1px solid;
  border-color:${({ theme }) => theme.palette.danger.outlinedDisabledBorder};
  background-color: ${({ theme }) => theme.palette.nav.navSide};
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  position: fixed;
  z-index: 2;
  padding: 8px 16px;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 10, 0.18);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter:blur(10px);
  border-color: rgba(197, 202, 233, 0.08);
  border-width: 1px 0px ;
`;

export const Sidebar = styled(Card)`.
  z-index:0;
  border:1px solid;
  border-color:${({ theme }) => theme.palette.danger.outlinedDisabledBorder};
  border-radius:0;
  background-color: ${({ theme }) => theme.palette.nav.navSide};
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  position: fixed;
  z-index: 2;
  padding: 8px 16px;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0 8px 32px 2px rgba(0, 0, 10, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter:blur(10px);
  border-color: rgba(197, 202, 233, 0.08);
  border-width: 1px 0px ;

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