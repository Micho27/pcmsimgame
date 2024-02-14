import React from "react"
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { Order } from "../../../../commonTypes";

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id:'position',
        numeric: false,
        disablePadding:false,
        label:"Position"
    },
    {
        id:'rider',
        numeric: false,
        disablePadding:false,
        label:"Rider"
    },
    {
        id:'team',
        numeric: false,
        disablePadding:false,
        label:"Team"
    },
    {
        id:'points',
        numeric: false,
        disablePadding:false,
        label:"Uci Points"
    },
]

interface EnhancedTableProps {
    order: Order;
    orderBy: string;
    tttStage: boolean;
}

const ResultsHead = (props: EnhancedTableProps) => {
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

export default ResultsHead;