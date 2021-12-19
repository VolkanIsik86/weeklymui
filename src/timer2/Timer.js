import {Box, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import {timerStore} from "../stores/TimerStore";
import {observer} from "mobx-react-lite";


function Timer(){


    const calculateTimeLeft = () => {
        let countDownDate = timerStore.timer.timestamp * 1000;
        let now = new Date().getTime();
        let difference = countDownDate - now;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60))),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    console.log(timeLeft)
    return (
        <div>
            {timeLeft.hours + ":" + timeLeft.minutes + ":" + timeLeft.seconds}
        </div>
    );
}
export default observer(Timer);