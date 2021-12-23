import {makeAutoObservable, runInAction} from "mobx";
import {config} from "../Constants/Constants";

class TimerStore{
    timer = {}
    constructor() {
        makeAutoObservable(this);
        this.fetchTime();
    }
    fetchTime(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        console.log(config.url)

        fetch(config.url.API_URL + "/Gubi", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                console.log("hej fra timerstrore")
                runInAction(()=> this.timer = result)
            })
            .catch(error => console.log('error', error));
    }
    updateTime(){
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch(config.url.API_URL + "/Gubi/time", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                runInAction(()=> this.timer = result)
            })
            .catch(error => console.log('error', error));
    }
}
export const timerStore = new TimerStore()