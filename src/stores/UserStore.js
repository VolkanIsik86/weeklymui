import {makeAutoObservable, runInAction} from "mobx";

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
        console.log(username + " " + password);

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

        fetch("https://localhost:44371/User/authentication", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)

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