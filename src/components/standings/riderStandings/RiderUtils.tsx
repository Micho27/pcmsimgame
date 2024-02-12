import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { styled } from '@mui/material/styles';
import { teamLevelsCombinedMap } from '../../../commonTypes';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const getRiderRow = (row:GoogleSpreadsheetRow) => {
    const teamLevel=teamLevelsCombinedMap.get(row.get('riderTeam'));

    return (
        <StyledTableRow key={row.get('riderName')} >
            <TableCell>{row.get('riderRank')}</TableCell>
            <TableCell>{row.get('riderName')}</TableCell>
            <TableCell>{row.get('riderTeam')}</TableCell>
            <TableCell>{ teamLevel }</TableCell>
            <TableCell>{row.get('riderPoints')}</TableCell>
        </StyledTableRow>)
}