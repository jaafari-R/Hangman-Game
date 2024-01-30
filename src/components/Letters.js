import React, { useState } from 'react'
import Letter from './Letter';
import "./Letters.css";

export default function Letters({guessLetter, letters}) {
    const [usedLetters, setUsedLetters] = useState([]);

    return (
        <div className='letters'>
            {letters.map((letter, index) => <Letter key={index} letter={letter.letter} used={letter.used} guessLetter={guessLetter}/>)}
        </div>
    )
}
