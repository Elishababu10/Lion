// src/actions.js

// Action to increment the state
export const IncAction = () => async dispatch => {
    dispatch({ type: "INCREMENT" });
  };
  
  // Action to decrement the state
  export const DecAction = () => async dispatch => {
    dispatch({ type: "DECREMENT" });
  };