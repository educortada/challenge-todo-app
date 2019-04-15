import React, { Component } from 'react'

class ListTodos extends Component {

  render(){
    return(
      this.props.todos.map(todo => (
        <li key={todo._id}>
          <strong>{todo.title}</strong>: {todo.body}
        </li>
      ))
    )
  }
}

export default ListTodos
