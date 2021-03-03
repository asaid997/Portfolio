import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import Typewriter from 'typewriter-effect/dist/core';

function Home() {

    useEffect(() => {
        new Typewriter('#typEffet', {
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
            <h1 class="text-style large-text">Hello, I am Androw</h1>
            <h2 id="typEffet" className="text-style medium-text"></h2>
        </Grid>
    )
}

export default Home;