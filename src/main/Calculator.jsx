import React, {Component} from 'react'
import './Calculator.css'
import Button from '../components/Button.jsx'
import Display from '../components/Display'

// estado da aplicação
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null, 
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    //chamando o estado inicial
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        //voltando ao estado inicial
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        //mudando o current para 1, para acessar values[1]
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const result = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                //o resultado fica armazenado em values[0]   
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }
            //o value[1] recebe zero
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: result ? null : operation,
                current: result ? 0 : 1,
                clearDisplay: ! result,
                values
            })
        }
    }

    addDigit(n) {
        //impendindo q tenha mais de um '.' no display
        if (n === '.' && this.state.displayValue.includes('.')) {
            //para evitar o erro gerado ao apertat varias vezes o '.', eu eu fiz o if retornar o stado atual da calculadora, assim nn perdendo os dados digitado e nem gerando erro
            return this.setState({...this.state}) 
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}

