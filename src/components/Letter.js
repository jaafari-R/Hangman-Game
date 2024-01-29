import React from 'react';
import "./Letter.css";

export default function Letter({letter, used, guessLetter}) {

    return (
        <p 
        onClick={() => used || guessLetter(letter)} 
        className={used ? "used" : ""}>
            {letter}
        </p>
    )
}
