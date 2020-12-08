
const defaultState = {
    a: 1
}
const action = [
    {type: 'ADD', a: 3},
    {type: 'ADD', a: 4},
    {type: 'ADD', a: 52}
]
const reducer = (state = defaultState, action) => {
    console.log(state, action);
    switch(action.type) {
        case 'ADD':
            state.a = action.a
            return state
        default:
            return state
    }
}

let newState = action.reduce(reducer, defaultState)
console.log(newState);
