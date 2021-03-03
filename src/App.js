import './App.css';
import React,{ createRef, useEffect,useState } from 'react';
import { AppBar, Hidden, Tab, Tabs } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

function App(props) {
  //My component references
  const yellow = createRef(null);
  const blue = createRef(null);
  const green = createRef(null);
  const red = createRef(null);
  const comps = [yellow, blue, green, red];

  const [index, setIndex] = useState(0);
  const [lock,setLock] = useState(true);
  
  const handleTabChange = (_, newValue) => setIndex(newValue);

  const scrollIntoComp = comp => comp.current.scrollIntoView({behavior: 'smooth',block: 'center',alignToTop: true});

  const triggerScrollAndUnlock = i => {
    scrollIntoComp(comps[i]);
    setTimeout(function () { setLock(true) }, 600); //to prevent double scrollIntoView
  }
  const goUp = () => {
    if (index < comps.length - 1) 
      setIndex(index+1);
    else setLock(true);
  }
  const goDown =() => {
    if (index > 0) 
      setIndex(index-1);
    else setLock(true);
  }

  //Wheel scroll handler
  const wheelHandler = e => {
    if (lock) {
      const scroll = e.deltaY;
      if(Math.abs(scroll) > 5){
        setLock(false);
        if (scroll > 0) 
          goUp();
        else 
          goDown();
      }
    }
  }
  //touch events handler
  let down;
  const handleTouchStart = e => down = e.changedTouches[0].screenY;
  const handleTouchEnd = e => {
    const y = e.changedTouches[0].screenY;
    const dist = y-down;
    if(dist > 20)
      goDown();
    else if(dist < -20)
      goUp();
  }

  useEffect(() => {
    scrollIntoComp(yellow);
  },[])
  useEffect(()=>{
    triggerScrollAndUnlock(index);
  },[index]);


  return (
    <div>
      <Hidden xsDown>
        <AppBar className="bar">
            <Tabs value={index} onChange={handleTabChange}>
              <Tab label="Yellow" />
              <Tab label="Blue" />
              <Tab label="Green" />
              <Tab label="Red"  />
            </Tabs>
        </AppBar>
      </Hidden>
      <div className="App" 
          onWheel={wheelHandler}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>
        <div className="one yellow" ref={yellow}></div>
        <div className="one blue" ref={blue}></div>
        <div className="one green" ref={green}></div>
        <div className="one red" ref={red}></div>
      </div>
    </div>
  );
}

export default inject("scrollHandler")(observer(App));
