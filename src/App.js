import './App.css';
import React,{ createRef, useEffect,useState } from 'react';
import { AppBar, Hidden, makeStyles, Tab, Tabs } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

function App(props) {
  const {scrollHandler} = props;

  //My component references
  const yellow = createRef(null);
  const blue = createRef(null);
  const green = createRef(null);
  const red = createRef(null);

  useEffect(() => {
    scrollHandler.scrollIntoComp(yellow);
    scrollHandler.setComps([yellow, blue, green, red]);
  },[])
  useEffect(()=>{
    scrollHandler.triggerScrollAndUnlock(scrollHandler.index);
  },[scrollHandler.index]);


  const classes = scrollHandler.useStyles();


  return (
    <div>
      <Hidden xsDown>
        <AppBar className={`bar ${classes.bar}`}>
            <Tabs value={scrollHandler.index} onChange={scrollHandler.handleTabChange} centered indicatorColor="primary">
              <Tab label="Yellow" />
              <Tab label="Blue" />
              <Tab label="Green" />
              <Tab label="Red"  />
            </Tabs>
        </AppBar>
      </Hidden>
      <div className="App" 
          onWheel={scrollHandler.wheelHandler}
          onTouchStart={scrollHandler.handleTouchStart}
          onTouchEnd={scrollHandler.handleTouchEnd}>
        <div className="one yellow" ref={yellow}></div>
        <div className="one blue" ref={blue}></div>
        <div className="one green" ref={green}></div>
        <div className="one red" ref={red}></div>
      </div>
    </div>
  );
}

export default inject("scrollHandler")(observer(App));
