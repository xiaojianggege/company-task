import { INITIALIZATION } from "../static/actionType";

const init_data = (payload) => {
    return {
        type: INITIALIZATION,
        payload
    }
}
export default init_data