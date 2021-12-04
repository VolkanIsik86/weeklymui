import React from "react";
import {createTheme, Grid, TextField, ThemeProvider} from "@mui/material";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function Home(){
    const [value, setValue] = React.useState(null);

    return(

        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card sx={{ minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Gubi
                        </Typography>

                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                            72:00:00
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Mad</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>

    );

}