import { Modal, Button, FormGroup, FormControlLabel, FormControl } from "@mui/material";
import TextField from '@mui/material/TextField';
import React from "react"

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} color="inherit">Login</Button>
            <Modal
                className="LoginModal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <form className='LoginForm'>
                    <label>
                        <p>Username</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Login;