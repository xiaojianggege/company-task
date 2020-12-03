import React from 'react';
import ReactDom from 'react-dom';
import './1.css'

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

class DoThing extends React.Component{
    constructor(props){
        super(props)
    }

    ChangeStatus = (e) => {
        const id = this.props.id
        this.props.changeStatus(id, e.target.checked)
    }

    render(){
        const thing = this.props.thing
        return (
            <li className={this.props.completed ? 'checked' : ''}>
                <input type='checkbox' onClick={this.ChangeStatus}/>
                <span>{thing}</span>
            </li>
        )
    }
}
class TodoListContent extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const todoList = this.props.todoList
        const doThingDom = todoList.map(item => <DoThing changeStatus={this.props.onChangeCompleted} thing={item.thing}
                                                         id={item.id} key={item.id} completed={item.completed}/>)
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

class TodoWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            todoList: [
                {
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
    }

    changeCompleted = (id,completed) => {
        let todoList = this.state.todoList
        todoList = todoList.map(item => {
            if (item.id === id){
                item.completed = completed
                return item
            }
            return item
        })
        this.setState({
            todoList
        },() => {
            console.log(this.state.todoList)
        })
    }
    onAddThings = (thing) => {
        const thingID = this.state.thingID+1
        const todoList = this.state.todoList
        todoList.push({
            id: thingID,
            thing,
            completed: false
        })
        this.setState({todoList,thingID})
    }

    render(){
        const todoList = this.state.todoList
        return (
            <div className='app'>
                <div className='title'>

                     React Todo

                </div>

                <TodoListContent onChangeCompleted={this.changeCompleted} todoList={todoList}/>
                <AddTask addThing={this.onAddThings}/>
            </div>
        )
    }
}

class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <TodoWrapper/>
    }
}

ReactDom.render(
    <Index></Index>,
    document.getElementById('container')
);
