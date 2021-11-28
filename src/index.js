import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {HashRouter} from "react-router-dom";
import {createTheme} from "@material-ui/core";
import {userStore} from "./stores/UserStore";

const theme = createTheme({
    palette: {
        type: "dark",
    }
});



ReactDOM.render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                    <App store={userStore} />
            </HashRouter>
        </ThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
