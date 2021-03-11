import { inject, observer } from 'mobx-react';
import React from 'react'

function ProgressBar(props) {
    const { styles, percent, i } = props;
    const { progressStyle } = styles;
    const classes = progressStyle.useStyles();

    return (
        <div className={classes.container}>
            <div className={`${classes.tag} ${classes.centerText}`}>
                {props.subject}
            </div>
            <div style={{ width: `${percent - 20}%` }} className={classes.progressContainer}>
                <div data-aos="width-ease" data-aos-duration="900" 
                data-aos-anchor={/iPhone/i.test(navigator.userAgent) && '#about-head'}
                data-aos-delay={`${i + 13}00`}
                 className={classes.progress}></div>
            </div>
            <div className={`${classes.percent}`}>
                {percent}%
            </div>
        </div>

    )
}


export default inject("styles")(observer(ProgressBar));