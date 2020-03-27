import dataContext from './dataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'action':
      return state
    default:
      return state
  }
}

const add = (dispatch) => (param1, param2, callback) => {
  dispatch({ type: 'acton', payload: {param1, param2} })
  callback()
}


export const { Context, Provider } = dataContext(
  blogReducer, //reducer
  { add }, //actions
  [{ name: 'Mirka Markonen', username: 'mirka-kissa', id: -1 }] //initial state
)