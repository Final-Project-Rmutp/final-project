import { styled } from '@mui/system';
import { Select, Option, Sheet,Grid } from '@mui/joy';
export const DateTime = styled(Sheet)`
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.common.white};
    border-color: ${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.background.backdrop};

    width: 200px;
    height: 38px;

    .MuiInputBase-root {
        border-radius: 12px;
        height: 38px;
        color: ${({ theme }) => theme.palette.pf.color};
    }
    
    .MuiSvgIcon-root {
        // background-image: url('https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Tear-Off%20Calendar.png');
        background-size: cover;
        width: 25px;
        height: 25px;
        path {
            display: none;
        }
    }
`;

export const TimeSelect = styled(Sheet)`
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.common.white};
    border-color: ${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.background.backdrop};
    width: 200px;
    height: 38px;

    .MuiInputBase-root {
        border-radius: 12px;
        height: 38px;
        color: ${({ theme }) => theme.palette.pf.color};
    }

    .MuiSvgIcon-root {
        // background-image: url('https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Stopwatch.png');
        background-size: cover;
        width: 25px;
        height: 25px;
        path {
            display: none;
        }
    }
`;

export const SelectStyle = styled(Select)`
    width: 160px;
    border-radius: 10px;
    color: ${({ theme }) => theme.palette.pf.color};
    background-color: ${({ theme }) => theme.palette.background.backdrop};
    .MuiOption-root .Mui-expanded{
        background-color: ${({ theme }) => theme.palette.background.backdrop};
    }

`;

export const OptionStyle = styled(Option)`
    color: ${({ theme }) => theme.palette.pf.color};
    background-color: ${({ theme }) => theme.palette.background.backdrop};

`;
export const GridContainerSearch = styled(Grid)`
    color: ${({ theme }) => theme.palette.pf.color};
    background-color: ${({ theme }) => theme.palette.divider};
`;
