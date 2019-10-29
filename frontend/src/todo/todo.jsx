import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pagerHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos' //url backend

export default class Todo extends Component {
    constructor(props) {
       super(props)
       //estado inicial do objeto
       //alterar os estado setState({})
       this.state = { 
            description: '',
            list: [] 
        }

       this.handleChange = this.handleChange.bind(this) 
       this.handleAddF = this.handleAddF.bind(this) 
       this.handleRemove = this.handleRemove.bind(this)

       this.refresh()
    }

    //e - evento do ochange
    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value }) //pegar os valores do form
    }

    //buscar dados 
    refresh () {
        axios.get(`${URL}?sort=-createdAt`) //ordenado resultado
            .then((resp) => this.setState({...this.state, description: '', list: resp.data}))
    }

    //manipular o evento
    handleAddF() {
    //   console.log(this.state.description)
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())

    }


    //remover elemento
    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh())
    }


    render(){
        return (
            <div>
                <PageHeader name="Tarefar" small="Cadastro"/>
                <TodoForm  description={this.state.description}
                           handleChange={this.handleChange}
                           handleAdd={this.handleAddF} />
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove}/>
            </div>
        )
    }
}