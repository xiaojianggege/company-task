import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'

function BoilingVerdict(props){
    if (props.celsius >= 100){
        return <p>the water is boiling </p>
    }
    return <p>the water is not boil</p>
}

const scaleName = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

function toCelsius(fahrenheit){
    return (fahrenheit-32)*5/9
}

function toFahrenheit(celsius){
    return (celsius*9/5)+32
}

function tryConvert(temperature,convert){
    let input = parseFloat(temperature)
    if (Number.isNaN(input)){
        return ''
    }
    let output = Math.round(convert(input)*1000)/1000// 保留三位小数
    return output.toString()
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.props.onTemperatureChange(e.target.value)
    }

    render(){
        const temperature = this.props.temperature
        const scale = this.props.scale
        return (
            <fieldset>
                <p> Enter temperature in {scaleName[scale]}: </p>
                <input value={temperature} onChange={this.handleChange}/>
            </fieldset>
        )
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            scale: 'c',
            temperature: ''
        }
    }

    handleCelsiusChange = (temperature) => {
        this.setState({scale: 'c',temperature})
    }
    handleFahrenheitChange = (temperature) => {
        this.setState({scale: 'f',temperature})
    }

    render(){
        const temperature = this.state.temperature
        const scale = this.state.scale
        const celsius = scale === 'f' ? tryConvert(temperature,toCelsius) : temperature
        const fahrenheit = scale === 'c' ? tryConvert(temperature,toFahrenheit) : temperature
        return (
            <div>
                <TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput scale='f' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={temperature}/>
            </div>
        )
    }
}

class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Calculator/>
        );
    }
}

ReactDom.render(
    <Index></Index>,
    document.getElementById('container')
);