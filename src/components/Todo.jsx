import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { TodosQuery,
         AddTodo,
         DeleteTodo,
         UpdateTodo,
                      } from './query'

const Todo = ({todo}) => {

  const updateTodo = useMutation(UpdateTodo,{
    variables:{ id: todo.id, completed: !todo.completed },
    refetchQueries:[{query:TodosQuery}],
  });

  const deleteTodo = useMutation(DeleteTodo, {
    variables: {id:todo.id},
    refetchQueries:[{query:TodosQuery}]
  });

  return (
    <li
        onClick={updateTodo}>
        <span style={{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }} >{todo.text}</span>
        <span onClick={deleteTodo} >  -  Delete</span>
    </li>
  )
}


const Todos = ({todos}) => {
  return (
    <ul>
      { 
        todos.map(todo => 
          <Todo todo={todo} key={todo.id}/>
        )
      }
    </ul>
  )
}
const TodoList = () => {
    const {
      data, loading
    } = useQuery(TodosQuery)
    const [ value , setValue ] = useState('');
    const allTodoes = data.allTodoes ? data.allTodoes : [];
    const addTodo = useMutation(AddTodo,{
      variables: {text: value},
      refetchQueries: [{query:TodosQuery}]
    })
    return (
      <React.Fragment>
           { 
             loading 
             ? 'Carregando' 
             : <Todos todos={allTodoes}/>
           }
           <div>
             <input 
               type="text" 
               value={value}
                onChange={e => setValue( e.target.value)}
               />
              <input type="submit" value="create" onClick={addTodo}/>
           </div>
      </React.Fragment>
    ) 
}

export default TodoList;