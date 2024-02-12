import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { teamLevelsCombinedMap } from "../../../commonTypes";
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

//returns  a basic table row with just the teams information.
export const getRow = (row:GoogleSpreadsheetRow) => {
    const teamLevel = teamLevelsCombinedMap.get(row.get('teamName'));

    let displayIcon:any;
    switch (teamLevel) {
        case 'wt': 
            displayIcon = row.get('teamRank')<=15 ? <HorizontalRuleIcon /> : row.get('teamRank')<=30 ? <KeyboardArrowDownIcon /> : <KeyboardDoubleArrowDownIcon />;
            break;

        case 'pt':
            displayIcon = row.get('teamRank')<=15 ? <KeyboardArrowUpIcon /> : row.get('teamRank')<=30 ? <HorizontalRuleIcon /> : <KeyboardArrowDownIcon />;
            break;

        case 'ct':
            displayIcon = row.get('teamRank')<=15 ? <KeyboardDoubleArrowUpIcon /> : row.get('teamRank')<=30 ? <KeyboardArrowUpIcon /> : <HorizontalRuleIcon />;
            break;
        
        default:
    }

    return (
        <StyledTableRow key={row.get('teamName')} >
            <TableCell>{row.get('teamRank')}</TableCell>
            <TableCell>{displayIcon}</TableCell>
            <TableCell>{row.get('teamName')}</TableCell>
            <TableCell>{row.get('teamPoints')}</TableCell>
        </StyledTableRow>
    )
}