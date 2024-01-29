import React, { useState } from 'react'

import Body from './body/Body';
import Head from './body/Head';
import LeftHand from './body/LeftHand';
import RightHand from './body/RightHand';
import LeftLeg from './body/LeftLeg';
import RightLeg from './body/RightLeg';
import Solution from './Solution';
import Letters from './Letters';
import Gameover from './Gameover';

const ATTEMPTS = 6;
const SCORES = [0, 10, 25, 40, 60, 75, 100];

export default function Hangman() {
    const [hangman, setHangman] = useState([
        <Head />, <Body />, <RightHand />, <LeftHand />, <RightLeg />, <LeftLeg />
    ]);
    const [word, setWord] = useState("Apple");
    const [hint, setHint] = useState("A food aday keeps the doctor away.");
    const [score, setScore] = useState(100)
    const [guessed, setGuessed] = useState("_____");
    const [remainingAttempts, setRemainingAttempts] = useState(SCORES[ATTEMPTS]);

    const guessLetter = (letter) => {
        letter = letter.toLowerCase();
        const wordCopy = word.toLowerCase();
        
        if(wordCopy.includes(letter)) {
            let newGuessed = guessed;
            for(let i = 0; i < word.length; ++i) {
                if(wordCopy[i] === letter) {
                    newGuessed = newGuessed.slice(0, i) + word[i] + newGuessed.slice(i+1);
                }
            }
            setGuessed(newGuessed);
        }
        else {
            const newRemainingAttempts = remainingAttempts - 1;
            setRemainingAttempts(newRemainingAttempts);
            setScore(SCORES[newRemainingAttempts])
            const newHangman = hangman;
            newHangman.splice(-1, 1);
            setHangman(newHangman);
        }
    }

    return (
        <div>
            {hangman.map(part => part)}
            <Solution score={score} hint={hint} guessed={guessed} />
            <Letters guessLetter={guessLetter} />
            {remainingAttempts <= 0 && <Gameover />}
        </div>
    )
}
