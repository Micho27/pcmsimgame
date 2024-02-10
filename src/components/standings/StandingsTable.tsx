import React, { useState, useEffect } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import RaceDaysModal from '../RaceDaysModal';
import StandingsHead from './StandingsHead';
import { getUCIStandings } from '../../services/dbActions';
import { GoogleSpreadsheetRow } from "google-spreadsheet";


export interface Data {
    teamName: string;
    teamPoints: number;
}

export type Order = 'asc' | 'desc';

type uciStandings = {
    teams: string,
    points: number;
}

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

const StandingsTable = () => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Data>('teamPoints');
    const [loading, setLoading] = useState(false);
    const [uciStandingsData, setuciStandingsData] = useState<Array<GoogleSpreadsheetRow>>([]);

    //function fetches uci data from database
    const fetchTeamStandings = async () => {
        setLoading(true)

        const res: Array<GoogleSpreadsheetRow> = await getUCIStandings();

        setuciStandingsData([...res])
        setLoading(false)
    };

    useEffect(() => {
        fetchTeamStandings()
    }, [])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedStandings = React.useMemo(
        () => stableSort(uciStandingsData, order, orderBy),
        [order, orderBy, loading],
    );
        
    return (
        <TableContainer sx={{ marginTop: 5 }} className="standingsTableBack">
            <Table component={Paper} className='standingsTable' aria-label="customized table">
                <StandingsHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {sortedStandings.map((row) =>
                        (<StyledTableRow key={row.get('teamName')} >
                            <TableCell>{row.get('teamName')}</TableCell>
                            <TableCell>{row.get('teamPoints')}</TableCell>
                        </StyledTableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default StandingsTable;
