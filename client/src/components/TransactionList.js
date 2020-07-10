import React, { useContext } from 'react'
import { Transaction } from './Transaction'

import { GlobalContext } from '../context/GlobalState' // to pull global state in

export const TransactionList = () => {
  // use useContect hook to pull in GlobalContext
  const { transactions } = useContext(GlobalContext) // use {destructuring} to pull out transactions
  return (
    <>
      <h3>History</h3>
      <ul className='list'>
        {/* use jsx expression, map transactions and render out  */}
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} /> // as it needs to know which specific transaction to render so we need to pass it in as a prop
          // transaction={transaction-> comes from mapping transactions}
          // What we did was bring transactions in from global state(context), mapping through , and for each one
          // were gonna render a transaction component and pass in a prop
          // because its a list it needs to have a unique key
        ))}
      </ul>
    </>
  )
}
