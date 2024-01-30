import React, { useEffect, useState } from 'react'
import "./Hangman.css";

import Solution from './Solution';
import Letters from './Letters';
import Gameover from './Gameover';
import axios from 'axios';

const MAX_ATTEMPTS = 6;
const INIT_SCORES = 100;
const SCORE_PENALITY = 20;
const SCORE_REWARD = 5;
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const X_RapidAPI_Key = process.env.REACT_APP_X_RapidAPI_Key ;
const X_RapidAPI_Host = process.env.REACT_APP_X_RapidAPI_Host;

export default function Hangman() {
    const [word, setWord] = useState("");
    const [hint, setHint] = useState("");
    const [score, setScore] = useState(0)
    const [guessed, setGuessed] = useState("");
    const [failedAttempts, setRemainingAttempts] = useState(0);
    const [letters, setLetters] = useState([]);

    useEffect(() => {restartGame()}, [])
    
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

    const failedAttempt = () => {
        const newFailedAttempts = failedAttempts + 1;
        setRemainingAttempts(newFailedAttempts);
        setScore(score - SCORE_PENALITY)
    }

    const successfulAttempt = (wordCopy, letter) => {
        let newGuessed = guessed;
        for(let i = 0; i < word.length; ++i) {
            if(wordCopy[i] === letter) {
                newGuessed = newGuessed.slice(0, i) + word[i] + newGuessed.slice(i+1);
            }
        }
        setGuessed(newGuessed);
        setScore(score + SCORE_REWARD);
    }

    const guessLetter = (letter) => {
        if(failedAttempts === MAX_ATTEMPTS || word === guessed) {
            return;
        }

        removeLetter(letter);
        letter = letter.toLowerCase();
        const wordCopy = word.toLowerCase();
        if(wordCopy.includes(letter)) {
            successfulAttempt(wordCopy, letter);
        }
        else {
            failedAttempt();
        }
    }

    async function getWord() {
        try {
            const word = (await axios.get("https://random-word-api.herokuapp.com/word")).data[0];
    
            const options = {
                method: 'GET',
                url: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
                headers: {
                    "X-RapidAPI-Key": X_RapidAPI_Key,
                    "X-RapidAPI-Host": X_RapidAPI_Host
                }
              };
            const hint = (await axios.request(options)).data.definitions[0].definition;
            return {word, hint};
        }
        catch(err) {
            return getWord();
        }
    }

    const restartGame = async () => {
        const newWord = await getWord();
        setWord(newWord.word);
        setHint(newWord.hint);
        setScore(INIT_SCORES);
        setRemainingAttempts(0);
        setGuessed(newWord.word.split("").map(l => "_").join(""));
        setLetters(initLetters());
    }

    return (
        <div>
            {(MAX_ATTEMPTS - failedAttempts <= 0 || word === guessed)&& <Gameover score={score} restartGame={restartGame} />}
            <div className='hangman'>
                <img src={"hangman/" + getHangmanImg(failedAttempts)} />
                <div>
                    <Solution score={score} hint={hint} guessed={guessed} />
                    <Letters letters={letters} guessLetter={guessLetter} />
                </div>
            </div>
        </div>
    )
}
