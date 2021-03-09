import './css-files/App.css';
import './css-files/Animations.scss';
import 'aos/dist/aos.css'
import React, { createRef, useEffect, useLayoutEffect } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import Home from './Components/Home';
import ParticlesBg from 'particles-bg';
import About from './Components/About';
import Aos from 'aos'
import smoothscroll from 'smoothscroll-polyfill';
import Loading from './Components/Helpers/Loading';
import Education from './Components/Education';
import Projects from './Components/Projects';

function App(props) {
  const { scrollHandler, styles } = props;
  const { barStyles } = styles;
  const navClasses = barStyles.useStyles();
  
  //My component references
  const home = createRef(null);
  const about = createRef(null);
  const education = createRef(null);
  const projects = createRef(null);
  const sections = ['Home', 'About', 'Education', 'Projects']

  useEffect(() => {
    //send all my sections to the scroll handler store
    const comps = [home, about, education, projects];
    scrollHandler.setComps(comps)
    
    //in order to scroll from the bottom to the top i made this loop and each time it scrollsInto the above view with a timeout delay 
    //to achieve a more smooth transition
    window.scrollTo(0,document.body.scrollHeight);
    comps.forEach((_,i) => setTimeout(()=>comps[comps.length-1-i].current.scrollIntoView({ behavior: 'smooth', block: 'start'}),((i+1)*200)))

    //remove lopading gif
    const loadingGif = document.getElementById("initial-loading");
    loadingGif && loadingGif.remove();

    //initialise aos(animation on scroll) to start working after 1.5 seconds
    setTimeout(()=> Aos.init({ duration: 1000, once: true }),1500)
  }, [])
  
  useLayoutEffect(()=> {
    //adding safari compitabilaty
    window.__forceSmoothScrollPolyfill__ = true;
    smoothscroll.polyfill();

    if ('scrollRestoration' in window.history) 
      window.history.scrollRestoration = 'manual'
  },[]);

  useEffect(() => scrollHandler.triggerScrollAndUnlock(), [scrollHandler.index]);

  return (
    <div id="container">
      <Loading toShow={scrollHandler.toShowLoading}/>
      <ParticlesBg num={6} type="square" bg={true} />
      <AppBar className={navClasses.bar}>
        <Tabs classes={{indicator: navClasses.indicator,root:  navClasses.bar}} value={scrollHandler.index} onChange={scrollHandler.handleTabChange} centered>
          {sections.map((s,i) => <Tab className={`slide-bar ${navClasses.tabRoot}`} key={s} label={s} />)}
        </Tabs>
      </AppBar>
      <div className="App"
        onWheel={scrollHandler.wheelHandler}
        onTouchStart={scrollHandler.handleTouchStart}
        onTouchEnd={scrollHandler.handleTouchEnd}>
        <div className="section home" ref={home}><Home /></div>
        <div className="section white-background padding-5" ref={about}><About /></div>
        <div className="section padding-5" ref={education}><Education /></div>
        <div className="section white-background padding-5" ref={projects}> <Projects /></div>
      </div>
    </div>
  );
}

export default inject("scrollHandler", "styles")(observer(App));
