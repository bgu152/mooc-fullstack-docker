/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import TodoComponent from './TodoComponent'

test('renders content', () => {
    const todo = {
        text: 'Get a gym membership',
        done: false
    }

    const deleteTodo = jest.fn();
    const completeTodo = jest.fn();

    const { container } = render(
        <TodoComponent
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
        />
    );

    const authorSpan = container.querySelector('.todoStatus');
    expect(authorSpan).toHaveTextContent('This todo is not done');
})
