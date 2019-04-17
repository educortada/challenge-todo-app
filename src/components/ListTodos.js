import React, { Component } from 'react'

import Todo from './Todo'

class ListTodos extends Component {

  render() {
    return (
      <section>
        <div className="container">
          {
            (this.props.todos.length)
            ? <h4 className="title is-4">Todos list:</h4>
            : <h4 className="title is-4">Nothing to do! <span role="img" aria-label="Clap">👏🏼</span></h4>
          }
          <ul>
            {
              this.props.todos.map(todo => (
                <Todo
                  key={todo._id}
                  todo={todo}
                  renderTodos={this.props.renderTodos}
                />
              ))
            }
          </ul>
        </div>
      </section>
    )
  }
}

export default ListTodos
