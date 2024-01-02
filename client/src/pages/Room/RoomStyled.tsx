import { styled } from '@mui/system';
import { Select,Option } from '@mui/joy';
import { DateTimePicker } from '@mui/x-date-pickers';


export const DateTime = styled(DateTimePicker)`
    border-radius:20px;
    color:${({ theme }) => theme.palette.common.white};
    border-color:${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.nav.bg};

    .css-fliaa7-MuiInputBase-root-MuiOutlinedInput-root{
        border-radius:20px;
        color:${({ theme }) => theme.palette.pf.color};
    }
    .css-i4bv87-MuiSvgIcon-root{
        color:${({ theme }) => theme.palette.pf.color};
    }
`;
export const SelectStyle = styled(Select)`
    color:${({ theme }) => theme.palette.pf.color};
    background-color: ${({ theme }) => theme.palette.nav.bg};
`;
export const OptionStyle = styled(Option)`
    color:${({ theme }) => theme.palette.pf.color};
    background-color: ${({ theme }) => theme.palette.main.bg};

`;