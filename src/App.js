import './App.css';
import React,{ createRef, useEffect,useState } from 'react';
import { AppBar, Hidden, Tab, Tabs, withStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import Home from './Components/Home';
import ParticlesBg from 'particles-bg';

function App(props) {
  const {scrollHandler,styles} = props;
  const {barStyles} = styles;

  //My component references
  const home = createRef(null);
  const blue = createRef(null);
  const green = createRef(null);
  const red = createRef(null);

  useEffect(() => {
    scrollHandler.setComps([home,blue, green, red]);
  },[])
  useEffect(()=>{
    scrollHandler.triggerScrollAndUnlock(scrollHandler.index);
  },[scrollHandler.index]);

  const classes = barStyles.useStyles();
  const CustomTabs = barStyles.customTabs();

  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    // body: "./img/icon.png", // Whether to render pictures
    // rotate: [0, 20],
    alpha: [0.6, 0],
    scale: [1, 0.1],
    position: "center", // all or center or {x:1,y:1,width:100,height:100}
    body: "#05386B",
    cross: "dead", // cross or bround
    random: 15,  // or null,
    g: 5,    // gravity
    // f: [2, -1], // force
    onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
    }
  };

  return (
    <div>
      <ParticlesBg  num={10} type="square" bg={true} />
      {/* <ParticlesBg  type="custom" config={config}  bg={true} /> */}
      <Hidden xsDown>
        <AppBar className={`bar ${classes.bar}`}>
            <CustomTabs value={scrollHandler.index} onChange={scrollHandler.handleTabChange} centered>
              <Tab label="Home" />
              <Tab label="Blue" />
              <Tab label="Green" />
              <Tab label="Red"  />
            </CustomTabs>
        </AppBar>
      </Hidden>
      <div className="App" 
          onWheel={scrollHandler.wheelHandler}
          onTouchStart={scrollHandler.handleTouchStart}
          onTouchEnd={scrollHandler.handleTouchEnd}>
        <div className="one " ref={home}><Home /></div>
        <div className="one blue" ref={blue}></div>
        <div className="one green" ref={green}></div>
        <div className="one red" ref={red}></div>
      </div>
    </div>
  );
}

export default inject("scrollHandler","styles")(observer(App));
