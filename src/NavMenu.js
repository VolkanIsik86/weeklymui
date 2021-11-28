import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import {
    Dialog,
    DialogActions,
    DialogContent,
    Menu,
    MenuItem,
    TextField
} from "@material-ui/core";
import {AccountCircle} from "@mui/icons-material";
import {observer} from "mobx-react-lite";


function NavMenu(props){
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const store = props.store;

    const anchorMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const anchorClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleLogin = () => {
        const tempuser = {
            logged : true,
            token: null,
            username: null
        }
        store.setUser(tempuser);
        console.log(store.user.logged)
        setOpen(false);
    };
    return (

        <AppBar position="static" sx={{backgroundColor:"darkgrayda"}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Weekly
                </Typography>
                {store.user.logged ? (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={anchorMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={anchorClose}
                        >
                            <MenuItem onClick={anchorClose}>Profile</MenuItem>
                            <MenuItem onClick={anchorClose}>My account</MenuItem>
                        </Menu>
                    </div>
                ):(
                    <div>
                        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                            Login
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleLogin}>Login</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
            </Toolbar>
        </AppBar>

    );
}
export default observer(NavMenu);