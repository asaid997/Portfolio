import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import Typewriter from 'typewriter-effect/dist/core';
import { shadows } from '@material-ui/system';
import './css/Home.css';

function Home() {

    useEffect(() => {
        new Typewriter('#typEffect', {
            strings: ['Full stack developer', 'Software developer'],
            autoStart: true,
            loop: true
          });
    }, [])

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <img id="me" alt="me" src="ana.jpg" />
            {/* <img id="me" alt="me" src="sq.png" /> */}
            <h1 className="text-style large-text textShadow">Hello, I'm Androw</h1>
            <h2 id="typEffect" className="text-style medium-text"></h2>
        </Grid>
    )
}

export default Home;