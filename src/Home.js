import React from "react";
import {
    Box,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, Menu, MenuItem, Paper, Popover, Snackbar,
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
import {Add, AddCircleOutlined} from "@mui/icons-material";
import {weekStore} from "./stores/WeekStore";
import deLocale from 'date-fns/locale/da';
import MuiAlert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Home() {




    //Date value
    const [value, setValue] = React.useState(null);

    //Dateedit value
    const [editvalue, editsetValue] = React.useState(null);


    //Snackbar
    const [snackMessage,setSnackMessage] = React.useState(null);
    const [snackType,setSnackType] = React.useState(null);
    const [snackopen, snacksetOpen] = React.useState(false);

    const snackhandleClick = () => {
        snacksetOpen(true);
    };

    const snackhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        snacksetOpen(false);
    };


    //Dialog for to do
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Dialog for to do2
    const [editopen, editsetOpen] = React.useState(false);
    const [editmessage,seteditmessage] = React.useState(null);
    const [editid,seteditid] = React.useState(null);
    const edithandleClickOpen = (date,id,message) => {
        //editsetValue(date)

        const datearray = date.split(".");
        const d = new Date(datearray[2],(datearray[1]-1),datearray[0]);
        editsetValue(d);
        seteditmessage(message);
        seteditid(id);
        editsetOpen(true);
    };

    const edithandleClose = () => {
        editsetOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const beskrivelse = data.get("beskrivelse");
        if(beskrivelse == null || beskrivelse === " " || beskrivelse === "" || value == null){
            snackShow("warning","Dato og beskrivelse skal udfyldes.")
            return;
        }
        let day = '' + value.getDate();
        let month = '' + value.getMonth()+1
        let year = value.getFullYear()

        if(day.length < 2){
            day = '0' + day;
        }
        if(month.length < 2){
            month = '0' + month
        }

        const date = day + "." + month + "." + year;
        setOpen(false);
        weekStore.add(date,beskrivelse,snackShow);
    }

    function snackShow(type, message){
       setSnackType(type);
       setSnackMessage(message);
       snackhandleClick();
    }

    const editTask = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const beskrivelse = data.get("beskrivelse");
        if(beskrivelse == null || beskrivelse === " " || beskrivelse === "" || editvalue == null){
            snackShow("warning","Dato og beskrivelse skal udfyldes.")
            return;
        }
        let day = '' + editvalue.getDate();
        let month = '' + editvalue.getMonth()+1
        let year = editvalue.getFullYear()

        if(day.length < 2){
            day = '0' + day;
        }
        if(month.length < 2){
            month = '0' + month
        }

        const date = day + "." + month + "." + year;
        setOpen(false);
        weekStore.put(editid,date,beskrivelse,snackShow);
        edithandleClose();
    }
    function deleteTask (task) {
        if(editid != null) {
            weekStore.delete(task, snackShow);
            edithandleClose();
        }
    }

    function addSmiley(){
        timerStore.addSmiley();
    }

    function deleteSmiley(){
        timerStore.deleteSmiley();
    }

    const smileys = [];

    if(timerStore.smiley.timestamp === 0){
        if(userStore.user.logged)
            smileys.push(<IconButton aria-label="Tilføj" onClick={addSmiley}><Add /></IconButton>);
        else
            smileys.push(<IconButton aria-label="Tilføj" onClick={addSmiley} disabled><Add /></IconButton>);
    }

    for (let i = 0; i < timerStore.smiley.timestamp ; i++) {
        smileys.push("😃");
        if(i === (timerStore.smiley.timestamp - 1) && i !== 4) {
            if(userStore.user.logged)
                smileys.push(<IconButton aria-label="Tilføj" onClick={addSmiley}><Add /></IconButton>);
            else
                smileys.push(<IconButton aria-label="Tilføj" onClick={addSmiley} disabled><Add /></IconButton>);
        }
    }

    return (
        <Box sx={{m: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm="auto">
                    <Card sx={{minWidth: 275, height:170}}>
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
                <Grid item xs={12} sm={3}>
                    <Card sx={{minWidth: 275,height:170}}>
                        <CardContent>
                            <Typography sx={{fontSize: 28}} color="text.secondary" gutterBottom>
                                Ayla's smileys
                            </Typography>
                            <Typography sx={{fontSize: 24}} gutterBottom>
                                {smileys}
                            </Typography>
                            {userStore.user.logged ?
                                <Box>
                                    <Button variant="contained" onClick={deleteSmiley}>Nulstil</Button>
                                </Box>:
                                <Box>
                                    <Button variant="contained" disabled>Nulstil</Button>
                                </Box>}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{minWidth: 275,height:170}}>
                        <CardContent>
                            <Typography sx={{fontSize: 28}} color="text.secondary" gutterBottom>
                                Indkøbsliste
                            </Typography>
                            {userStore.user.logged ?
                                <Box>
                                    <Button variant="contained">Tilføj</Button> <Button variant="contained">Nulstil</Button>
                                </Box>:
                                <Box>
                                    <Button variant="contained" disabled>Tilføj</Button> <Button variant="contained" disabled>Nulstil</Button>
                                </Box>}
                        </CardContent>
                    </Card>
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

                                    <Paper key={todo.id}
                                           sx={{m: 1, p: 1, width: "90%"}}
                                           elevation={3}
                                           onClick={() => edithandleClickOpen(day.date,todo.id,todo.task)}
                                    >
                                        <Typography align="left" sx={{color: "gray"}}>
                                            {todo.task}
                                        </Typography>
                                    </Paper>



                                )}
                            </Box>
                        </Paper>
                    )}
                </div>

                <Dialog open={editopen} onClose={edithandleClose}>
                    <DialogTitle>Rediger en todo:</DialogTitle>
                    <DialogContent>

                        <Box sx={{m: 1}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                                <DatePicker
                                    label="Vælg Dato"
                                    value={editvalue}
                                    onChange={(newValue) => {
                                        editsetValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{m: 1}} component="form" onSubmit={editTask} noValidate>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="beskrivelse"
                                name="beskrivelse"
                                label="Beskrivelse"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={editmessage}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    mt:1
                                }}
                            >
                                <Button type="submit" >Rediger</Button>
                                <Button onClick={() => deleteTask(editid)}>Slet</Button>
                                <Button onClick={edithandleClose}>Annullere</Button>
                            </Box>
                        </Box>
                    </DialogContent>

                </Dialog>
                <Snackbar open={snackopen} autoHideDuration={6000} onClose={snackhandleClose}>
                    <Alert onClose={snackhandleClose} severity={snackType} sx={{ width: '100%' }}>
                        {snackMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );

}

export default observer(Home);