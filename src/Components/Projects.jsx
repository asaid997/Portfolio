import { Grid } from '@material-ui/core'
import React from 'react'
import Mcard from './Helpers/Mcard'
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Projects() {
    const educationCardsProps = {justify:"center", alignItems:"center",xs: 6,md: 4,lg: 3};

    const githubIcon = <GitHubIcon className="btn-icon"/>
    const cards = [
        ['Bank App',<span>React Materialize<br/>NodeJs Express MongoDB</span>,'bank.png','#c0392b','https://github.com/asaid997/Bank',githubIcon,true],
        ['CRM',<span>React Mobx Material-ui<br/>NodeJs Express SQL</span>,'crm.png','#f39c12','https://github.com/asaid997/CRM',githubIcon,true],
        ['NassApp',<span>React Material-ui<br/>NodeJs Express MongoDB</span>,'nasa.png','#3498db','https://github.com/asaid997/NASSApp',githubIcon,true],
        ['Voice Recognition',<span>Under construction</span>,'nasa.png','lightgrey',false,githubIcon,true],
    ];

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
             <Grid item container direction="column" justify="center" alignItems="center" xs={12}>
                <div id="about-head" data-aos="my-slide-right" data-aos-delay="400" className="text-style header" >Projects</div>
                <div data-aos="my-slide-right" className="header-line"></div>
            </Grid>
            
            <Grid id="projects-container" item container direction="row" xs={12} spacing={2}>
                {cards.map((arr,i) => <Grid item container {...educationCardsProps} ><Mcard arr={arr} i={i}/></Grid>)}
            </Grid>
        </Grid>
    )
}
