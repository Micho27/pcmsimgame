import { useEffect, useMemo, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Order } from "../../../commonTypes";
import LoadingScreen from "../../LoadingScreen";
import { RiderStandingsHeader } from "../../standings/riderStandings/RiderStandingsHead";
import { StyledTableRow } from "../../standings/teamStandings/TeamUtils";
import { TableCell } from "@mui/material";
import ResultsHead from "./ResultsHead";

interface ResultsTableProps {
    data:Array<any>;
    detailed?:boolean;
};

const ResultsTable = (props:ResultsTableProps) => {
    const { data, detailed} = props;
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof RiderStandingsHeader>('teamPoints');
    const [loading, setLoading] = useState(false);
    
    useMemo(() => {
        setLoading(true);
        setLoading(false);
    },[detailed]);

    return (
        loading ? <LoadingScreen /> :
        <>
            <TableContainer sx={{zIndex:-1}} className="standingsTableBack">
                <Table component={Paper} className='standingsTable' aria-label="customized table">
                    <ResultsHead 
                        order={order}
                        orderBy={orderBy}
                        tttStage
                    />
                    <TableBody>
                        {
                            data.map((row,index) => {
                                return (
                                    <StyledTableRow>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{row.rider}</TableCell>
                                        <TableCell>{row.team}</TableCell>
                                        <TableCell>{row.points}</TableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};

export default ResultsTable;
