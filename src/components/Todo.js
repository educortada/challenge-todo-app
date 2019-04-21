import React, { Component } from 'react'
import todosService from '../services/todos-service'

class Todo extends Component {

  state = {
    title: this.props.todo.title,
    body: this.props.todo.body,
    status: this.props.todo.status, // 'todo' or 'done'
    hasModified: false,
    errorMessage: null,
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
        errorMessage: null,
      })

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        this.setState({
          errorMessage: error.response.data.message
        })
      }
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

  handleClickDone = async (id) => {
    try {
      await this.setState({ status: 'done' })
      const { title, body, status } = this.state
      await todosService.updateTodo(id, { title, body, status })
      this.props.renderTodos()

    } catch (error) {
      console.log(error)
    }
  }



  render() {
    const { _id } = this.props.todo
    const { errorMessage } = this.state
    let classNameStatus
    (this.state.status === 'done') && (classNameStatus = 'is-done')

    return (
      <li>
        <article className={`message is-info ${classNameStatus}`}>
          <div className="message-header">
            {
              this.state.status === 'todo' &&
              <button onClick={() => { this.handleClickDone(_id) }} className="icon done">
                <i className="fas fa-check"></i>
              </button>
            }
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
                  {this.state.hasModified && <button className="button is-link has-text-weight-semibold">Update</button>}
                </div>
              </div>
            </form>
            {
              errorMessage &&
              <div className="message is-error">
                <div className="message-body">{errorMessage}</div>
              </div>
            }
          </div>
        </article>
      </li>
    )
  }
}

export default Todo
