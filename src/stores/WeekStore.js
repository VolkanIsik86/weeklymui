import {makeAutoObservable, runInAction} from "mobx";
import {config} from "../Constants/Constants";

class WeekStore{
    week = {
        weekNr : 50,
        days : [
            {
                name : "Mandag",
                date : "20/12/2021",
                toDos : [
                    {
                        date : "20/12/2021",
                        task : "V - arbejde til 17:00",
                        id : 12
                    }
                ]
            },
            {
                name : "Tirsdag",
                date : "21/12/2021",
                toDos : [
                    {
                        date : "21/12/2021",
                        task : "V - arbejde til 17:00",
                        id : 13
                    }
                ]
            },
            {
                name : "Onsdag",
                date : "22/12/2021",
                toDos : [
                    {
                        date : "22/12/2021",
                        task : "V - arbejde til 17:00",
                        id : 14
                    }
                ]
            },
            {
                name : "Torsdag",
                date : "23/12/2021",
                toDos : [
                    {
                        date : "23/12/2021",
                        task : "V - arbejde til 17:00",
                        id : 15
                    }
                ]
            },
            {
                name : "Fredag",
                date : "24/12/2021",
                toDos : [
                    {
                        date : "24/12/2021",
                        task : "V - arbejde til 17:00",
                        id : 16
                    }
                ]
            },
            {
                name : "Lørdag",
                date : "25/12/2021",
                toDos : [
                    {
                        date : "25/12/2021",
                        task : "V - arbejde til 17:00",
                        id : 17
                    }
                ]
            },
            {
                name : "Søndag",
                date : "26/12/2021",
                toDos : [
                    {
                        date : "26/12/2021",
                        task : "V - arbejde til 17:00",
                        id : 18
                    }
                ]
            },

        ]
    }
    constructor() {
        makeAutoObservable(this);
        this.fetch();
    }

    fetch(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(config.url.API_URL + "/ToDo/weekly", requestOptions)
            .then(response => response.json())
            .then(result => {
                runInAction(()=> this.week = result);
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }

    add(){

    }

}
export const weekStore = new WeekStore();