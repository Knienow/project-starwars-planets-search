import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';

describe('Teste do componente Header', () => {
  it('Verificar se o input para filtrar os nomes é exibido', () => {
    render(<App />);
    const inputFilterName = screen.getByTestId('name-filter');
    expect(inputFilterName).toBeInTheDocument();
  });

  it('Verificar se o campo do filtro de colunas é exibido', () => {
    render(<App />);
    const selectFilterColuns = screen.getByTestId('column-filter');
    expect(selectFilterColuns).toBeInTheDocument();
    expect(selectFilterColuns).toHaveValue('population');
    screen.getByTestId('column-filter').childNodes.forEach((options) => {
      expect(options).toHaveTextContent(/population|orbital_period|diameter|rotation_period|surface_water/);
    });
  });

  it('Verificar se o campo do filtro de operadores é exibido', () => {
    render(<App />);
    const selectFilterComparison = screen.getByTestId('comparison-filter');
    expect(selectFilterComparison).toBeInTheDocument();
  });

  it('Verifica se o input para inserir valores numéricos é renderizado', () => {
    const inputValueFilter = screen.getByTestId('value-filter');
    expect(inputValueFilter).toBeInTheDocument();
  });

  it('Verificar se o botão Filtrar é exibido', () => {
    render(<App />);
    const btnFilter =   screen.getByRole('button', {
      name: /filtrar/i
    })
    expect(btnFilter).toBeInTheDocument();
  });

  it('Verificar se o botão Remover Filtros é renderizado', () => {
    render(<App />);
    const btnRemove = screen.getByRole('button', {
      name: /remover filtros/i
    })
    expect(btnRemove).toBeInTheDocument();
  })

  it('Verificar se os radio buttons ASC e DESC são renderizados', () => {
    const asc = screen.getByTestId('column-sort-input-asc');
    const desc = screen.getByTestId('column-sort-input-desc');
    expect(asc).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });

  it('Verificar se o botão Ordenar é renderizado', () => {
    const btnOrder = screen.getByRole('button', {
      name: /ordenar/i
    })
    expect(btnOrder).toBeInTheDocument();
  });

  it('Verifica se o filtro por letra é aplicado', async() => {
    render(<App />);
    const inputFilterName = screen.getByTestId('name-filter');
    userEvent.type(inputFilterName, 'o');
    expect()
  });

  it('Verifica se o filtro por nome é aplicado', async() => {
    render(<App />);
    const inputFilterName = screen.getByTestId('name-filter');
    userEvent.type(inputFilterName, 'ta');
    const planet = screen.findByText('Tatooine');
    expect(planet).toBeInTheDocument();
  });
});