import { Grid } from '@material-ui/core'
import React from 'react'

export default function Title(props) {
    return (
        <Grid item container direction="column" justify="center" alignItems="center" xs={12}>
            <div id="about-head" style={props.color && {color: 'white'}} data-aos="my-slide-right" data-aos-delay="100" className="text-style header" >{props.title}</div>
            <div data-aos="my-slide-right" data-aos-delay="300" className="header-line"></div>
        </Grid>
    )
}