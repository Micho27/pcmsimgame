import { useState, useEffect, useMemo } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import StandingsHead, { RiderStandingsHeader } from './RiderStandingsHead';
import { getRiderStandings } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { Order, stableSort } from "../../../commonTypes";
import { getRiderRow } from "./RiderUtils";

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
                    {sortedStandings.map((row) =>
                        getRiderRow(row)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default RiderStandingsTable;
