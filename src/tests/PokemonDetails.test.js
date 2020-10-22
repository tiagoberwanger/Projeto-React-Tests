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

test('test if detailed informations appear in screen', () => {
  const { history, getByText, getAllByRole, queryByText } = renderWithRouter(<App />);
  const moreDetails = getByText('More details');
  history.push('/');
  fireEvent.click(moreDetails);
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(queryByText('More details')).not.toBeInTheDocument();

  const h2 = getAllByRole('heading', { level: 2 });
  expect(h2[2]).toHaveTextContent('Summary');

  const ppt1 = 'This intelligent Pokémon roasts hard berries ';
  const ppt2 = 'with electricity to make them tender enough to eat.';
  const p = ppt1 + ppt2;
  expect(getByText(p)).toBeInTheDocument();
});

test('test if exist a section with maps of pokemon detailed', () => {
  const { history, getByText, getAllByRole, getAllByAltText } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const h2 = getAllByRole('heading', { level: 2 });
  expect(h2[3]).toHaveTextContent('Game Locations of Pikachu');
  const alt = getAllByAltText('Pikachu location');
  expect(alt[0]).toBeInTheDocument();
  expect(alt[1]).toBeInTheDocument();

  const p1 = 'Kanto Viridian Forest';
  expect(getByText(p1)).toBeInTheDocument();
  const img1 = getAllByRole('img');
  expect(img1[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

  const p2 = 'Kanto Power Plant';
  expect(getByText(p2)).toBeInTheDocument();
  const img2 = getAllByRole('img');
  expect(img2[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('test if user can check pokemon as favorite', () => {
  // exibir um checkbox para favoritar
  const { history, getByRole } = renderWithRouter(<App />);
  const { getAllByAltText, getByLabelText } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const favoriteCheckbox = getByRole('checkbox');
  expect(favoriteCheckbox).toBeInTheDocument();
  // cliques devem adicionar e remover dos favoritos
  fireEvent.click(favoriteCheckbox);
  const alt = getAllByAltText('Pikachu is marked as favorite');
  expect(alt[0]).toBeInTheDocument();
  fireEvent.click(favoriteCheckbox);
  expect(alt[0]).not.toBeInTheDocument();
  // label do checkbox deve conter 'Pokémon favoritado?'
  const favoriteLabel = getByLabelText('Pokémon favoritado?');
  expect(favoriteLabel).toBeInTheDocument();
});
