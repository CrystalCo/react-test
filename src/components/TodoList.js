import React, { Component } from 'react'
import moment from 'moment'
import { Modal, Header, Actions } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import Todo from './Todo'
import CreateTodo from './CreateTodo'
import url from '../images/React-icon.svg'

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      isFetching: false
    }
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
  }

  componentWillMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.setState({isFetching: true});
    fetch('/api/todos', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    }).then(json => {
      this.setState({todos: json})
      this.setState({isFetching: false});
    }).catch(err => {
      console.log('There was an error', err);
      this.setState({isFetching: false});
    });
  }


  handleCreate(todo) {
    fetch('/api/todos', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(todo)
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    }).then(json => {
      console.log(json);
    }).catch(err => {
      console.log('There was an error', err);
    });

    this.fetchTodos();
  }

  handleEdit(id, _todo) {
    fetch('/api/todo/' + id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(_todo)
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    }).then(json => {
      console.log(json);
    }).catch(err => {
      console.log('There was an error', err);
    });

    this.fetchTodos();
  }

  handleDelete(id) {
    fetch('/api/todo/' + id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    }).then(json => {
      console.log(json);
    }).catch(err => {
      console.log('There was an error', err);
    });

    this.fetchTodos();
  }

  handleToggle(id,done) {
    fetch('/api/todo/' + id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({done: done})
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    }).then(json => {
      console.log(json);
    }).catch(err => {
      console.log('There was an error', err);
    });

    this.fetchTodos();
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <div className="ui inverted segment" style={{borderRadius: '0px'}}>
          <h1 className="ui grey inverted center aligned header">
            <img className="ui large centered image" src={url} />
            <div className="content">React Testing</div>
          </h1>
        </div>
        <div className="ui centered container one column grid">
          <CreateTodo
            handleCreate={this.handleCreate}
          />
        </div>
        <div className="ui centered container three column grid">
          {this.state.isFetching ?
            <div className="ui segment">
              <div className="ui active dimmer">
                <div className="ui massive text loader">Fetching Todos</div>
              </div>
            </div>
            : (this.state.todos.length ?
              this.state.todos.map(todo => {
                return (
                  <Todo key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    project={todo.project}
                    done={todo.done}
                    createdAt={todo.createdAt}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    handleToggle={this.handleToggle}
                  />
                )
              })
              :
              <div className="Column" style={{fontSize: 'xx-large'}}>No Todos</div>)
          }
        </div>
      </div>
    )
  }
}


ReactDOM.render(<TodoList />, document.getElementById('content'));