import React from 'react';
import "./Solution.css";

export default function Solution({hint, guessed, score}) {
  return (
    <div>
        <h5>Score: {score}</h5>
        <h5>{hint}</h5>
        <p className="guessed-word">{guessed}</p>
    </div>
  )
}
