import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StandingsTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>TEAMS</TableCell>
                    <TableCell>Score</TableCell>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Bingoal</TableCell>
                        <TableCell>3000000</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Jumbo</TableCell>
                        <TableCell>-100</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default StandingsTable;