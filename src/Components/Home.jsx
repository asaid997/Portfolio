import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import Typewriter from 'typewriter-effect/dist/core';
import { inject, observer } from 'mobx-react';

function Home(props) {
    const { styles } = props;
    const { homeStyles } = styles;
    const classes = homeStyles.useStyles();

    useEffect(() => {
        setTimeout(() => new Typewriter('#typEffect', {
            strings: ['Full Stack Developer', 'Software Developer'],
            autoStart: true,
            loop: true
        }),1500);
    }, [])

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center">

            <img src="ana.jpg" alt="" className={classes.myImage}/>
                
            <h1 data-aos="zoom-in" className={`text-style ${classes.intro} main-font font-light`}>Hello, I'm Androw</h1>
            <h3 id="typEffect" className={`text-style font-light ${classes.mediumText}`}></h3>
        </Grid>
    )
}

export default inject("styles")(observer(Home));