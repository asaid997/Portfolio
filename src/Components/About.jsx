import { Grid } from '@material-ui/core'
import React from 'react'
import ProgressBar from './Helpers/ProgressBar';
import DevicesIcon from '@material-ui/icons/Devices';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import Badge from './Helpers/Badge';

function About() {
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

    const iconSize = '6vmin';
    const tablets = [
        ['Team player','Commited to my teams success.',<GroupOutlinedIcon className="icon" style={{fontSize: iconSize}}/>],
        ['Clean code','Follows oop and mvc principles.',<CodeOutlinedIcon className="icon" style={{fontSize: iconSize}}/>],
        ['Organized','Carefully plan projects.',<PlaylistAddCheckIcon className="icon" style={{fontSize: iconSize}}/>],
        ['Responsive','Layouts work on any device.',<DevicesIcon className="icon" style={{fontSize: iconSize}}/>],
    ]
    
    
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item container direction="column" justify="center" alignItems="center" xs={12}>
                <div id="about-head" data-aos="my-slide-right" data-aos-delay="400" className="text-style header" >About</div>
                <div data-aos="my-slide-right" className="header-line"></div>
            </Grid>

            <Grid item container direction="column" justify="center" alignItems="center" xs={12}>
                    <div className="paper-container medium-text font-bold" data-aos="zoom-in-right">
                            <p>
                                Enrolled in a BSc of computer sience.<br/>
                                <div className="divider"></div>
                                Software developer who loves to build and create.<br/>
                                <div className="divider"></div>
                                Love exploring new domains of programming and computer sience.<br/>
                                <div className="divider"></div>
                                Currently seeking an entry position.
                            </p>
                    </div>
            </Grid>

            <Grid id="about-skills" item container direction="row" >
                <Grid className="all-progress-container" item container data-aos="my-slide-right" justify="center" alignItems="center" xs={12} md={6} spacing={2}>
                    {subjects.map((s,i) => <ProgressBar key={s[0]} subject={s[0]} percent={s[1]} i={i}/>)}
                </Grid>
                <Grid className="badges-container" item container direction="row" xs={12} md={6}>
                    {tablets.map( (t,i) => <Badge t={t} i={i}/> )}  
                </Grid>
            </Grid>
        </Grid>
    )
}

export default About;