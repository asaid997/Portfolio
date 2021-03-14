import { FormatColorResetTwoTone } from '@material-ui/icons';
import { observable, action, makeAutoObservable, set } from 'mobx'

export class ScrollHandler {
    constructor() {
        this.index = 0;
        this.first = false;
        this.lock = true;
        this.touchLock = 10;
        //app crashes during the initial bot -> top animation if we scroll
        //this lock prevents a scroll during that time
        this.initialLock = false;
        this.timeout = null;
        this.down = null;
        this.comps = [];
        this.toShowLoading = false;
        this.touchMove = 0;
        makeAutoObservable(this, {
            index: observable,
            toShowLoading: observable,
            handleTabChange: action,
            triggerScrollAndUnlock: action,
            wheelHandler: action,
            handleTouchStart: action,
            handleTouchEnd: action,
            setComps: action
        });
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
    triggerScrollAndUnlock = () => {
        this.timeout && clearTimeout(this.timeout)
        this.scrollTo(this.comps[this.index]);
        this.timeout = setTimeout(() => { this.lock = true; }, 600); //to prevent double scrollIntoView
    }

    //touch events handler
    // handleTouchStart = e => this.down = e.changedTouches[0].screenY;
    handleTouchStart = e => {
        this.down = e.changedTouches[0];
        this.downY = this.down.screenY;
        this.touchLock = 0;
    }
    handleTouchMove = e => {
        if (this.touchLock === 2 && this.initialLock) {
            const y = e.changedTouches[0].screenY;
            const distY = y - this.downY;
            const threshold = 0;
            if (distY > threshold) {
                if (this.index > 0)
                this.index = this.index - 1;
                else {
                    this.toShowLoading = true;
                    window.location.reload();
                    setTimeout(() => {
                        this.toShowLoading = false
                    }, 500);
                }
            }
            else if (distY < -threshold)
            this.goUp();
        }
        this.touchLock++;
    }
    //Wheel scroll handler
    wheelHandler = e => {
        if (this.lock && this.initialLock) {
            const scroll = e.deltaY;
            if (Math.abs(scroll) > 0) {
                this.lock = false;
                if (scroll > 0)
                    this.goUp();
                else
                    this.goDown();
            }
        }
    }
}
