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
}
export const userStore = new UserStore()