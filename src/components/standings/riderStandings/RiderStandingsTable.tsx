import { useState, useEffect, useMemo } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import StandingsHead, { RiderStandingsHeader } from './StandingsHead';
import { getRiderStandings } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { Order } from "../../../commonTypes";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const stableSort=(array: Array<GoogleSpreadsheetRow> , order:string, sortColumn:string) => {
    return array.sort((a:GoogleSpreadsheetRow,b) => {
        return order === 'desc' ? b.get(sortColumn)-a.get(sortColumn):a.get(sortColumn)-b.get(sortColumn)
    });
};

const RiderStandingsTable = () => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof RiderStandingsHeader>('teamPoints');
    const [loading, setLoading] = useState(false);
    const [riderStandingsData, setriderStandingsData] = useState<Array<GoogleSpreadsheetRow>>([]);

    //function fetches uci data from google sheets file
    const fetchRiderStandings = async () => {
        setLoading(true)

        const res: Array<GoogleSpreadsheetRow> = await getRiderStandings();

        setriderStandingsData([...res])
        setLoading(false)
    };

    useEffect(() => {
        fetchRiderStandings()
    }, [])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof RiderStandingsHeader,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedStandings = useMemo(
        () => stableSort(riderStandingsData, order, orderBy),
        [order, orderBy, loading],
    );
        
    return (
        <TableContainer className="standingsTableBack">
            <Table component={Paper} className='standingsTable' aria-label="customized table">
                <StandingsHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {sortedStandings.map((row,index) =>
                        (<StyledTableRow key={row.get('riderName')} >
                            <TableCell>{row.get('riderRank')}</TableCell>
                            <TableCell>{row.get('riderName')}</TableCell>
                            <TableCell>{row.get('riderTeam')}</TableCell>
                            <TableCell>{row.get('riderPoints')}</TableCell>
                        </StyledTableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default RiderStandingsTable;
