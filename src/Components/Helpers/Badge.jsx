import { Grid, Hidden } from '@material-ui/core'
import React from 'react'
import Octagon from './Octagon'

export default function Badge(props) {
    const {t,i} = props;

    return (
        <Grid container direction="column" alignItems="center" item md={6} xs={3}>
            <div className="badge-icon-container" data-aos="my-flip" data-aos-anchor="#about-head" data-aos-delay={`${i * 4}00`}>
                {t[2]}
                <Octagon color={(i==1 || i==2) ? 'dark' : 'light'}/>
            </div>
            <p data-aos="zoom-in" data-aos-anchor="#about-head"
                data-aos-delay={`${i * 4 +2}00`} className="medium-text center-text">
                <span className="font-bolder">{t[0]}</span>
                <br />
                <span className="font-light">{t[1]}</span>
            </p>
        </Grid>
    )
}
