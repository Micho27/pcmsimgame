import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './Login';
import Drawer from '../raceResultsHandler/Drawer';

const Header = () => {
    return (
        <AppBar className='pageheader' position="static">
            <Toolbar>
                <Drawer />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    PCM Sim Game
                </Typography>
                <Login />
            </Toolbar>
        </AppBar>
    )
};

export default Header;