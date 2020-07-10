import React, { useState, useContext } from 'react' // bring in {useState} hook
import { GlobalContext } from '../context/GlobalState'

// React uses className instead of class and htmlFor instead of for attribute
export const AddTransaction = () => {
  // Use hooks. Create a piece of state called 'text' and a function to manipulate it 'setText' [text, setText]
  // useState('') empty string by default
  const [text, setText] = useState('')
  const [amount, setAmount] = useState(0) // amount default state is 0, piece of state is called amount and function to manipulate it is called setAmount

  // Add transaction action. Add onSubmit to form what goes to onSubmit 'onSubmit={goes to}'
  const { addTransaction } = useContext(GlobalContext)
  // Pass in event perimeter to onSubmit
  const onSubmit = (e) => {
    e.preventDefault()

    // Build new transaction which is an object
    const newTransaction = {
      id: Math.floor(Math.random() * 10000000000000),
      text: text, // text whats in the form
      amount: +amount // or use just 'amount'. Also parse to an number using '+' sign
    }

    // call action from context and pass in the newTransaction
    addTransaction(newTransaction)
  }

  // connect state to input using 'value' attribute. Set it to piece of state name e.g value={text}
  // use onChange event, because when input changes we need to update piece of state.
  // call a function setText in onChange and pass in whatever we want to set it to. use e.target.value
  // onChange={(e) => setText(e.target.value)} will give whats typed in and sets text
  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter text...'
            text
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount...'
          />
        </div>
        <button className='btn'>Add transaction</button>
      </form>
    </>
  )
}
