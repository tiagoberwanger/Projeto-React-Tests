import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

test('test if page contains a heading h2 with "Page requested not found "', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/notfound');
  const h2 = screen.getAllByRole('heading', { level: 2 });
  expect(h2[1]).toHaveTextContent('Page requested not found');
});

test('test if page contains a specific image', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/notfound');
  const image = screen.getByAltText(/Pikachu crying because/);
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
