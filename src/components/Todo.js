import React, { Component } from 'react'
import todosService from '../services/todos-service'

class Todo extends Component {

  state = {
    title: '',
    body: '',
    hasModified: false,
  }

  handleChange = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value,
      hasModified: true,
    })
  }

  handleOnSubmit = async (id, event) => {
    try {
      event.preventDefault()
      const { title, body } = this.state
      await todosService.updateTodo(id, { title, body })
      this.props.renderTodos()

    } catch (error) {
      console.log(error)
    }
  }

  handleClickDelete = async (id) => {
    try {
      await todosService.deleteTodo(id)
      this.props.renderTodos()

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { _id, title, body } = this.props.todo
    return (
      <li>
        <article className="message is-info">
          <div className="message-header">
            <p>Todo</p>
            <button onClick={() => { this.handleClickDelete(_id) }} className="delete"></button>
          </div>
          <div className="message-body">
            <form onSubmit={(event) => { this.handleOnSubmit(_id, event) }}>
              <div className="field">
                <div className="control">
                  <input className="input" type="text" placeholder={title} name="title" onChange={this.handleChange} value={this.state.title} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input" type="text" placeholder={body} name="body" onChange={this.handleChange} value={this.state.body} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                {
                  (this.state.hasModified) ? <button className="button is-link">Update</button> : false
                }
                </div>
              </div>
            </form>
          </div>
        </article>
      </li>
    )
  }
}

export default Todo
