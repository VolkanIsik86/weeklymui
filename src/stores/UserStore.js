import {makeObservable, observable, runInAction} from "mobx";

export default class UserStore{
    user = {
        logged : false,
        token: null,
        username: null
    }
    constructor() {
        makeObservable(this,{
            user: observable
        })
    }

    setUser(user){
        runInAction(()=> this.user = user );
    }
}