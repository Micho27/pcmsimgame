import { Modal, Button, FormGroup, FormControlLabel, FormControl, TextField, Divider } from "@mui/material";
import Box from '@mui/material/Box';
import React, { useEffect, useState } from "react"
import { getLogin } from '../../services/dbActions';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const loginUser = async (credentials: { username: string, password: string }) => {
    const logins=await getLogin();
    let authorize=false;

    logins.array.forEach(login => {
        if(login.username===credentials.username && login.password === credentials.password) {
            authorize=true;
        }
    });

    return authorize;
};

type Props = {
    setToken: Function;
}

const Login = (props: Props) => {
    const { setToken } = props;
    const [open, setOpen] = React.useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //function fetches uci data from database
    const fetchData = async () => {
        return await getLogin()
    };

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        }) ? 'Authorized': undefined;

        setToken(token);
    }

    return (
        <div>
            <Button onClick={handleOpen} color="inherit">Login</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <FormControl>
                        <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e => setUserName(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e => setPassword(e.target.value)} />
                        <Divider />
                        <Button onClick={handleSubmit} type='submit'>Login</Button>
                    </FormControl>
                </Box>
            </Modal>
        </div >
    );
};

export default Login;