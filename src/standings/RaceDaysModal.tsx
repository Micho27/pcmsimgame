import { Modal,Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from "react"

const riderFunction = [{
    name: 'kenneth',
    raceDays: 69
},
{
    name: 'joe',
    raceDays: 420
}];

const RaceDaysModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div>
            <Button onClick={handleOpen}>Bingoal</Button>
            <Modal 
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Riders</TableCell>
                            <TableCell>race Days</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{riderFunction[0].name}</TableCell>
                                <TableCell>{riderFunction[0].raceDays}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{riderFunction[1].name}</TableCell>
                                <TableCell>{riderFunction[1].raceDays}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Modal>
        </div>
    );
};

export default RaceDaysModal;