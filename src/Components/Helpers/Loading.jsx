import React from 'react'

export default function Loading(props) {
    return (
        <div>
            <img className={`${props.toShow ? "animate-loading" : ""} loading`} alt="loading" src="loading.gif"/>
        </div>
    )
}
