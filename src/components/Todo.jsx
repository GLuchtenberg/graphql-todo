import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import {
    TodosQuery,
    AddTodo,
    DeleteTodo,
    UpdateTodo,
} from './query';

const TodoItem = ({ todo }) => {
    const updateTodo = useMutation(UpdateTodo, {
        variables: { id: todo.id, completed: !todo.completed },
        refetchQueries: [{ query: TodosQuery }],
    });

    const deleteTodo = useMutation(DeleteTodo, {
        variables: { id: todo.id },
        refetchQueries: [{ query: TodosQuery }],
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li onClick={updateTodo}>
            <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
            }}
            >
                {todo.text}

            </span>
            <span onClick={deleteTodo}>  -  Delete</span>
        </li>
    );
};


const Todos = ({ todos }) => (
    <ul>
        {
            todos.map(todo => <TodoItem todo={todo} key={todo.id} />)
        }
    </ul>
);
const TodoList = () => {
    const {
        data, loading,
    } = useQuery(TodosQuery);
    const [value, setValue] = useState('');
    const allTodoes = data.allTodoes ? data.allTodoes : [];
    const addTodo = useMutation(AddTodo, {
        variables: { text: value },
        refetchQueries: [{ query: TodosQuery }],
    });
    return (
        <React.Fragment>
            {
                loading
                    ? 'Carregando'
                    : <Todos todos={allTodoes} />
            }
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <input
                    type="submit"
                    value="create"
                    onClick={() => {
                        addTodo();
                        setValue('');
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default TodoList;
