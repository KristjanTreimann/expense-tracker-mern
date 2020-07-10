// Reducer is how we specify the application state changes in response to certain actions to our store, to our context
// Reducer is a way to change your state and send it down to your component, your application
// Now we cant just change the state we need to create a new state and sent it down
// bare minimum we need:
// export a default function that takes in state and some kind of action. Then we have a switch based on type
// Were going to have add transaction type, delete transaction type and default
export default (state, action) => {
  // we are checking the actions type with switch
  switch (action.type) {
    // create case for DELETE_TRANSACTION from GlobalState.js
    case 'DELETE_TRANSACTION':
      return {
        // use the spread operator (...) and send the current state
        ...state,
        // what we want to change is the transactions value. so we want to send down all transactions except the one that was deleted
        // we have that id sent in a payload
        // use filter to remove deleted ones. For each transaction, where id is not equal to action.payload
        // In GlobalState.js we dispatched an action with a type and payload.
        // Type is delete_transactions and its going to run this, because we are checking action.type in switch
        // We have a id in payload so we filter out anything that has this id
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        )
      }

    case 'ADD_TRANSACTION':
      return {
        ...state, // return initial state
        // return transactions whats already in there in addition to one in the payload
        // set this to an array, get inital by using spread operator and add new transaction from action.payload
        transactions: [action.payload, ...state.transactions]
      }
    default:
      // default return state as it is
      return state
  }
}
