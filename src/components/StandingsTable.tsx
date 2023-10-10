import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RaceDaysModal from './RaceDaysModal';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const uciStandingsData = [{team:'bingoal',points:30000,averageAge:24},
{team:'jumbo',points:-100,averageAge:58},
{team:'ef education',points:30000,averageAge:24},
{team:'ineos',points:-30,averageAge:58}
];

const StandingsTable = () => {
    return (
        <TableContainer className="standingsTableBack">
            <Table component={Paper} className='standingsTable' aria-label="customized table">
                <TableHead>
                    <TableCell>TEAMS</TableCell>
                    <TableCell>Score</TableCell>
                </TableHead>
                <TableBody>
                    {uciStandingsData.map((row)=>(
                        <StyledTableRow key={row.team} >
                            <TableCell><RaceDaysModal>{row.team}</RaceDaysModal></TableCell>
                            <TableCell>{row.points}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default StandingsTable;
