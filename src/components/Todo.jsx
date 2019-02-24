import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag'

class Todo extends Component {
  state = {
    newTodoText:'',
  }
  renderTodos = ()=> (
    <ul>
      { this.props.todos.allTodoes.map(todo => 
        <li key={todo.id}>
          {todo.text}
        </li>)
      }
    </ul>
  );
  addTodo = ()=>{
    const {newTodoText} = this.state;
    this.props.addTodo({
      variables:{text: newTodoText },
      update: (proxy, {data:{createTodo}}) =>{
        this.props.todos.refresh()
      }
    })
  }
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

export default compose(
  graphql(TodosQuery, { name: 'todos' }),
  graphql(AddTodo,{ name: 'addTodo' }),
  graphql(DeleteTodo, { name: 'deleteTodo' })
) (Todo);