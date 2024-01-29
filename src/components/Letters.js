import React, { useState } from 'react'
import Letter from './Letter';
import "./Letters.css";

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Letters({guessLetter}) {
    const [usedLetters, setUsedLetters] = useState([]);
    const [letters, setLetters] = useState(initLetters());
    
    function initLetters() {
        return LETTERS.map(letter => {
            return {letter: letter, used: false};
        }); 
    }

    const guessAndRemoveLetter = (letter) => {
        guessLetter(letter);
        const newLetters = [...letters];
        const letterIndex = newLetters.findIndex(l => l.letter === letter);
        newLetters[letterIndex] = {letter: " ", used: true};
        setLetters(newLetters);
    }

    return (
        <div className='letters'>
            {letters.map(letter => <Letter letter={letter.letter} used={letter.used} guessLetter={guessAndRemoveLetter}/>)}
        </div>
    )
}
