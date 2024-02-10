import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface RaceDaysHeader {
    riderName: string;
    teamName: string;
    raceDays: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof RaceDaysHeader;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id:'teamName',
        numeric: false,
        disablePadding:false,
        label:"Team Name"
    },
    {
        id: 'riderName',
        numeric: false,
        disablePadding: true,
        label: 'Rider Name',
    },
    {
        id: 'raceDays',
        numeric: false,
        disablePadding: true,
        label: 'Total race Days',
    }
]

const RaceDaysHead = () => {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default RaceDaysHead;