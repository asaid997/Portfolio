import { Grid } from '@material-ui/core'
import React from 'react'

export default function Title(props) {
    return (
        <Grid item container className="not-selectable" direction="column" justify="center" alignItems="center" xs={12}>
            <div id="about-head" style={props.color && {color: 'var(--white)'}} data-aos="my-slide-right" data-aos-delay="400" className="text-style header" >{props.title}</div>
            <div data-aos="my-slide-right" data-aos-delay="700" className="header-line"></div>
        </Grid>
    )
}
