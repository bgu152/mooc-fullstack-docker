import React from 'react';
import TodoComponent from './TodoComponent';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {

  return (
    <>
      {todos.reduce((acc, cur, index) =>
        [...acc, <hr key={index}/>,
        <TodoComponent
          key={index + 1000}
          todo={cur}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
        ], [])}
    </>
  )
}

export default TodoList
