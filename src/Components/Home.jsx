import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import Typewriter from 'typewriter-effect/dist/core';
import { inject, observer } from 'mobx-react';
import SmoothImage from './Helpers/SmoothImage';
import '../css-files/Home.css'

function Home() {

    useEffect(() => {
        setTimeout(() => new Typewriter('#typEffect', {
            strings: ['Full Stack Developer', 'Software Developer'],
            autoStart: true,
            loop: true
        }),1000);
    }, [])

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center">

            <img
                src="ana.jpg"
                alt="me"
                className="my-image"/>
            {/* <SmoothImage
                src="ana.jpg"
                alt="me"
                transitionTime={0.5}
                imageStyles="my-image"/> */}
                
            <h1 data-aos="zoom-in" className="text-style intro font-light">Hello, I'm Androw</h1>
            <h3 id="typEffect" className="text-style font-light medium-text-home"></h3>
        </Grid>
    )
}

export default Home;