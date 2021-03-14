import { Grid } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'
import '../../css-files/Tabs.css'
import HomeIcon from '@material-ui/icons/Home';//home
import PermIdentityIcon from '@material-ui/icons/PermIdentity';//about
import AppsIcon from '@material-ui/icons/Apps';//projects
import SchoolIcon from '@material-ui/icons/School';//education
import PhoneIcon from '@material-ui/icons/Phone';//contact

function Tabs(props) {
    const {scrollHandler, sections} = props;
    const p = {justify: "center", alignItems: "center", direction: "row"};
    const arr = [<HomeIcon/>,<PermIdentityIcon/>,<AppsIcon/>,<SchoolIcon/>,<PhoneIcon/>];

    const Tab = (s,i) => {
        const tabHandle = () => scrollHandler.handleTabChange(null,i);
        return (
        <Grid className={`tab-container ${scrollHandler.index === i ? 'selected-tab' : ''} font-bolder not-selectable`}
        key={s} item xs={2} container {...p}
        onClick={tabHandle}
        >
                <div>{window.innerWidth < 700? arr[i] : s}</div>
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