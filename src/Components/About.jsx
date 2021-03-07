import { Grid, Hidden } from '@material-ui/core'
import { inject, observer } from 'mobx-react';
import React from 'react'
import Nonagon from './Helpers/Nonagon';
import ProgressBar from './Helpers/ProgressBar';
import DevicesIcon from '@material-ui/icons/Devices';

function About(props) {
    const { styles } = props;
    const { aboutSyles } = styles;
    const classes = aboutSyles.useStyles();

    const subjects = [
        ['Java',90],
        ['JS',90],
        ['C#',80],
        ['Linux',70],
        ['React',90],
        ['SQL',70],
        ['Git',80],
        ['Mongo',70],
        ['NodeJS',90],
        ['C',70],
        ['CSS',80],
    ]
    const tablets = [
        ['title','additional info','more shit',<DevicesIcon className="icon"/>],
        ['responsive','additional info','more shit',<DevicesIcon className="icon"/>],
        ['Accountible','additional info','more shit',<DevicesIcon className="icon"/>],
        ['ahhh','additional info','more shit',<DevicesIcon className="icon"/>],
    ]

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item container direction="column" justify="center" alignItems="center" xs={12}>
                <div id="about-head" data-aos="my-slide-right" data-aos-delay="400" className={`text-style ${classes.aboutHead}`} >About</div>
                <div data-aos="my-slide-right" className={classes.aboutHeadBottom}></div>
            </Grid>

            <Grid item container direction="column" justify="center" alignItems="center" xs={12} style={{marginBottom: "10px"}}>
                    <div className="paper-container medium-text" data-aos="zoom-in-right">
                            <div>Determined aksjhf jkashfdj kashjkdhads </div>
                            <div>An enthusiastic Junior developer seeking an entry level position.</div>
                            <div>Always bandora 5yar bassal salata zakye</div>
                            <br/>
                            <div >anand tjahj thja shjh sdjs</div>
                    </div>
            </Grid>

            <Grid item container direction="row" spacing={6}>
                <Grid data-aos="my-slide-right" item container justify="center" alignItems="center" xs={12} md={6} spacing={2}>
                    {subjects.map((s,i) => <ProgressBar key={s[0]} subject={s[0]} percent={s[1]} i={i}/>)}
                </Grid>
                <Grid  item container direction="row" xs={12} md={6}>
                    {tablets.map( (t,i) => 
                    <Grid  container direction="column" alignItems="center" item md={6} xs={3}> 
                        <div data-aos="my-flip" data-aos-anchor="#about-head" data-aos-delay={`${i*4}00`}>
                            {/* {t[3]} */}
                            <Nonagon />
                        </div>
                        <p data-aos="zoom-in" data-aos-anchor="#about-head" data-aos-delay={`${i*4}00`} className="medium-text aligned-text">
                            {t[0]}
                            <Hidden xsdown> {t[1]}</Hidden>
                            <br/>
                            <Hidden xsdown> {t[2]}</Hidden>
                            </p>
                    </Grid>)}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default inject("styles")(observer(About));