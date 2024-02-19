import { styled } from '@mui/system';

import { Sheet,Card,IconButton,Menu,MenuItem } from '@mui/joy';



export const Layout = styled(Sheet)`
background-color: ${({ theme }) => theme.palette.background.backdrop};
background-size: cover;
background-position: center;
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
height:4.5rem;
background-color: ${({ theme }) => theme.palette.userNav.bg};
width: 100%;
display:flex;
justicy-content:center;
align-items:center;
box-sizing: border-box;
flex-shrink: 0;
position: fixed;
z-index: 3;
padding: 8px 16px;
transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
box-shadow: 0 0px 30px 0 rgba(0, 0, 0,  0.4);
backdrop-filter: blur(10px);
-webkit-backdrop-filter:blur(10px);
border-color: rgba(197, 202, 233, 0.08);
border-width: 1px 0px ;
`;

export const Sidebar = styled(Card)`.
height:4.5rem;
background-color: ${({ theme }) => theme.palette.userNav.bg};
width: 100%;
display:flex;
justicy-content:center;
align-items:center;
box-sizing: border-box;
flex-shrink: 0;
position: fixed;
padding: 8px 16px;
box-shadow: 0 60px 30px -5px rgba(0, 0, 0,  0.5);
backdrop-filter: blur(10px);
-webkit-backdrop-filter:blur(10px);
border-color: rgba(197, 202, 233, 0.09);
border-width: 1px 0px ;
// border-right:1px solid;
border-radius:0;
`;
export const CardStyle = styled(Card)`
background-color: transparent;
border:none;
cursor:pointer;

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
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction: row;
  gap:5px;
  padding:10px;
  `
export const MenuItemContainer = styled(MenuItem)`
  background-color: ${({ theme }) => theme.palette.menu.bg};

  `