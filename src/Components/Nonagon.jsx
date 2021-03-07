import React from 'react'
import './Nonagon.css'

export default function Nonagon() {
    return (
        <div className="nonagon-container">
            <div className="square" style={{transform: "rotate(  0deg)"}}></div>
            <div className="square" style={{transform: "rotate( 90deg)"}}></div>
            <div className="square" style={{transform: "rotate( 45deg)"}}></div>
            <div className="square" style={{transform: "rotate(135deg)"}}></div>
        </div>
    )
}
