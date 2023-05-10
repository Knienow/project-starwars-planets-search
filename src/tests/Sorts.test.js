import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente Sorts', () => {
  it('Verificando se a tabela inicia com 10 elementos', async () => {
    render(<App />);
    const filteredPlanets = await screen.findAllByTestId('planet-name');
    expect(filteredPlanets).toHaveLength(10);
  });

  it('Verificar se a ordenação por ascendente ou descendente funciona corretamente', async () => {
    render(<App />);
    const filteredPlanets = await screen.findAllByTestId('planet-name');
    const sortSelect = await screen.findByTestId('column-sort');
    const ascRadio = await screen.findByTestId('column-sort-input-asc');
    const descRadio = await screen.findByTestId('column-sort-input-desc');
    const orderButton = await screen.findByTestId('column-sort-button');

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    //caso 1
    userEvent.selectOptions(sortSelect, 'population');
    userEvent.click(descRadio);
    userEvent.click(orderButton);
    expect(filteredPlanets[0]).toHaveTextContent('Coruscant');
    expect(filteredPlanets[1]).toHaveTextContent('Naboo');
    expect(filteredPlanets).toHaveLength(10);

    //caso 2
    userEvent.selectOptions(sortSelect, 'rotation_period');
    userEvent.click(ascRadio);
    userEvent.click(orderButton);
    expect(filteredPlanets[0]).toHaveTextContent('Bespin');
    expect(filteredPlanets[1]).toHaveTextContent('Endor');
    expect(filteredPlanets[2]).toHaveTextContent('Dagobah');

    //caso 3
    userEvent.selectOptions(sortSelect, 'orbital_period');
    userEvent.click(descRadio);
    userEvent.click(orderButton);
    expect(filteredPlanets[0]).toHaveTextContent('Bespin');
    expect(filteredPlanets[1]).toHaveTextContent('Yavin IV');

    //caso 4
    userEvent.selectOptions(sortSelect, 'diameter');
    userEvent.click(descRadio);
    userEvent.click(orderButton);
    expect(filteredPlanets[0]).toHaveTextContent('Bespin');
    expect(filteredPlanets[1]).toHaveTextContent('Kamino');

    //caso 5
    userEvent.selectOptions(sortSelect, 'surface_water');
    userEvent.click(ascRadio);
    userEvent.click(orderButton);
    expect(filteredPlanets[0]).toHaveTextContent('Bespin');
    expect(filteredPlanets[1]).toHaveTextContent('Tatooine');

    //caso 6
    userEvent.click(descRadio);
    userEvent.click(orderButton);
    expect(filteredPlanets[0]).toHaveTextContent('Hoth');
    expect(filteredPlanets[1]).toHaveTextContent('Kamino');
  });

  it('Verifica se os planetas com population unknown se mantêm como últimos da lista quando ordenados por asc e desc', async () => {
    render(<App />);
    const filteredPlanets = await screen.findAllByTestId('planet-name');
    const sortSelect = await screen.findByTestId('column-sort');
    const ascRadio = await screen.findByTestId('column-sort-input-asc');
    const descRadio = await screen.findByTestId('column-sort-input-desc');
    const orderButton = await screen.findByTestId('column-sort-button');

    userEvent.selectOptions(sortSelect, 'population');
    userEvent.click(descRadio);
    userEvent.click(orderButton);
    expect(filteredPlanets[9]).toHaveTextContent('Kamino');

    userEvent.selectOptions(sortSelect, 'population');
    userEvent.click(ascRadio);
    userEvent.click(orderButton);
    expect(filteredPlanets[9]).toHaveTextContent('Kamino');
  });
});