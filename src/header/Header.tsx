import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {    
    return (
        <AppBar className='pageheader' position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    PCM Sim Game
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default Header;