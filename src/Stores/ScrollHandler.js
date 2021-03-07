import { observable, action, makeAutoObservable } from 'mobx'

export class ScrollHandler {
    constructor() {
        this.index = 0;
        this.first = false;
        this.lock = true;
        this.timeout = null;
        this.down = null;
        this.comps = [];
        this.toShowLoading = false;
        makeAutoObservable(this, {
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
        if(this.first){
            console.log("attemps to scroll",this.index);
            comp.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

    triggerScrollAndUnlock = i => {
        this.timeout && clearTimeout(this.timeout)
        this.scrollTo(this.comps[this.index]);
        this.timeout = setTimeout(() => { this.lock = true }, 800); //to prevent double scrollIntoView
    }

    //touch events handler
    handleTouchStart = e => this.down = e.changedTouches[0].screenY;
    handleTouchEnd = e => {
        const y = e.changedTouches[0].screenY;
        const dist = y - this.down;
        if (dist > 50){
            if (this.index > 0)
                this.index = this.index - 1;
            else{
                this.toShowLoading = true;
                setTimeout(() => {
                    this.toShowLoading = false
                    window.location.reload();
                }, 800);
            }
        }
        else if (dist < -50)
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