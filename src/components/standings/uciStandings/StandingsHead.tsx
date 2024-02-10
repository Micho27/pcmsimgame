import React from "react"
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { UciStandingsHeader } from './UciStandingsTable';
import { Order } from "../../../commonTypes";

interface HeadCell {
    disablePadding: boolean;
    id: keyof UciStandingsHeader;
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
        id: 'teamName',
        numeric: false,
        disablePadding: true,
        label: 'Team Name',
    },
    {
        id: 'teamPoints',
        numeric: false,
        disablePadding: true,
        label: 'UCI Points',
    }
]

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UciStandingsHeader) => void;
    order: Order;
    orderBy: string;
}

const StandingsHead = (props: EnhancedTableProps) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
        (property: keyof UciStandingsHeader) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

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
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default StandingsHead;