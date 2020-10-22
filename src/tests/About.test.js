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

test('renders a h1 with "Pokédex" and testing it', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const h1 = screen.getAllByRole('heading', { level: 1 });
  expect(h1[1]).toHaveTextContent('Pokédex');
});

test('renders a h2 with "About Pokédex" and testing it', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/about');
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
  const h2 = screen.getAllByRole('heading', { level: 2 });
  expect(h2[1]).toHaveTextContent('About Pokédex');
});

test('renders two paragraphs and testing them', () => {
  const { getByText, history, container } = renderWithRouter(<App />);
  history.push('/about');
  const p1 = getByText(/This application simulates a Pokédex/);
  const p2 = getByText(/One can filter Pokémons by type/);
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
  const paragraphs = container.querySelectorAll('p');
  const two = 2;
  expect(paragraphs.length).toBe(two);
});

test('renders an image and testing it', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const image = screen.getByAltText(/Pokédex/);
  expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
