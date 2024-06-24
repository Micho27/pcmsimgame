import { useState, useEffect, useMemo } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import StandingsHead from './StandingsHead';
import { getTeamStanding } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { Order, TeamLevels, stableSort } from "../../../commonTypes";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { getRow } from "./TeamUtils";
import LoadingScreen from "../../LoadingScreen";
import { LevelFilter } from "../LevelFilter";

export interface UciStandingsHeader {
    teamRank:number;
    teamIcon:any;
    teamName: string;
    teamPoints: number;
}

interface TitleProps {
    text:string;
}

const TitleRow = (props:TitleProps) => {
    const {text} = props;
    return (
        <TableRow>
            <TableCell colSpan={4} align="center" sx={{color:'white'}} className="TitleRow">{text}</TableCell>
        </TableRow> 
    )
}

const TeamStandingsTable = () => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof UciStandingsHeader>('teamPoints');
    const [loading, setLoading] = useState(false);
    const [filter, setFilter]=useState<TeamLevels>('All')
    const [uciStandingsData, setuciStandingsData] = useState<Array<GoogleSpreadsheetRow>>([]);

    //function fetches uci data from google sheets file
    const fetchTeamStandings = async () => {
        setLoading(true)

        const res: Array<GoogleSpreadsheetRow> = await getTeamStanding();

        setuciStandingsData([...res])
        setLoading(false)
    };

    useEffect(() => {
        fetchTeamStandings()
    }, [])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof UciStandingsHeader,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedStandings = useMemo(
        () => stableSort(uciStandingsData, order, orderBy, filter,'teamName'),
        [order, orderBy, loading,filter],
    );
    
    return (
        loading ? <LoadingScreen /> :
        <div className="tableBack">
            <LevelFilter setFilter={setFilter} />
            <TableContainer>
                <Table component={Paper} aria-label="customized table">
                    <StandingsHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {   
                            sortedStandings.map((row,index) => {
                                const defaultRow = getRow(row);
                                
                                if(filter === 'All') {
                                    // world tour title for following season
                                    if (row.get('teamRank') === '1') {
                                        return order === 'desc' ?
                                            <>
                                                <TitleRow text='World Tour next season' />
                                                {defaultRow}
                                            </> :
                                            <>
                                                {defaultRow}
                                            </>;
                                    }

                                    // pro tour title for following season
                                    if(row.get('teamRank') === '16') {
                                        return order === 'desc' ?
                                            <>
                                                <TitleRow text='Pro Tour next season' />
                                                {defaultRow}
                                            </> :
                                            <>
                                                {defaultRow}
                                                <TitleRow text='World Tour next season' />
                                            </>;
                                    }

                                    // cont tour title for following season                            
                                    if(row.get('teamRank') === '31') {
                                        return order === 'desc' ?
                                            <>
                                                <TitleRow text='Continental Tour next season' />
                                                {defaultRow}
                                            </> :
                                            <>
                                                {defaultRow}
                                                <TitleRow text='Pro Tour next season' />
                                            </>;
                                    }

                                    if(order == 'asc' && index === 0 ) {
                                        return (<>
                                            <TitleRow text='Continental Tour next season' />
                                            {defaultRow}
                                        </>);
                                    }
                                }
                                return (defaultRow);
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div> 
    )
};

export default TeamStandingsTable;
