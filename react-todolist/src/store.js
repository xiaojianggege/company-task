import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import reducer from "./reducer";
import { INITIALIZATION } from "./static/actionType";
const store = createStore(
    reducer,
    compose(
       applyMiddleware(thunk),
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)
store.dispatch({
    type: INITIALIZATION
})
export default store