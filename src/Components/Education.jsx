import { Grid } from '@material-ui/core'
import React from 'react'
import Mcard from './Helpers/Mcard'
import Title from './Helpers/Title';


export default function Education() {
    const educationCardsProps = {justify:"center", alignItems:"center",xs: 6,md: 4};

    const syll = 'SYLLABUS'
    const cards = [
        ['BSc Computer Science',<span>Oct 2017 - Mar 2022<br/>HaAkademit Netanya</span>,'netanya.png','#6dd5ed','https://www.netanya.ac.il/degree/bsc-in-computer-science-and-mathematics/#one',syll],
        ['Full Stack Bootcamp',<span>Oct 2020 - Jan 2021<br/>Elevation</span>,'elevation.png','#FF96AA','https://elevation.ac/wp-content/uploads/2020/12/Full-Stack-Bootcamp-Syllabuses.pdf',syll],
        ['Masters - TBD','TBD'],
    ];

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Title title="Education"/>
            <Grid id="education-container" item container direction="row" xs={12} spacing={2}>
                {cards.map((arr,i) => <Grid key={arr[0]} item container {...educationCardsProps} ><Mcard arr={arr} i={i}/></Grid>)}
            </Grid>
        </Grid>
    )
}
