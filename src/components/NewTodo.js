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

  handleOnSubmit = async (event) => {
    try {
      event.preventDefault()
      const { title, body } = this.state
      await todosService.createTodo({ title, body })
      this.props.renderTodos()
      this.setState({
        title: '',
        body: '',
      })

    } catch (error) {
      console.log(error)
    }
  }

  render() {
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
        </div>
      </section>
    )
  }
}

export default NewTodo
