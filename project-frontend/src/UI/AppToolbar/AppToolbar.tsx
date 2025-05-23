import {AppBar, Container, styled, Toolbar, Typography} from '@mui/material';
import { NavLink } from 'react-router-dom';



const LinkCustom = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});



const AppToolbar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <LinkCustom to="/">News</LinkCustom>
                    </Typography>
                </Container>
            </Toolbar>
        </AppBar>
    );

};



export default AppToolbar;