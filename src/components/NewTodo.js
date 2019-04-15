import React, { Component } from 'react'
import todosService from '../services/todos-service'

class NewTodo extends Component {

  state = {
    title: '',
    body: '',
  }

  handleChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value }
    )
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    todosService.createTodo(this.state)
    this.props.renderNewTodo(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit} >
        <input type="text" placeholder="title" name="title" onChange={this.handleChange} value={this.state.title} />
        <input type="text" placeholder="description" name="body" onChange={this.handleChange} value={this.state.body} />
        <button>New todo</button>
      </form>
    )
  }
}

export default NewTodo
