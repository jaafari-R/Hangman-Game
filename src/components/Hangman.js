import React, { useState } from 'react'

import Body from './body/Body';
import Head from './body/Head';
import LeftHand from './body/LeftHand';
import RightHand from './body/RightHand';
import LeftLeg from './body/LeftLeg';
import RightLeg from './body/RightLeg';
import Solution from './Solution';

const ATTEMPTS = 6;

export default function Hangman() {
    const [hangman, setHangman] = useState([
        <Head />, <Body />, <RightHand />, <LeftHand />, <RightLeg />, <LeftLeg />
    ]);
    const [word, setWord] = useState("Apple");
    const [hint, setHint] = useState("A food aday keeps the doctor away.");
    const [guessed, setGuessed] = useState("_____");
    const [remainingAttempts, setRemainingAttempts] = useState(ATTEMPTS);

    const guessLetter = (letter) => {

    }

    return (
        <div>
            {hangman.map(part => part)}
            <Solution hint={hint} guessed={guessed} />
        </div>
    )
}
