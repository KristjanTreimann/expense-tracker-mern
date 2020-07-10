// Here we create a context
// Were gonna have global reducer as well
import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

// Initial state. Single object. Any global state will go to this object. However we need only transactions atm.
// We can use global state in components and manipulate it when we pass this data down.
const initialState = {
  transactions: []
}

// We need to create global context using createContext
// Create context, export to use in other files components, createContext(gets passed in our initial state)
export const GlobalContext = createContext(initialState)

// In order to other components have access to our global state we need to have a provider
// We need to wrap all our components shown in App.js in a provider component
// Provider component, use export to bring into App.js file
// Since we are wrapping components are going to be children and we are using destructuring
export const GlobalProvider = ({ children }) => {
  // we use useReducer, we want access to state and when using useReducer we need to call dispatch
  const [state, dispatch] = useReducer(AppReducer, initialState) // useReducer(takes in whatever the reducer is(create separate file for that), and also initialState)

  // Actions what are making calls to our reducer
  // function deleteTransaction(takes in id of which one to delete)
  // We can dispatch to our reducer our object. Were gonna have a type which is string called 'DELETE_TRANSACTION'
  // It also needs a payload what is any data we want to send to it. Currently it is id
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    })
  }

  function addTransaction(transaction) {
    // Takes in entire transaction
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    })
  }

  // We actually need provider component, so use return and put children prop inside
  // Provider provides our state and provides our actions to the components its wrapped around
  // Provider is going to have a value prop with object and we pass in transactions
  // Way we can access anything in this object initialState is 'state.whatever_we_want'
  // So that way we can access this 'transactions' from any component that we requested from using 'useContext'
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction /*  In order to use delete pass it here to provider and now we can pull it to other components */,
        addTransaction // in order to access it pass it in to provider
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
