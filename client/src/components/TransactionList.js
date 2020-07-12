import React, { useContext, useEffect } from 'react' // getTransactions is asynchranous calls so useEffect hook
import { Transaction } from './Transaction'

import { GlobalContext } from '../context/GlobalState' // to pull global state in

export const TransactionList = () => {
  // use useContext hook to pull in GlobalContext
  // pull out getTransactions also from the state
  const { transactions, getTransactions } = useContext(GlobalContext) // use {destructuring} to pull out transactions

  // useEffect is good for http requests, since calling just getTransactions() will end up in infinite loop
  // add and empty array [] as 2nd perim
  useEffect(() => {
    // call getTransacions
    getTransactions()
    // to remove warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, 1)

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
