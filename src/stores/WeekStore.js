import {makeAutoObservable} from "mobx";

class WeekStore{
    week = {
        number : 50,
        days : [
            {
                name : "Mandag",
                dato : "20/12/2021",
                todos : [
                    {
                        dato : "20/12/2021",
                        beskrivelse : "V - arbejde til 17:00"
                    }
                ]
            },
            {
                name : "Tirsdag",
                dato : "21/12/2021",
                todos : [
                    {
                        dato : "21/12/2021",
                        beskrivelse : "V - arbejde til 17:00"
                    }
                ]
            },
            {
                name : "Onsdag",
                dato : "22/12/2021",
                todos : [
                    {
                        dato : "22/12/2021",
                        beskrivelse : "V - arbejde til 17:00"
                    }
                ]
            },
            {
                name : "Torsdag",
                dato : "23/12/2021",
                todos : [
                    {
                        dato : "23/12/2021",
                        beskrivelse : "V - arbejde til 17:00"
                    }
                ]
            },
            {
                name : "Fredag",
                dato : "24/12/2021",
                todos : [
                    {
                        dato : "24/12/2021",
                        beskrivelse : "V - arbejde til 17:00"
                    }
                ]
            },
            {
                name : "Lørdag",
                dato : "25/12/2021",
                todos : [
                    {
                        dato : "25/12/2021",
                        beskrivelse : "V - arbejde til 17:00"
                    }
                ]
            },
            {
                name : "Søndag",
                dato : "26/12/2021",
                todos : [
                    {
                        dato : "26/12/2021",
                        beskrivelse : "V - arbejde til 17:00"
                    }
                ]
            },

        ]
    }
    constructor() {
        makeAutoObservable(this)
    }

}
export const weekStore = new WeekStore();