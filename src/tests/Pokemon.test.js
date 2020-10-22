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

test('test if card is render with right information', () => {
  const { history, getByText, getByTestId, getAllByRole } = renderWithRouter(<App />);
  history.push('/');
  fireEvent.click(getByText(/More details/i));
  const pokemonName = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonAverageWeight = getByTestId('pokemon-weight');
  const pokemonImageSRC = getAllByRole('img')[0].src;
  console.log(pokemonImageSRC);
  const pokemonImageALT = getAllByRole('img')[0].alt;
  console.log(pokemonImageALT);
  expect(pokemonName).toHaveTextContent('Pikachu');
  expect(pokemonType).toHaveTextContent('Electric');
  expect(pokemonAverageWeight).toHaveTextContent('Average weight:6.0kg');
  expect(pokemonImageSRC).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonImageALT).toBe('Pikachu sprite');
});

test('test if card has a link to navigate to details', () => {
  const { history, getByText } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('test if when clicked it is redirected to pokemon details page', () => {
  const { history, getByText } = renderWithRouter(<App />);
  history.push('/');
  fireEvent.click(getByText(/More details/i));
  expect(getByText('Summary')).toBeInTheDocument();
});

test('test if URL is exibed with right ID of pokemon', () => {
  const { history, getByText } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('test if favorite star icon is at favorited pokemons', () => {
  const { history, getByAltText, getByText, getByRole } = renderWithRouter(<App />);
  history.push('/');
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByRole('checkbox'));
  const markedAsFavoriteURL = (document.querySelectorAll('img'))[1].getAttribute('src');
  expect(markedAsFavoriteURL).toBe('/star-icon.svg');
  const markedAsFavoriteALT = getByAltText('Pikachu is marked as favorite');
  expect(markedAsFavoriteALT).toBeInTheDocument();
});
