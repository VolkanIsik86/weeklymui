import React from "react";
import {
    Box,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, Paper, Popover,
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
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Home() {
    const [value, setValue] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const pophandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const pophandleClose = () => {
        setAnchorEl(null);
    };

    const popopen = Boolean(anchorEl);
    const popid = open ? 'simple-popover' : undefined;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const beskrivelse = data.get("beskrivelse");
        let date = value.getDate()+"."+(value.getMonth()+1)+"."+value.getFullYear();
        console.log(date)
        console.log(beskrivelse);
        setOpen(false);
        //TODO: Control for null og implementere resten
    }

    function editTask (task) {
      console.log(task)
        //TODO: denne skal implementeres
    }
    function deleteTask (task) {
        console.log(task)
        //TODO: denne skal implementeres
    }

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
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    m:3
                }}>
                    <Typography variant="h4" sx={{color: "gray"}}>
                        Uge {weekStore.week.weekNr}
                    </Typography>
                    <Button sx={{ml: 3}} variant="contained" onClick={handleClickOpen} endIcon={<AddCircleOutlined/>}>
                        Tilføj Todo
                    </Button>
                </Box>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Tilføj en todo:</DialogTitle>
                    <DialogContent>

                            <Box sx={{m: 1}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                                    <DatePicker
                                        label="Vælg Dato"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>

                        <Box sx={{m: 1}} component="form" onSubmit={handleSubmit} noValidate>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="beskrivelse"
                                name="beskrivelse"
                                label="Beskrivelse"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    mt:1
                                }}
                            >
                            <Button type="submit" >Tilføj</Button>
                            <Button onClick={handleClose}>Annullere</Button>
                            </Box>
                        </Box>
                    </DialogContent>

                </Dialog>

                <div className="weekgrid">
                    {weekStore.week.days.map((day) =>
                        <Paper key={day.name} sx={{
                            height: "500px",
                            width: "100%",
                            overflow: "auto"
                        }}>
                            <Typography align="center" sx={{padding: "5px", color: "gray"}}>
                                {day.name} <br/> {day.date}
                            </Typography>

                            <Box sx={{

                            }}>
                                {day.toDos.map((todo)=>
                                    <div>
                                    <Paper key={todo.id} sx={{m: 1, p: 1, width: "90%"}} elevation={3} onClick={pophandleClick}>
                                        <Typography align="left" sx={{color: "gray"}}>
                                            {todo.task}
                                        </Typography>
                                    </Paper>
                                        <Popover
                                            id={popid}
                                            open={popopen}
                                            anchorEl={anchorEl}
                                            onClose={pophandleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <IconButton aria-label="edit" onClick={() => editTask(todo.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => deleteTask(todo.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Popover>
                                    </div>
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