import { inject, observer } from 'mobx-react'
import React from 'react'
import KeyboardArrowUpTwoToneIcon from '@material-ui/icons/KeyboardArrowUpTwoTone';
import { Fab } from '@material-ui/core';

function ScrollUp(props) {
    const {scrollHandler} = props;
    const goUp = () => scrollHandler.index = 0;

    return (
        <Fab id="up-button" onClick={goUp} className={`${scrollHandler.index > 0 ? "up-slide-in" : "up-slide-out"} not-selectable`}>
            <KeyboardArrowUpTwoToneIcon id="up-icon"/>
        </Fab> 
    )
}

export default inject("scrollHandler")(observer(ScrollUp));