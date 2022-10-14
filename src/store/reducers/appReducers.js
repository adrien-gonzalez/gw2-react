const initialState = { apiKey: {key: 0} }

function appState(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'UPDATE_API_KEY':
            // console.log("state", state);
            nextState = {
                ...state, apiKey: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
    default:
    return state
  }
}

export default appState;