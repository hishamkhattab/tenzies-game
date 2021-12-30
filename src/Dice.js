import React from 'react'

export default function Dice(props) {

    const styles = { backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" }
    
    return (
        <div className="die-container" style={styles} onClick={() => props.clickHandle(props.id)}>
            <h3>{props.value}</h3>
        </div>
    )
}