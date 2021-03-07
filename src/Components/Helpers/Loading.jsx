import React from 'react'

export default function Loading(props) {
    return (
        <div>
            {props.toShow ? <img className="loading" src="loading.gif"></img> : null}
        </div>
    )
}
