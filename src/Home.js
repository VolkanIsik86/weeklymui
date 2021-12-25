import React from "react";
import {
    Box,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, Paper,
    TextField,
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
import {weekStore} from "./stores/WeekStore";
import deLocale from 'date-fns/locale/da';

function Home() {
    const [value, setValue] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{m: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{minWidth: 275}}>
                        <CardContent>
                            <Typography sx={{fontSize: 28}} color="text.secondary" gutterBottom>
                                Gubi
                            </Typography>
                            <Timer/>
                        </CardContent>
                        <CardActions>
                            {userStore.user.logged ?
                                <Button variant="contained" onClick={() => timerStore.updateTime()}>Mad</Button> :
                                <Button variant="contained" disabled>Mad</Button>}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>
            <Box sx={{mt: 2}}>
                <Button sx={{mb: 2}} variant="contained" onClick={handleClickOpen} endIcon={<AddCircleOutlined/>}>
                    Tilføj Todo
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Tilføj en todo i listen:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Box sx={{m: 1}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                                    <DatePicker
                                        label="Vælg Dato"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        mask={'__.__.____'}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </DialogContentText>
                        <Box sx={{m: 1}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="Beskrivelse"
                                label="Beskrivelse"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Tilføj</Button>
                    </DialogActions>
                </Dialog>

                <div className="weekgrid">
                    {weekStore.week.days.map((day) =>
                        <Paper key={day.name} sx={{
                            height: "500px",
                            width: "100%",

                        }}>
                            <Typography align="center" sx={{padding: "5px", color: "gray"}}>
                                {day.name} <br/> {day.dato}
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                {day.todos.map((todo)=>
                                    <Paper key={todo.dato} sx={{m: 1, p: 1, width: "90%"}} elevation={3}>
                                        <Typography align="center" sx={{color: "gray"}}>
                                            {todo.beskrivelse}
                                        </Typography>
                                    </Paper>
                                )}
                            </Box>
                        </Paper>
                    )}
                </div>
            </Box>
        </Box>
    );

}

export default observer(Home);