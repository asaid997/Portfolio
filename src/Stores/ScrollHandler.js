import { observable, action, makeAutoObservable } from 'mobx'

export class ScrollHandler{
    constructor(){
        this.index = 0;
        this.lock = true;
        makeAutoObservable(this,{
            index: observable,
        })
    }
}