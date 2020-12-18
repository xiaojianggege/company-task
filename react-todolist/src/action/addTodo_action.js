import { ADD_TODO } from "../static/actionType";

const addTodo = (payload) => {
    return {
        type:ADD_TODO,
        payload
    }
}
export default addTodo