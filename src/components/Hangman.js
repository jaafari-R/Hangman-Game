import React, { useState } from 'react'
import "./Hangman.css";

import Solution from './Solution';
import Letters from './Letters';
import Gameover from './Gameover';

const MAX_ATTEMPTS = 6;
const SCORES = [100, 75, 60, 40, 25, 10, 0];
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Hangman() {
    const [hangman, setHangman] = useState("");
    const [word, setWord] = useState("Apple");
    const [hint, setHint] = useState("A food aday keeps the doctor away.");
    const [score, setScore] = useState(SCORES[0])
    const [guessed, setGuessed] = useState("_____");
    const [failedAttempts, setRemainingAttempts] = useState(0);
    const [letters, setLetters] = useState(initLetters());
    
    function getHangmanImg() {
        return `hangman-${failedAttempts}.svg`;
    }

    function initLetters() {
        return LETTERS.map(letter => {
            return {letter: letter, used: false};
        }); 
    }

    const removeLetter = (letter) => {
        const newLetters = [...letters];
        const letterIndex = newLetters.findIndex(l => l.letter === letter);
        newLetters[letterIndex] = {letter: " ", used: true};
        setLetters(newLetters);
    }

    failedAttempt() {
        const newFailedAttempts = failedAttempts + 1;
        setRemainingAttempts(newFailedAttempts);
        setScore(SCORES[newFailedAttempts])
    }

    const guessLetter = (letter) => {
        if(failedAttempts === MAX_ATTEMPTS || word === guessed) {
            return;
        }

        removeLetter(letter);
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
            failedAttempt();
        }
    }

    return (
        <div className='hangman'>
            <img src={"hangman/" + getHangmanImg(failedAttempts)} />
            <Solution score={score} hint={hint} guessed={guessed} />
            <Letters letters={letters} guessLetter={guessLetter} />
            {MAX_ATTEMPTS - failedAttempts <= 0 && <Gameover />}
        </div>
    )
}
