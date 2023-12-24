import { styled } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';


export const DateTime = styled(DateTimePicker)`
    background-color: ${({ theme }) => theme.palette.main.bg};
    color:${({ theme }) => theme.palette.nav.color};
`;