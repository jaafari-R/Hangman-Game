import React from 'react';
import "./Solution.css";

export default function Solution({hint, guessed, score}) {
  return (
    <div>
        <h5>Score: <span className={score >= 80 ? "high-score" : score >= 50 ? "medium-score" : "low-score"}>
          {score}
        </span></h5>
        <h5 className='hint'>Hint: {hint}</h5>
        <p className="guessed-word">{guessed}</p>
    </div>
  )
}
