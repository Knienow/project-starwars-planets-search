import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  TEST_INPUT_1,
} from './helpers/constants';

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
  it('Filtrar os planetas que possuem a vogal "o" no nome', () => {
    render(<App />);
    const planetsWithO = ['Tatooine','Hoth', 'Dagobah', 'Endor', 'Naboo', 'Coruscant', 'Kamino'];
    const inputFilterName = screen.getByTestId('name-filter');
    userEvent.type(inputFilterName, TEST_INPUT_1);
    expect(planetsWithO).toBeInTheDocument();
    //PAREI AQUI 
  });
});

describe('Teste do componente FilterNumbers', () => {
  it('Verificar se o campo do filtro de colunas é exibido', () => {
    render(<App />);
    const selectFilterColuns = screen.getByText(/coluna:/i);
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
  it('Verificar se a tabela é preenchida com os dados retornados da API', () => {
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
  });
});