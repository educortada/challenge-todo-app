import React, { Component } from 'react';
import todosService from './services/todos-service'

import NewTodo from './components/NewTodo'
import ListTodos from './components/ListTodos'

import './App.css';

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

  renderNewTodo = (todo) => {
    this.setState({
      todos: [...this.state.todos, todo]
    })
  }

  render() {
    // eslint-disable-next-line default-case
    switch (this.state.status) {
      case 'isReady':
        return (
          <>
            <h1>Todos</h1>
            <NewTodo renderNewTodo = {this.renderNewTodo} />
            <ul>
              <ListTodos todos = {this.state.todos} /> 
            </ul>
          </>
        )
      case 'isLoading':
        return <p>Loading...</p>
      case 'hasError':
        return <p>Error!</p>
    }
  }
}

export default App
