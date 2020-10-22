import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

test('test if "No favorite pokemon found" is on screen', () => {
  const { history, getByText } = renderWithRouter(<App />);
  history.push('/favorites');
  expect(getByText(/No favorite pokemon found/)).toBeInTheDocument();
});
test('test if favorite pokemons are exibed on screen', () => {
  const { history, getByText, getByRole, getByAltText } = renderWithRouter(<App />);
  history.push('/');
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByRole('checkbox'));
  history.push('/favorites');
  expect(getByAltText(/is marked as favorite/)).toBeInTheDocument();
});
test('test if favorite pokemons are exibed on screen', () => {
  const { queryByText, history } = renderWithRouter(<App />);
  history.push('/favorites');
  const notFavoritePokemon = queryByText('Charmander');
  expect(notFavoritePokemon).not.toBeInTheDocument();
});
