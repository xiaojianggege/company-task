import axios from  'axios'

const initData_url = 'http://localhost/getData.php'
const getInitData = () => {
    return  axios.get(initData_url).then(res => {
        return eval(res.data)
    })
}

const postAddTodo = (url, data) => {
    return  axios.post(url, {
        ...data
    }).then(res => res)
}

export {
    getInitData, postAddTodo
}