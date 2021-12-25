import * as React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import {observer} from "mobx-react-lite";
import NavMenu from "./NavMenu";
import {Box} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from "@mui/material/IconButton";

function App(props) {
    //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [thememode,setThememode] = React.useState('light');
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: thememode,
                },
            }),
        [thememode],
    );
    function changeTheme(){
        if(thememode === 'light'){
            setThememode('dark')
        }else{
            setThememode('light')
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Box sx={{flexGrow: 1}}>
            <NavMenu store={props.store}/>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flexstart',
                    position: 'relative'
                }}
            >
            <IconButton sx={{ ml: 1, position: "absolute", top: "-50px", left:"90px" }} onClick={changeTheme}>
                {thememode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            </Box>
            <Switch>
                <Route exact path={"/"} component={Home}/>
                <Route render={() => <h1>404</h1>}/>
            </Switch>
        </Box>
        </ThemeProvider>
    );
}

export default observer(App);
