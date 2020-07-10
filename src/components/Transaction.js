import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState' // to pull global state in

// we need to catch prop(transactions) passed in from TransactionList.js. Use destructuring { transactions}
// or const ... = (props) => {...}. If 'props are used' then you can access props.transaction.text
export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext) // use {destructuring} to pull out transactions

  const sign = transaction.amount < 0 ? '-' : '+'

  return (
    /* Red border if expense, green if income */
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}{' '}
      <span>
        {sign}
        {Math.abs(transaction.amount)}€
      </span>
      <button
        className='delete-btn'
        onClick={() => deleteTransaction(transaction.id)} // use arrow function to call deleteTransaction(pass in id)
      >
        x
      </button>
    </li>
  )
}
