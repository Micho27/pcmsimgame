import { useState, useEffect, useMemo } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import StandingsHead from './StandingsHead';
import { getTeamStanding } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { Order, teamLevelsCombinedMap } from "../../../commonTypes";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

export interface UciStandingsHeader {
    teamRank:number;
    tamIcon:any;
    teamName: string;
    teamPoints: number;
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

const TeamStandingsTable = () => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof UciStandingsHeader>('teamPoints');
    const [loading, setLoading] = useState(false);
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
        () => stableSort(uciStandingsData, order, orderBy),
        [order, orderBy, loading],
    );
    
    const getRow = (row:GoogleSpreadsheetRow) => {
        const teamLevel = teamLevelsCombinedMap.get(row.get('teamName'));

        let demotionIcon;
        switch (teamLevel) {
            case 'wt': 
                demotionIcon=row.get('teamRank')<=15 ? <HorizontalRuleIcon /> : row.get('teamRank')<=30 ? <KeyboardArrowDownIcon /> : <KeyboardDoubleArrowDownIcon />;
                break;

            case 'pt':
                demotionIcon=row.get('teamRank')<=15 ? <KeyboardArrowUpIcon /> : row.get('teamRank')<=30 ? <HorizontalRuleIcon /> : <KeyboardArrowDownIcon />;
                break;

            case 'ct':
                demotionIcon=row.get('teamRank')<=15 ? <KeyboardDoubleArrowUpIcon /> : row.get('teamRank')<=30 ? <KeyboardArrowUpIcon /> : <HorizontalRuleIcon />;
                break;
            
            default:
        }

        return (
            <StyledTableRow key={row.get('teamName')} >
                <TableCell>{row.get('teamRank')}</TableCell>
                <TableCell>{demotionIcon}</TableCell>
                <TableCell>{row.get('teamName')}</TableCell>
                <TableCell>{row.get('teamPoints')}</TableCell>
            </StyledTableRow>
        )
    }

    return (
        <TableContainer className="UcistandingsTableBack">
            <Table component={Paper} className='UcistandingsTable' aria-label="customized table">
                <StandingsHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {
                        sortedStandings.map((row,index) => {
                            const teamRow=getRow(row)
                            if (index === 0)
                                return <>
                                    <TableRow>
                                        <TableCell> World Tour next season</TableCell>
                                    </TableRow> 
                                    {teamRow}
                                </>

                            if(index === 15) 
                                return <>
                                    <TableRow>
                                        <TableCell> Pro Tour next season</TableCell>
                                    </TableRow> 
                                    {teamRow}
                                </>
                            
                            if(index === 30) 
                                return <>
                                    <TableRow>
                                        <TableCell> Continental Tour next season</TableCell>
                                    </TableRow> 
                                    {teamRow}
                                </>

                            return (teamRow);
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default TeamStandingsTable;
