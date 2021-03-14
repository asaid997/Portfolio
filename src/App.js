import './css-files/RootVars.css';
import './css-files/App.css';
import './css-files/Animations.scss';
import 'aos/dist/aos.css'
import React, { createRef, useEffect, useLayoutEffect, useState } from 'react';
import Tabs from './Components/Helpers/Tabs'
import { inject, observer } from 'mobx-react';
import Home from './Components/Home';
import ParticlesBg from 'particles-bg';
import About from './Components/About';
import Aos from 'aos'
import smoothscroll from 'smoothscroll-polyfill';
import Loading from './Components/Helpers/Loading';
import Education from './Components/Education';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import ScrollUp from './Components/Helpers/ScrollUp';

function Iphone() {
  return [
    'iPhone Simulator',
    'iPod Simulator',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
}

function App(props) {
  const { scrollHandler } = props;

  //My component references
  const home = createRef(null);
  const about = createRef(null);
  const education = createRef(null);
  const projects = createRef(null);
  const contact = createRef(null);
  const comps = [home, about, education, projects, contact];
  const sections = ['Home', 'About', 'Education', 'Projects', 'Contact']

  useEffect(() => {
    Aos.refreshHard();

    //make viewport smaller due to the bottom bar of safari on iphones
    if (Iphone()) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    //send all my sections to the scroll handler store
    scrollHandler.setComps(comps)
    scrollHandler.index = 0;

    //remove lopading gif
    const loadingGif = document.getElementById("initial-loading");
    loadingGif && loadingGif.remove();

    //initialise aos(animation on scroll) to start working after 1.5 seconds
    setTimeout(() => {
      Aos.init({ duration: 450, once: true });
      scrollHandler.initialLock = true;
    }, 1500)
  }, []);

  useLayoutEffect(() => {
    //adding safari compitabilaty
    window.__forceSmoothScrollPolyfill__ = true;
    smoothscroll.polyfill();

    // //prevents the page to reload in the same position
    if ('scrollRestoration' in window.history)
      window.history.scrollRestoration = 'manual'

    //in order to scroll from the bottom to the top i made this loop and each time it scrollsInto the above view with a timeout delay 
    //to achieve a more smooth transition
    window.scrollTo(0, document.body.scrollHeight);
    comps.forEach((_, i) => setTimeout(() => comps[comps.length - 1 - i].current.scrollIntoView({ behavior: 'smooth', block: 'start' }), ((i + 1) * 200)));

  }, []);

  useEffect(() => scrollHandler.triggerScrollAndUnlock(), [scrollHandler.index]);

  return (
    <div id="container">
      <ScrollUp />
      <Loading toShow={scrollHandler.toShowLoading} />
      <ParticlesBg num={4} type="square" bg={true} />
      <Tabs sections={sections} />
      <div id="app"
        onWheel={scrollHandler.wheelHandler}
        onTouchStart={scrollHandler.handleTouchStart}
        onTouchMove={scrollHandler.handleTouchMove}
        onTouchEnd={scrollHandler.handleTouchEnd}
      >
        <div className="section home not-selectable" ref={home}><Home /></div>
        <div className="section white-background padding-5 not-selectable" ref={about}><About /></div>
        <div className="section padding-5 not-selectable" ref={education}><Education /></div>
        <div className="section white-background padding-5 not-selectable" ref={projects}> <Projects /></div>
        <div className="half-section" ref={contact}> <Contact /></div>
      </div>
    </div>
  );
}

export default inject("scrollHandler")(observer(App));
