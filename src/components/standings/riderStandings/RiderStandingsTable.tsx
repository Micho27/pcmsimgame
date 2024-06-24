import { useState, useEffect, useMemo } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import StandingsHead, { RiderStandingsHeader } from './RiderStandingsHead';
import { getRiderStandings } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { Order, TeamLevels, stableSort } from "../../../commonTypes";
import { getRiderRow } from "./RiderUtils";
import LoadingScreen from "../../LoadingScreen";
import { LevelFilter } from "../LevelFilter";

const RiderStandingsTable = () => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof RiderStandingsHeader>('teamPoints');
    const [filter, setFilter]=useState<TeamLevels>('All')
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

    const sortedStandings = useMemo(
        () => stableSort(riderStandingsData, order, orderBy,filter,'riderTeam'),
        [order, loading, filter],
    );
    
    return (
        loading ? <LoadingScreen /> :
        <>
            <LevelFilter setFilter={setFilter} />
            <TableContainer sx={{zIndex:-1}} className="standingsTableBack">
                <Table component={Paper} className='standingsTable' aria-label="customized table">
                    <StandingsHead
                        order={order}
                        orderBy={orderBy}
                    />
                    <TableBody>
                        {sortedStandings.map((row) =>
                            getRiderRow(row)
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};

export default RiderStandingsTable;
