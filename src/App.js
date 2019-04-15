import React, { Component } from 'react';
import todosService from './services/todos-service'

import NewTodo from './components/NewTodo'
import ListTodos from './components/ListTodos'

import 'bulma/css/bulma.css'
import './App.css'

class App extends Component {

  state = {
    todos: [],
    status: 'isLoading'
  }

  componentDidMount = async () => {
    try {
      const todos = await todosService.getAllTodos()
      this.setState({
        todos,
        status: 'isReady'
      })

    } catch (error) {
      this.setState({
        status: 'hasError'
      })
    }
  }

  renderTodos = async () => {
    try {
      const todos = await todosService.getAllTodos()
      this.setState({
        todos
      })

    } catch (error) {
      this.setState({
        status: 'hasError'
      })
    }
  }

  render() {
    // eslint-disable-next-line default-case
    switch (this.state.status) {
      case 'isReady':
        return (
          <main>
            <NewTodo renderTodos={this.renderTodos} />
            <ListTodos todos={this.state.todos} renderTodos={this.renderTodos} />
          </main>
        )
      case 'isLoading':
        return <p>Loading...</p>
      case 'hasError':
        return <p>Error!</p>
    }
  }
}

export default App
