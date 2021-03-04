import './App.css';
import React, { createRef, useEffect } from 'react';
import { AppBar, Hidden, Tab} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import Home from './Components/Home';
import ParticlesBg from 'particles-bg';
import About from './Components/About';
import MenuAction from './Components/MenuAction';

function App(props) {
  const { scrollHandler, styles } = props;
  const { barStyles } = styles;

  //My component references
  const home = createRef(null);
  const about = createRef(null);
  const green = createRef(null);
  const red = createRef(null);
  const sections = ['Home', 'About', 'Green', 'Red']

  useEffect(() => {
    scrollHandler.setComps([home, about, green, red]);
  }, [])
  useEffect(() => {
    scrollHandler.triggerScrollAndUnlock(scrollHandler.index);
  }, [scrollHandler.index]);

  const classes = barStyles.useStyles();
  const CustomTabs = barStyles.customTabs();


  return (
    <div>
      <ParticlesBg num={6} type="square" bg={true} />
      <Hidden xsDown>
        <AppBar className={`bar ${classes.bar}`}>
          <CustomTabs value={scrollHandler.index} onChange={scrollHandler.handleTabChange} centered>
            {sections.map(s => <Tab key={s} label={s} />)}
          </CustomTabs>
        </AppBar>
      </Hidden>
      <MenuAction sections={sections}/>
      <div className="App"
        onWheel={scrollHandler.wheelHandler}
        onTouchStart={scrollHandler.handleTouchStart}
        onTouchEnd={scrollHandler.handleTouchEnd}>
        <div className="one home" ref={home}><Home /></div>
        <div className="one about" ref={about}><About /></div>
        <div className="one " ref={green}></div>
        <div className="one red" ref={red}></div>
      </div>
    </div>
  );
}

export default inject("scrollHandler", "styles")(observer(App));
