import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type Props = {
    setToken: Function;
    token: any
}

const Header = (props: Props) => {
    const { token,setToken } = props;
    
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