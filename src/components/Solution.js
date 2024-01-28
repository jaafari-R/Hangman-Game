import React from 'react'

export default function Solution({hint, guessed}) {
  return (
    <div>
        <h3>{hint}</h3>
        <p className="guessed-word">{guessed}</p>
    </div>
  )
}
