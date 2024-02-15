import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { Order } from "../../../commonTypes";

export interface RiderStandingsHeader {
    riderRank:number;
    riderName:String;
    teamName: String;
    teamLevel: String;
    teamPoints: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof RiderStandingsHeader;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id:'riderRank',
        numeric: false,
        disablePadding:false,
        label:"Rank"
    },
    {
        id: 'riderName',
        numeric: false,
        disablePadding: true,
        label: 'Rider Name',
    },
    {
        id: 'teamName',
        numeric: false,
        disablePadding: true,
        label: 'Team Name',
    },
    {
        id: 'teamLevel',
        numeric: false,
        disablePadding: true,
        label: 'Team level',
    },
    {
        id: 'teamPoints',
        numeric: false,
        disablePadding: true,
        label: 'UCI Points',
    }
]

interface EnhancedTableProps {
    order: Order;
    orderBy: string;
}

const StandingsHead = (props: EnhancedTableProps) => {
    const { order, orderBy } = props;

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default StandingsHead;