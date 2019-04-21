import React, { Component } from 'react'
import todosService from '../services/todos-service'

class NewTodo extends Component {

  state = {
    title: '',
    body: '',
    errorMessage: null,
  }

  handleChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value }
    )
  }

  handleOnSubmit = async (event) => {
    try {
      event.preventDefault()
      const { title, body } = this.state
      await todosService.createTodo({ title, body })
      this.props.renderTodos()
      this.setState({
        title: '',
        body: '',
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

  render() {
    const { errorMessage } = this.state
    return (
      <section className="has-bg-white-ter">
        <div className="container">
          <form onSubmit={this.handleOnSubmit}>
            <div className="field">
              <label className="label is-medium">New todo</label>
              <div className="control">
                <input className="input" type="text" placeholder="title" name="title" onChange={this.handleChange} value={this.state.title} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="description" name="body" onChange={this.handleChange} value={this.state.body} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link has-text-weight-semibold">Create</button>
              </div>
            </div>
          </form>
          {
            errorMessage &&
            <article className="message is-error">
              <div className="message-body">{errorMessage}</div>
            </article>
          }
        </div>
      </section>
    )
  }
}

export default NewTodo
