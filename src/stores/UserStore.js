import {makeAutoObservable, runInAction} from "mobx";
import {config} from "../Constants/Constants";

class UserStore{
    user = {
        logged : false,
        token: null,
        username: null
    }
    constructor() {
        makeAutoObservable(this);
    }

    setUser(user){
        runInAction(()=> this.user = user );
    }

    login(username, password){

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "userName": username,
            "password": password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(config.url.API_URL + "/User/authentication", requestOptions)
            .then(response => response.text())
            .then(result => {

                const temp = {
                    logged : true,
                    token: result,
                    username: username
                }

                runInAction(()=> this.user = temp)

            })
            .catch(error => console.log('error', error));
    }
}
export const userStore = new UserStore()