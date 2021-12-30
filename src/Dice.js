import React from 'react'

export default function Dice(props) {
    return (
        <div className="die-container">
            <h3>{props.value}</h3>
        </div>
    )
}