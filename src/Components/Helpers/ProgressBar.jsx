import { inject, observer } from 'mobx-react';
import React from 'react'
import '../../css-files/ProgressBar.css'

function ProgressBar(props) {
    const { percent, i } = props;

    return (
        <div className="container">
            <div className="tag center-text-progress-bar">
                {props.subject}
            </div>
            <div style={{ width: `${percent - 20}%` }} className="progress-container">
                <div data-aos="width-ease" data-aos-duration="600" 
                data-aos-anchor=".all-progress-container"
                data-aos-delay={`${i + 14}00`}
                 className="progress"></div>
            </div>
            <div className="percent">
                {percent}%
            </div>
        </div>

    )
}


export default ProgressBar;