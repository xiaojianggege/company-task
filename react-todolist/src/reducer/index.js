import { INITIALIZATION, ADD_TODO}  from '../static/actionType'
const initState = {
    todoList: [{
            id: 0,
            thing: '吃饭',
            completed: false
        },
        {
            id: 1,
            thing: '睡觉',
            completed: false
        },
        {
            id: 2,
            thing: '上班',
            completed: false
        },
        {
            id: 3,
            thing: '新增Vue测试',
            completed: false
        }],
    thingID: 3 // 用来保存时间的id属性
}
const reducer = (state = initState, action) => {
    const { type, payload } = action
    const { todoList } = state
    switch (type) {
        case INITIALIZATION:
            return {...state}
        case ADD_TODO:
            return {...state, todoList: [...todoList, payload]}
    }
}

export default reducer