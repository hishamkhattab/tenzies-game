import React from "react"
import Dice from "./Dice"


export default function App() {
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice'>
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
            </div>
            <button>Roll</button>
        </main>
    )
}