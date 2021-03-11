import { observable, action, makeAutoObservable } from 'mobx'

export class ScrollHandler {
    constructor() {
        this.index = 0;
        this.scrollable = '';
        this.first = false;
        this.lock = true;
        this.timeout = null;
        this.down = null;
        this.comps = [];
        this.toShowLoading = false;
        this.touchMove = 0;
        makeAutoObservable(this, {
            scrollable: observable,
            index: observable,
            toShowLoading: observable,
            handleTabChange: action,
            triggerScrollAndUnlock: action,
            wheelHandler: action,
            handleTouchStart: action,
            handleTouchEnd: action,
            setComps: action
        })
    }
    setComps = arr => this.comps = arr;
    getComp = i => this.comps[i];

    handleTabChange = (_, newVal) => this.index = newVal;
    scrollTo = comp => {
        //with the way react is and because i added a listener to the index var the useeffect will trigger 
        //a scroll to the first component(index initialised with 0) this basically checks if its the first and unwanted scroll request
        if (this.first)
            comp.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else
            this.first = true;
    }

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

    //unlocks the wheel scroll lock(wheels sends a lot of triggers)
    triggerScrollAndUnlock = i => {
        this.timeout && clearTimeout(this.timeout)
        this.scrollTo(this.comps[this.index]);
        this.timeout = setTimeout(() => { this.lock = true }, 800); //to prevent double scrollIntoView
    }

    //touch events handler
    handleTouchStart = e => this.down = e.changedTouches[0].screenY;
    handleTouchEnd = e => {
        if (! /iPhone/i.test(navigator.userAgent)) {
            const y = e.changedTouches[0].screenY;
            const dist = y - this.down;
            if (dist > 50) {
                if (this.index > 0)
                    this.index = this.index - 1;
                //reloads the page
                else {
                    this.toShowLoading = true;
                    setTimeout(() => {
                        this.toShowLoading = false
                        window.location.reload();
                    }, 500);
                }
            }
            else if (dist < -50)
                this.goUp();
        }
    }
    //Wheel scroll handler
    wheelHandler = e => {
        if (this.lock && ! /iPhone/i.test(navigator.userAgent)) {
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
