import {makeAutoObservable, runInAction} from "mobx";

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

        fetch("http://localhost:47340/Gubi", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                runInAction(()=> this.timer = result)
            })
            .catch(error => console.log('error', error));
    }
    updateTime(){
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch("https://localhost:44371/Gubi/time", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                runInAction(()=> this.timer = result)
            })
            .catch(error => console.log('error', error));
    }
}
export const timerStore = new TimerStore()