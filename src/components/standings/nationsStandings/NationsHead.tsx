import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export interface NationsHeader {
    nationRank: string;
    nationName: string;
    nationPoints: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof NationsHeader;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id:'nationRank',
        numeric: false,
        disablePadding:false,
        label:"Rank"
    },
    {
        id: 'nationName',
        numeric: false,
        disablePadding: true,
        label: 'Nation',
    },
    {
        id: 'nationPoints',
        numeric: false,
        disablePadding: true,
        label: 'Points',
    }
]

const NationsHead = () => {
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

export default NationsHead;