import React from 'react'
import '../../css-files/Octagon.css'

export default function Nonagon(props) {
    const {color} = props;
    return (
        <div className="nonagon-container">
            <div className={`square ${color}`} style={{transform: "rotate(  0deg)"}}></div>
            <div className={`square ${color}`} style={{transform: "rotate( 90deg)"}}></div>
            <div className={`square ${color}`} style={{transform: "rotate( 45deg)"}}></div>
            <div className={`square ${color}`} style={{transform: "rotate(135deg)"}}></div>
        </div>
    )
}
