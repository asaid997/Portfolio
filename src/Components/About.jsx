import { Grid } from '@material-ui/core'
import { inject, observer } from 'mobx-react';
import React from 'react'



function About(props) {
    const { styles } = props;
    const { aboutSyles } = styles;
    const classes = aboutSyles.useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item container justify="center" alignItems="center" xs={12}>
                <h1 className={`text-style ${classes["about-head"]}`} >About</h1>
            </Grid>
            <Grid item container justify="center" alignItems="center" xs={12} sm={6} lg={3}>
                <p>p1</p>
            </Grid>
            <Grid item container justify="center" alignItems="center" xs={12} sm={6} lg={3}>
                <p>p2</p>
            </Grid>
            <Grid item container justify="center" alignItems="center" xs={12} sm={6} lg={3}>
                <p>p3</p>
            </Grid>
            <Grid item container justify="center" alignItems="center" xs={12} sm={6} lg={3}>
                <p>p4</p>
            </Grid>
        </Grid>
    )
}

export default inject("styles")(observer(About));