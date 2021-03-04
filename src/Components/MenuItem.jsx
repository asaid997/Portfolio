import { ListItem, ListItemText } from '@material-ui/core'
import { inject, observer } from 'mobx-react';
import React from 'react'

function MenuItem(props) {
    const trigerScroll = () => props.scrollHandler.handleTabChange(null,props.index);
    return (
        <ListItem button onClick={trigerScroll} >
            {/* <ListItemIcon></ListItemIcon> */}
            <ListItemText primary={props.text} />
        </ListItem>
    )
}

export default  inject("scrollHandler")(observer(MenuItem));