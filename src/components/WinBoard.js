import React from 'react'

function WinBoard(props) {
    return (
        <div className='board'>
            <p>Time: {props.time}</p>
            <p>Steps: {props.steps}</p>
        </div>
    )
}

export default WinBoard
