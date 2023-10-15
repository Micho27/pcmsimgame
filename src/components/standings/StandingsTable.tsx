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
import { debug } from "console";


export interface Data {
    teams: string;
    points: number;
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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const StandingsTable = () => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Data>('points');
    const [loading, setLoading] = useState(false);
    const [uciStandingsData, setuciStandingsData] = useState<Array<uciStandings>>([]);

    //function fetches uci data from database
    const fetchData = async () => {
        setLoading(true)

        const res: Array<uciStandings> = await getUCIStandings()

        setuciStandingsData([...res])
        setLoading(false)
    };

    useEffect(() => {
        fetchData()
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
        () => stableSort(uciStandingsData, getComparator(order, orderBy)),
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
                    {sortedStandings.map((row) => (
                        <StyledTableRow key={row.teams} >
                            <TableCell>
                                <RaceDaysModal>{row.teams}</RaceDaysModal>
                            </TableCell>
                            <TableCell>{row.points}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default StandingsTable;
