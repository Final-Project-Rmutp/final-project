
import { Box, Breadcrumbs, Card, Sheet,Menu } from '@mui/joy';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';


export const HeaderNav = styled(Sheet)`
    height:4.5rem;
    background-color: ${({ theme }) => theme.palette.userNav.bg};
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
    position: fixed;
    z-index: 3;
    padding: 8px 16px;
    transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0,  0.10);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter:blur(10px);
    border-color: rgba(197, 202, 233, 0.08);
    border-width: 1px 0px ;
`;
export const SidebarUser = styled(Card)`
    background-color: ${({ theme }) => theme.palette.userNav.bg};
    backdrop-filter: blur(10rem);
    -webkit-backdrop-filter:blur(10rem);
    border-color: rgba(197, 202, 233, 0.08);
    border-width: 1px 0px ;
    padding:none;
`;
export const MenuContainer = styled(Menu)`
  background-color: ${({ theme }) => theme.palette.menu.bg};
  color:${({ theme }) => theme.palette.nav.color};
  `
export const LeftUser = styled(Sheet)`
  background-color: ${({ theme }) => theme.palette.background.backdrop};
  padding:0 !important;
  .icon{
    left:-40px !important;
    top:-30px !important;
  }
  &.open {
    width:0 !important;
    .icon{
      top:-40px !important;
      left:230px !important;
    }
  }
`;
export const MenuItemsNav = styled(Breadcrumbs) `
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const IconButtonUser = styled(Box)`
  cursor:pointer;
  font-size:1.25rem;
  `;
  
export const CardStyleUser = styled(Card)`
  background-color: transparent;
  border:none;
  cursor:pointer;
`;

export const LayoutUser = styled(Sheet)`
  background-color: ${({ theme }) => theme.palette.main.bgStyle};
  background-size: cover;
  background-position: center;
`;
export const MenuItemLinksNav = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  font-size: 18px;
  text-decoration: none;
  color: #D0D5DC;
  transition: all 0.2s ease;
  border-radius: 20px;

  &:hover {
    .MuiTypography-root {
      color:${({ theme }) => theme.palette.main.bgStyle};
    }
  }
`;