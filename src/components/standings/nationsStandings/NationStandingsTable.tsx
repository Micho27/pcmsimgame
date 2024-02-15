import React, { useState, useEffect, useMemo } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { getNationStandings } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import NationsHead, { NationsHeader } from "./NationsHead";
import { Order, stableSort } from "../../../commonTypes";
import LoadingScreen from "../../LoadingScreen";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const NationStandingsTable = () => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof NationsHeader>('nationPoints');
    const [loading, setLoading] = useState(false);
    const [raceDaysData, setraceDaysData] = useState<Array<GoogleSpreadsheetRow>>([]);

    //function fetches uci data from google sheets file
    const fetchNationStandings = async () => {
        setLoading(true)

        const res: Array<GoogleSpreadsheetRow> = await getNationStandings();
        
        setraceDaysData([...res])
        setLoading(false)
    };

    useEffect(() => {
        fetchNationStandings()
    }, [])
    
    const sortedStandings = useMemo(
        () => stableSort(raceDaysData, order, orderBy),
        [order, orderBy, loading],
    );

    return (
        loading ? <LoadingScreen /> :
        <TableContainer className="standingsTableBack">
            <Table component={Paper} className='standingsTable' aria-label="customized table">
                <NationsHead />
                <TableBody>
                    {sortedStandings.map((row) =>
                        (<StyledTableRow key={row.get('nationName')} >
                            <TableCell>{row.get('nationRank')}</TableCell>
                            <TableCell>{row.get('nationName')}</TableCell>
                            <TableCell>{row.get('nationPoints')}</TableCell>
                        </StyledTableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default NationStandingsTable;
