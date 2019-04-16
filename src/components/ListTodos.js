import React, { Component } from 'react'

import Todo from './Todo'

class ListTodos extends Component {

  render() {
    return (
      <section>
        <div className="container">
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
