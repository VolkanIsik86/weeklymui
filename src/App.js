import * as React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import {observer} from "mobx-react-lite";
import NavMenu from "./NavMenu";
import {Box} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Box sx={{flexGrow: 1}}>
            <NavMenu store={props.store}/>
            <Switch>
                <Route exact path={"/"} component={Home}/>
                <Route render={() => <h1>404</h1>}/>
            </Switch>
        </Box>
        </ThemeProvider>
    );
}

export default observer(App);
