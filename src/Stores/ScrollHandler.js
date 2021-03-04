import { makeStyles } from '@material-ui/core';
import { observable, action, makeAutoObservable } from 'mobx'

export class ScrollHandler {
    constructor() {
        this.index = 0;
        this.lock = true;
        this.down = null;
        this.comps = [];
        makeAutoObservable(this, {
            index: observable,
            handleTabChange: action,
            triggerScrollAndUnlock: action,
            wheelHandler: action,
            handleTouchStart: action,
            handleTouchEnd: action,
            setComps: action
        })
    }
    setComps = arr => this.comps = arr;

    handleTabChange = (_, newVal) => this.index = newVal;
    scrollTo = comp => comp.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

    goUp = () => {
        if (this.index < this.comps.length - 1)
            this.index = this.index + 1;
        else this.lock = true;
    }
    goDown = () => {
        if (this.index > 0)
            this.index = this.index - 1;
        else this.lock = true;
    }

    triggerScrollAndUnlock = i => {
        this.scrollTo(this.comps[i]);
        setTimeout(() => { this.lock = true }, 800); //to prevent double scrollIntoView
    }


    //touch events handler
    handleTouchStart = e => this.down = e.changedTouches[0].screenY;
    handleTouchEnd = e => {
        const y = e.changedTouches[0].screenY;
        const dist = y - this.down;
        if (dist > 20)
            this.goDown();
        else if (dist < -20)
            this.goUp();
    }
    //Wheel scroll handler
    wheelHandler = e => {
        if (this.lock) {
            const scroll = e.deltaY;
            if (Math.abs(scroll) > 5) {
                this.lock = false;
                if (scroll > 0)
                    this.goUp();
                else
                    this.goDown();
            }
        }
    }
}