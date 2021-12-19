import React from "react";
import {
    Box,
    createTheme,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    ThemeProvider
} from "@mui/material";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Timer from "./timer2/Timer";
import './timer2/flipdown.css'
import {timerStore} from "./stores/TimerStore";
import {observer} from "mobx-react-lite";
import {userStore} from "./stores/UserStore";
import {AddCircleOutlined} from "@mui/icons-material";
function Home(){
    const [value, setValue] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
<Box sx={{m:3}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Card sx={{ minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
                            Gubi
                        </Typography>
                        <Timer />
                    </CardContent>
                    <CardActions>
                        {userStore.user.logged ? <Button variant="contained" onClick={() => timerStore.updateTime()}>Mad</Button> : <Button variant="contained" disabled>Mad</Button> }
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>

                <Button variant="contained"  onClick={handleClickOpen} endIcon={<AddCircleOutlined />}>
                    Tilføj Todo
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Tilføj en todo i listen:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Vælg Dato"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="beskrivelse"
                            label="beskrivelse"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Tilføj</Button>
                    </DialogActions>
                </Dialog>

            </Grid>
        </Grid>
</Box>
    );

}
export default observer(Home);