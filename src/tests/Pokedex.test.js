import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

test('checking next pokemon button', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  const nextPokemonButton = getByText('Próximo pokémon');
  expect(nextPokemonButton).toBeInTheDocument();

  const firstPokemon = getByText('Pikachu');
  expect(firstPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  const secondPokemon = getByText('Charmander');
  expect(secondPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  const thirdPokemon = getByText('Caterpie');
  expect(thirdPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  const forthPokemon = getByText('Ekans');
  expect(forthPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  const fifthPokemon = getByText('Alakazam');
  expect(fifthPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  const sixthPokemon = getByText('Mew');
  expect(sixthPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  const seventhPokemon = getByText('Rapidash');
  expect(seventhPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  const eightPokemon = getByText('Snorlax');
  expect(eightPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  const ninethPokemon = getByText('Dragonair');
  expect(ninethPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonButton);
  expect(firstPokemon).toBeInTheDocument();
});

test('test if page has one pokemon each time', () => {
  const { history, getAllByTestId } = renderWithRouter(<App />);
  history.push('/');
  const pokemonImg = getAllByTestId('pokemon-name');
  expect(pokemonImg).toHaveLength(1);
  expect(pokemonImg[0]).toBeInTheDocument();
});

test('check filter buttons', () => {
  const { history, getByTestId, getByText } = renderWithRouter(<App />);
  history.push('/');
  const filterPokemonButton = screen.getByRole('button', { name: /Electric/ });
  fireEvent.click(filterPokemonButton);
  const verifyPokemons = getByText('Encountered pokémons');
  expect(verifyPokemons).toBeInTheDocument();
  const currentPokemon = getByTestId('pokemonType', { name: 'Electric' });
  expect(currentPokemon).toBeInTheDocument();
});

test('check all pokemons button', () => {
  const { history, getByText, getByRole } = renderWithRouter(<App />);
  history.push('/');
  const allPokemonsButton = getByText('All');
  expect(allPokemonsButton).toBeInTheDocument();
  fireEvent.click(allPokemonsButton);
  const firstPokemon = getByText('Pikachu');
  expect(firstPokemon).toBeInTheDocument();
  history.push('/');
  expect(getByText('Pikachu')).toBeInTheDocument();
  const nextPokemonButton = getByRole('button', { name: 'Próximo pokémon' });
  fireEvent.click(nextPokemonButton);
  expect(getByText('Charmander')).toBeInTheDocument();
});

test('test if there are all filter buttons and they are created dinamically', () => {
  pokemons[1].type = 'Water';
  const { history, queryAllByTestId, getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ {} }
  />);
  const mockedButton = getByRole('button', { name: 'Water' });
  expect(mockedButton).toBeInTheDocument();
  history.push('/');
  const buttons = queryAllByTestId('pokemon-type-button');
  const buttonsLength = 8;
  expect(buttons).toHaveLength(buttonsLength);
});

test('check if next pokemon button is disabled when theres only one', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  history.push('/');
  const nextPokemonButton = getByRole('button', { name: 'Próximo pokémon' });
  const electricButton = getByRole('button', { name: 'Electric' });
  fireEvent.click(electricButton);
  expect(nextPokemonButton).toBeDisabled();
});
