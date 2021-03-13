import { observable, action, makeAutoObservable, set } from 'mobx'

export class ScrollHandler {
    constructor() {
        this.index = 0;
        this.first = false;
        this.lock = true;
        this.touchLock = true;
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
        })
        const body = document.body,
            html = document.documentElement;

        this.height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

        function preventDefault(e) {
            e.preventDefault();
        }

        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }

        // modern Chrome requires { passive: false } when adding event
        var supportsPassive = false;
        try {
            window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
                get: function () { supportsPassive = true; }
            }));
        } catch (e) { }

        var wheelOpt = supportsPassive ? { passive: false } : false;
        var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

        // call this to Disable
        this.disableScroll = () => {
            window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
            window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
            window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
            window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        }
        // call this to Enable
        this.enableScroll = () => {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
            window.removeEventListener('touchmove', preventDefault, wheelOpt);
            window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        }
    }
    setComps = arr => this.comps = arr;
    getComp = i => this.comps[i];

    handleTabChange = (_, newVal) => this.index = newVal;
    scrollTo = comp => {
        //with the way react is and because i added a listener to the index var the useeffect will trigger 
        //a scroll to the first component(index initialised with 0) this basically checks if its the first and unwanted scroll request
        if (this.first){
            this.disableScroll();
            comp.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(()=> this.enableScroll(), 1000);
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

    //unlocks the wheel scroll lock(wheels sends a lot of triggers)
    triggerScrollAndUnlock = () => {
        this.timeout && clearTimeout(this.timeout)
        this.scrollTo(this.comps[this.index]);
        this.timeout = setTimeout(() => { this.lock = true }, 800); //to prevent double scrollIntoView
    }

    //touch events handler
    // handleTouchStart = e => this.down = e.changedTouches[0].screenY;
    handleTouchStart = e => {
        this.down = e.changedTouches[0];
        this.down2 = this.down.screenY;
    }

    handleTouchMove = e => {
        let d = 7;
        const y = e.touches[0].screenY;
        const dist = (this.down2 - y);
        const temp = Math.abs(dist);
        if(temp < 1.0) { d = 0.1 }
        else if(temp < 3.0){ d = 1 }
        else if(temp < 5.0){ d = 4 }
        else d = 6;

        const easeScroll = dist > 0.0 ? d : -d;

        console.log(easeScroll,dist,y,this.down2)
        window.scrollBy(0,easeScroll);
        this.down2 = y;
    }
    handleTouchEnd = e => {
        const y = e.changedTouches[0];
        const distY = y.screenY - this.down.screenY;
        const distX = y.screenX - this.down.screenX;
        if (Math.abs(distX) < 250) {
            const threshold = this.height / 5;
            if (distY > threshold) {
                if (this.index > 0)
                    this.index = this.index - 1;
                //reloads the page
                else {
                    this.toShowLoading = true;
                    setTimeout(() => {
                        this.toShowLoading = false
                        window.location.reload();
                    }, 100);
                }
            }
            else if (distY < -threshold)
                this.goUp();
            else {
                this.triggerScrollAndUnlock();
            }
        }
    }
    //Wheel scroll handler
    wheelHandler = e => {
        if (this.lock) {
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
