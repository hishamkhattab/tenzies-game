import React, {useState, useEffect} from "react"
import Dice from "./components/Dice"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import WinBoard from "./components/WinBoard"
import {useWindowSize} from 'react-use';

export default function App() {

    //get the width and the height of the screen
    const { width, height } = useWindowSize();

    /***********************
     * set states **********
     ***********************/
    
    //control the dice
    const [dice, setDice] = useState(generateDice())
    //control when to win
    const [tenzies, setTenzies] = useState(false)
    //control number of steps to win
    const [steps, setSteps] = useState(0)
    //constrol the time the game started
    const [start, setStartTime] = useState('');
    //constrol when the game started
    const [hasStarted, setHasStarted] = useState(false);
    //constrol the time the game ended
    const [end, setEndTime] = useState('');
    //control the best record board
    const [showBoard, setShowBoard] = useState(false)



    /**
     * use effect to link the two states together 
     */
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSame = dice.every(die => die.value === firstValue);
        if (allHeld && allSame) {
            let date = new Date();

            setEndTime(date.getTime());
            setHasStarted(false);
            setTenzies(true);
        }
    }, [dice])


    /******************
     * functions ******
     *****************/

    /**
     * function to imitate the dice throughing 
     * @returns an array of length 10 with random values from (1 - 6)
     * it will only generated in the start of the game
     */
    function generateDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++) {
            diceArray.push(diceObject())
        }
        return diceArray
    }


    // return a die with unique id and random number from (1-6)
    function diceObject() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }


    /**
     * when clicking on a die it hold it
     * @param {*} id the id of the clicked die
     */
    function holdDice(id) {
        setDice(prevState => prevState.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }


    /**
     * Everytime roll button clicked,
     * keep selected dice through the game and
     * generate a new set of dice for the ones that didn't get selected
     */
    function rollDice() {
        let date = new Date();
        showBoard(false)
        if (hasStarted === false) {
            setHasStarted(true);
            setStartTime(date.getTime())
        }

        if (!tenzies) {
            setDice(prevState => prevState.map(die => {
                return die.isHeld ? die : diceObject()
            }))
            setSteps(prevTime => prevTime + 1)
        } else {
            setTenzies(false);
            setDice(generateDice());
            setSteps(0)
        }
    }


    /**
     * Creating an 10 instance of Dice component
     * passing a random number at each instance 
     */
    const diceElement = dice.map(die => {
        return <Dice key={die.id} {...die} clickHandle={holdDice} />
    })



    /**
     * looping over local storage to render the 3 best times
     */
    const bestTimes = localStorage.getItem("Times") ?
        JSON.parse(localStorage.getItem("Times")) : [];
    
    let bestElements = [];
    bestElements = bestTimes.slice(0,3).sort((a, b) => a - b).map((time, idx) => {
        return (
            <span key={idx}>{time}</span>
        )
    })

    function showRecord() {
            setShowBoard( prev => !prev)
    }

    return (
        <main>
            {tenzies && <Confetti width={width} height={height}/>}
            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice'>
                {diceElement}
            </div>
            <button onClick={rollDice}>{tenzies ? "NEW GAME" : "ROLL"}</button>
            {tenzies && <WinBoard steps={steps} startTime={start} endTime={end} />}
            <button onClick={showRecord}>SHOW RECORD</button>
            {showBoard && <div className="record"> {bestElements} </div>}
            </main>
            )
}