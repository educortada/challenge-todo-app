import React, { Component } from 'react'
import todosService from '../services/todos-service'

class Todo extends Component {

  state = {
    title: this.props.todo.title,
    body: this.props.todo.body,
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
      this.setState({
        hasModified: false,
      })

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
    const { _id } = this.props.todo
    return (
      <li>
        <article className="message is-info">
          <div className="message-header">
            <button onClick={() => { this.handleClickDelete(_id) }} className="delete"></button>
          </div>
          <div className="message-body">
            <form onSubmit={(event) => { this.handleOnSubmit(_id, event) }}>
              <div className="field">
                <div className="control">
                  <input className="input title is-5" type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input" type="text" name="body" onChange={this.handleChange} value={this.state.body} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  { (this.state.hasModified) ? <button className="button is-link">Update</button> : false }
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
