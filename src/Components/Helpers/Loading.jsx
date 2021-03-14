import React from 'react'

export default function Loading(props) {
    return (
            <img className={`${props.toShow ? "animate-loading" : ""} loading`} alt="loading" src="loading.gif"/>
    )
}
