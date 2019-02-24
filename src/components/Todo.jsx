import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag'

class Todo extends Component {
  state = {
    newTodoText:'',
  }
  updateTodo = (id,completed)=>{
    this.props.updateTodo({
      variables: {id, completed},
      update: (proxy, {data:{deleteTodo}}) =>{
        this.props.todos.refetch()
      }
    })
  }
  deleteTodo = (id) =>{
    this.props.deleteTodo({
      variables:{ id: id },
      update: (proxy, {data:{deleteTodo}}) =>{
        this.props.todos.refetch()
      }
    })
  }
  
  addTodo = ()=>{
    const {newTodoText} = this.state;
    this.props.addTodo({
      variables:{text: newTodoText },
      update: (proxy, {data:{createTodo}}) =>{
        this.props.todos.refetch()
      }
    })
  }
  renderTodos = ()=> (
    <ul>
      { this.props.todos.allTodoes.map(todo => 
        <li
           key={todo.id}
           onClick={() => this.updateTodo(todo.id, !todo.completed)}>
          <span style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }} >{todo.text}</span>
          <span onClick={() => this.deleteTodo(todo.id)} >  -  Delete</span>
        </li>)
      }
    </ul>
  );
  render() {
    const{
      todos
    }  = this.props;
    
    return (
      <React.Fragment>
          { 
            todos.loading 
            ? 'Carregando' 
            : this.renderTodos()
          }
          <div>
            <input 
              type="text" 
              value={this.state.newTodoText}
              onChange={e => this.setState({newTodoText: e.target.value})}
              />
            <input type="submit" value="create" onClick={this.addTodo}/>
          </div>
      </React.Fragment>
    )
  }
}

const TodosQuery = gql`
    query {
        allTodoes {
            id
            text
            completed
        }
    }
`;
const AddTodo = gql`
  mutation($text: String!){
    createTodo(text: $text){
      id
      text
      completed
    }
  }
`;
const DeleteTodo = gql`
  mutation($id: ID!){
    deleteTodo(id: $id){
      id
      text
      completed
    }
  }`
const UpdateTodo = gql`
  mutation($id: ID!, $completed: Boolean!){
    updateTodo(
      id: $id
      completed: $completed
    ) {
      id
    }
  }
`

export default compose(
  graphql(TodosQuery, { name: 'todos' }),
  graphql(AddTodo,{ name: 'addTodo' }),
  graphql(DeleteTodo, { name: 'deleteTodo' }),
  graphql(UpdateTodo, { name: 'updateTodo' })
) (Todo);