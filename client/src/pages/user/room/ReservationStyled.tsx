import { styled } from '@mui/system';
import { Select,Option, Sheet } from '@mui/joy';


export const DateTime = styled(Sheet)`
    border-radius:8px;
    color:${({ theme }) => theme.palette.common.white};
    border-color:${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.nav.bg};
    width:180px;
    height:38px;

    .css-fliaa7-MuiInputBase-root-MuiOutlinedInput-root{
        border-radius:8px;
        height:38px;
        color:${({ theme }) => theme.palette.pf.color};
    }
    .css-i4bv87-MuiSvgIcon-root{
        color:${({ theme }) => theme.palette.pf.color};
    }
`;
export const SelectStyle = styled(Select)`
    width:160px;
    color:${({ theme }) => theme.palette.pf.color};
    background-color: ${({ theme }) => theme.palette.nav.bg};
`;
export const OptionStyle = styled(Option)`
    color:${({ theme }) => theme.palette.pf.color};
    background-color: ${({ theme }) => theme.palette.main.bg};

`;