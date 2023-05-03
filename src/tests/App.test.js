import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Teste do componente Header', () => {
  it('Verificar se o título da página é exibido', () => {
    render(<App />);
    const title = screen.getByRole('heading', {
      name: /project star wars planets search/i
    })
    expect(title).toBeInTheDocument();
  });
  it('Verificar se o input para filtrar os nomes é exibido', () => {
    render(<App />);
    const inputFilterName = screen.getByTestId('name-filter');
    expect(inputFilterName).toBeInTheDocument();
  });
});

describe('Teste do componente FilterNumbers', () => {
  it('Verificar se o campo do filtro de colunas é exibido', () => {
    render(<App />);
    const selectFilterColuns = screen.getByRole('combobox', {
      name: /coluna:/i
    });
    expect(selectFilterColuns).toBeInTheDocument();
  });
  it('Verificar se o campo do filtro de operadores é exibido', () => {
    render(<App />);
    const selectFilterComparison = screen.getByRole('combobox', {
      name: /operador:/i
    })
    expect(selectFilterComparison).toBeInTheDocument();
  });
  it('Verificar se o botão Filtrar é exibido', () => {
    render(<App />);
    const btnFilter =   screen.getByRole('button', {
      name: /filtrar/i
    })
    expect(btnFilter).toBeInTheDocument();
  });
});

describe('Teste do componente Table', () => {
  // it('Verificar se o título da página é exibido', () => {
  //   render(<App />);
  //   const title = screen.getByRole('heading', {
  //     name: /project star wars planets search/i
  //   })
  //   expect(title).toBeInTheDocument();
  // });
  // it('Verificar se o input para filtrar os nomes é exibido', () => {
  //   render(<App />);
  //   const inputFilterName = screen.getByTestId('name-filter');
  //   expect(inputFilterName).toBeInTheDocument();
  // });
});