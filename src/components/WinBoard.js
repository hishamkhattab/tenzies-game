import React from 'react'

function WinBoard(props) {
    const diff = (props.endTime - props.startTime) / 1000;
    const timeArray = localStorage.getItem('Times') ? JSON.parse(window.localStorage.getItem('Times')) : [];
    timeArray.push(diff.toFixed(2));

    
    React.useEffect(() => {
        window.localStorage.setItem("Times",JSON.stringify(timeArray))
    })

    return (
        <div className='board'>
            <span>Time: {diff.toFixed(2)} Sec</span>
            <span>Steps: {props.steps}</span>
            <span>{timeArray.sort( (a,b) => a-b )} | </span>
        </div>
    )
}

export default WinBoard
