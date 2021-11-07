const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  if (action.type === 'counter/increment') {
    return {
      ...state,
      value: state.value + 1
    }
  }
  return state
}

console.log(counterReducer(0, 'counter/increment'));