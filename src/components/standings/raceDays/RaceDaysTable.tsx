import React, { useState, useEffect } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { getRaceDays } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import RaceDaysHead from "./RaceDaysHead";
import LoadingScreen from "../LoadingScreen";

interface RaceDaysTableProps {
    level:string;
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

const RaceDaysTable = (props:RaceDaysTableProps) => {
    const { level } = props;
    const [loading, setLoading] = useState(false);
    const [raceDaysData, setraceDaysData] = useState<Array<GoogleSpreadsheetRow>>([]);

    //function fetches uci data from google sheets file
    const fetchRiderRaceDays = async () => {
        setLoading(true)

        const res: Array<GoogleSpreadsheetRow> = await getRaceDays(level);
        
        setraceDaysData([...res])
        setLoading(false)
    };

    useEffect(() => {
        fetchRiderRaceDays()
    }, [])
        
    return (
        loading ? <LoadingScreen /> :
        <TableContainer className="standingsTableBack">
            <Table component={Paper} className='standingsTable' aria-label="customized table">
                <RaceDaysHead
                />
                <TableBody>
                    {raceDaysData.map((row,index) =>
                        (<StyledTableRow key={row.get('riderName')} >
                            <TableCell>{row.get('teamName')}</TableCell>
                            <TableCell>{row.get('riderName')}</TableCell>
                            <TableCell>{row.get('raceDays')}</TableCell>
                        </StyledTableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default RaceDaysTable;
