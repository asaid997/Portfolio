import { Grid } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'
import '../../css-files/Tabs.css'

function Tabs(props) {
    const {scrollHandler, sections} = props;
    const p = {justify: "center", alignItems: "center", direction: "row"};

    const Tab = (s,i) => {
        const tabHandle = () => scrollHandler.handleTabChange(null,i);
        return (
        <Grid className={`tab-container ${scrollHandler.index === i ? 'red-border' : ''} font-bolder not-selectable`}
        key={s} item xs={2} container {...p}
        onClick={tabHandle}
        >
                <div>{s.length > 5 && window.innerWidth < 700? s.slice(0,4) : s}</div>
        </Grid>
        )
    }

    return (
        <Grid
        id="tabs"
        container
        {...p}
        >
            {sections.map((s,i) => Tab(s,i))}
        </Grid>
    )
}


export default inject("scrollHandler")(observer(Tabs));