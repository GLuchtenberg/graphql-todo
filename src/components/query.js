import gql from 'graphql-tag';

export const TodosQuery = gql`
    query {
        allTodoes {
            id
            text
            completed
        }
    }
`;
export const AddTodo = gql`
  mutation($text: String!){
    createTodo(text: $text){
      id
      text
      completed
    }
  }
`;
export const DeleteTodo = gql`
  mutation($id: ID!){
    deleteTodo(id: $id){
      id
      text
      completed
    }
  }`;
export const UpdateTodo = gql`
  mutation($id: ID!, $completed: Boolean!){
    updateTodo(
      id: $id
      completed: $completed
    ) {
      id
    }
  }
`;
