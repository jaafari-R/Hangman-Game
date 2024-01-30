import React from 'react'
import "./Gameover.css"

export default function Gameover({score, restartGame}) {
    return (
        <div className="gameover">
            {
                (score > 0 && 
                    <div className='won'>
                        <h3>You've Won!</h3>
                        <h4>Score: {score}</h4>
                        <button onClick={restartGame}>Restart Game</button>
                    </div>
                )
                ||
                <div className='lost'>
                    <h3>Gameover</h3>
                    <button onClick={restartGame}>Restart Game</button>
                </div>
            }
        </div>
    )
}
