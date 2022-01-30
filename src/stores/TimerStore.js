import {makeAutoObservable, runInAction} from "mobx";
import {config} from "../Constants/Constants";

class TimerStore{

    timer = {}
    smiley = {}

    constructor() {
        makeAutoObservable(this);
        this.fetchTime();
        this.fetchSmiley();
    }

    fetchTime(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(config.url.API_URL + "/Gubi", requestOptions)
            .then(response => response.json())
            .then(result => {
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
                runInAction(()=> this.timer = result)
            })
            .catch(error => console.log('error', error));
    }

    fetchSmiley(){
        fetch(config.url.API_URL + "/Gubi/smiley", {
            "method": "GET"
        })
            .then(response => response.json())
            .then(result => {
                runInAction(()=> this.smiley = result);
            })
            .catch(err => {
                console.error(err);
            });
    }

    addSmiley(){
        fetch(config.url.API_URL + "/Gubi/smiley", {
            "method": "PUT"
        })
            .then(response => response.json())
            .then(result => {
                runInAction(()=> this.smiley = result);
            })
            .catch(err => {
                console.error(err);
            });
    }

    deleteSmiley(){
        fetch(config.url.API_URL + "/Gubi/smiley", {
            "method": "DELETE"
        })
            .then(response => response.json())
            .then(result => {
                runInAction(()=> this.smiley = result);
            })
            .catch(err => {
                console.error(err);
            });
    }
}
export const timerStore = new TimerStore()