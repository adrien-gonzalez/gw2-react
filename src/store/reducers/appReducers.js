const initialState = { apiKey: {key: 0}, appColor: {color: 0}, tasks: {update: false} }

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
        case 'UPDATE_APP_COLOR':
            // console.log("state", state);
            nextState = {
                ...state, appColor: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
        case 'UPDATE_TASK':
            // console.log("state", state);
            nextState = {
                ...state, tasks: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
    default:
    return state
  }
}

export default appState;