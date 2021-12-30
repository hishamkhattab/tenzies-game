import React, {useState, useEffect} from "react"
import Dice from "./Dice"
import { nanoid } from 'nanoid'

export default function App() {

    const [dice, setDice] = useState(generateDice())


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
            id:nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld:false
        }
    }
    /**
     * when clicking on a die it hold it
     * @param {*} id the id of the clicked die
     */
    function holdDice(id) {
        setDice(prevState => prevState.map( die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die 
        }))
    }

    /**
     * Everytime roll button clicked,
     * keep selected dice through the game and
     * generate a new set of dice for the ones that didn't get selected
     */
    function rollDice() {
        setDice(prevState => prevState.map(die => {
            return die.isHeld ? die : diceObject()
        }))
    }
    /**
     * Creating an 10 instance of Dice component
     * passing a random number at each instance 
     */
    const diceElement = dice.map(die => {
        return <Dice key={die.id} {...die} clickHandle={holdDice}/>
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