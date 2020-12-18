import React from 'react';
import './1.css'
import store from "./store";
import { init_data, addTodo } from './action/index'
import { Provider, connect} from  'react-redux'
import { getInitData, postAddTodo } from './server/index'

const mapStateToProps = state => { // 映射子组件中的props的值
    return {
        todoList: state.todoList,
    }
}

class Conclusion extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <li>
                <span>{this.props.completedTotal}已完成 / {this.props.listLength}总数</span>
            </li>
        )
    }
}

class AddTask extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            todoThing: ''
        }
    }

    addTodoThing = () => {
        const todoThing = this.state.todoThing
        if (!todoThing.trim()){
            alert('请输入要添加的事情')
            return
        }
        this.props.addThing(todoThing)
    }
    changeTodoThing = (e) => {
        this.setState({todoThing: e.target.value})
    }

    render(){
        const todoThing = this.state.todoThing
        return (
            <div className='task-wrapper'>
                <div className='task'>
                    <span>Task</span>
                    <input placeholder='你想做点什么' value={todoThing} onChange={this.changeTodoThing}></input>
                </div>
                <div className='wrapper'>
                    <div className='button' onClick={this.addTodoThing}>Save Task</div>
                </div>
            </div>
        )
    }
}
class ListWrapper extends React.Component{  
    constructor(props){
        super(props)
    }
    componentDidMount() {
        getInitData().then(r => {
            console.log(r)
        })
    }

    changeCompleted = (id, e) => { // 修改completed的值
        let todoList = this.props.todoList
        todoList = todoList.map(item => {
            if (item.id === id){
                item.completed = e.target.checked
                return item
            }
            return item
        })
        this.setState({
            todoList
        })
    }
    onAddThings = (thing) => { // 添加事件
        const thingID = this.props.thingID + 1
        const todoList = this.props.todoList
        todoList.push({
            id: thingID,
            thing,
            completed: false
        })
        this.setState({todoList,thingID})
    }
    renderDoThing = (thing) => {
        return (
            <li key={thing.id} className={thing.completed ? 'checked' : ''}>
                <input type='checkbox' onClick={(e) => {
                    this.changeCompleted(thing.id, e)
                }}/>
                <span>{thing.thing}</span>
            </li>
        )
    }
    renderContent = () => {
        const todoList = this.props.todoList
        const doThingDom = todoList.map(item => this.renderDoThing(item))
        const onCompletedTotal = todoList.filter(item => item.completed === true).length
        const onListLength = todoList.length
        return (
            <div className='main'>
                <ul>
                    {doThingDom}
                    <Conclusion completedTotal={onCompletedTotal} listLength={onListLength}/>
                </ul>
            </div>
        )
    }
    render(){
        return (
            <div className='app'>
                <div className='title'>
                    React Todo
                </div>
                {this.renderContent()}
                <AddTask addThing={this.onAddThings}/>
            </div>
        )
    }
}

const Com = connect(mapStateToProps)(ListWrapper)

const App = () => (<Provider store={store}><Com /></Provider>)

export default App;
