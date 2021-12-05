import {Box, Typography} from "@mui/material";
import {useState} from "react";


export default function Timer(){

    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    var countDownDate = 0;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:47340/Gubi", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            countDownDate = result.timestamp
        })
        .catch(error => console.log('error', error));






    // var x = setInterval(function() {
    //
    //     // Get today's date and time
    //     var now = new Date().getTime();
    //
    //     // Find the distance between now and the count down date
    //     var distance = countDownDate - now;
    //
    //     // Time calculations for days, hours, minutes and seconds
    //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //
    //     setDay(days)
    //     setHour(hours)
    //     setMinute(minutes)
    //     setSecond(seconds)
    //
    // }, 1000);


return(
    <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        {day}:{hour}:{minute}:{second}
    </Typography>
);

}