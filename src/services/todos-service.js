import axios from 'axios'

class TodosService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:4000/api/v1',
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  createTodo = (todo) => {
    return this.api.post('/todos', todo)
      .then(({ data }) => data)
  }

  getAllTodos = () => {
    return this.api.get('/todos')
      .then(({data}) => data)
  }
}

const todosService = new TodosService()

export default todosService
