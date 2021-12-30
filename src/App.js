import React, {useState, useEffect} from "react"
import Dice from "./Dice"


export default function App() {

    const [dice, setDice] = useState(generateDice())


    /**
     * function to imitate the dice throughing 
     * @returns an array of length 10 with random values from (1 - 6)
     */
    function generateDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++) {
            diceArray.push(Math.ceil( Math.random() * 6))
        }
        return diceArray
    }


    /**
     * Everytime click roll button
     * generate a new set of dice
     */
    function rollDice() {
        setDice(generateDice())
    }
    /**
     * Creating an 10 instance of Dice component
     * passing a random number at each instance 
     */
    const diceElement = dice.map(die => {
        return <Dice value={die} />
    })

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice'>
                {diceElement}
            </div>
            <button onClick={rollDice}>Roll</button>
        </main>
    )
}