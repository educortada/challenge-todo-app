import React, { Component } from 'react'
import todosService from '../services/todos-service'

class ListTodos extends Component {

  handleClickDelete = async (id) => {
    await todosService.deleteTodo(id)
    this.props.renderTodos()
  }

  render() {
    return (
      <section>
        <div className="container">
          <ul>
            {
              this.props.todos.map(todo => (
                <li key={todo._id}>
                  <article className="message is-info">
                    <div className="message-header">
                      <p>{todo.title}</p>
                      <button onClick={() => { this.handleClickDelete(todo._id) }} className="delete"></button>
                    </div>
                    <div className="message-body">
                      {todo.body}
                    </div>
                  </article>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
    )
  }
}

export default ListTodos
