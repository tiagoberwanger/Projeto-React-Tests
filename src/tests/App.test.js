import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
test('shows if links appear in home page', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('shows if home link works ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  expect(getByText('Home')).toBeInTheDocument();
});

test('shows if about link works ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  expect(getByText('About')).toBeInTheDocument();
});

test('shows if Favorite Pokémons link works ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('shows if not found page appears when not found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina-que-nao-existe');
  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});
