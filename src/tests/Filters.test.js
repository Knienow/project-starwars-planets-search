import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';

describe('Teste do componente Filters', () => {
  it('Filtrar os planetas por comparação numérica', async () => {
    render(<App />);
    //caso 1 - population maior que 10000
    const inputValueFilter = screen.getByTestId('value-filter');
    userEvent.type(inputValueFilter, 10000);
    const option1 = screen.getByTestId('column-filter');
    userEvent.selectOptions(option1, 'population');
    const option2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(option2, 'maior que');
    userEvent.click(screen.getByTestId('button-filter'));
    expect(screen.getByText(/population maior que 10000/i)).toBeInTheDocument();

    //caso 2 - orbital_period menor que 400
    userEvent.type(inputValueFilter, 400);
    const option3 = screen.getByTestId('column-filter');
    userEvent.selectOptions(option3, 'orbital_period' );
    const option4 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(option4, 'menor que');
    userEvent.click(screen.getByTestId('button-filter'));
    expect(screen.getByText(/orbital_period menor que 400/i)).toBeInTheDocument();

    //caso 3 - surface_water igual a 12
    userEvent.type(inputValueFilter, 12);
    const option5 = screen.getByTestId('column-filter');
    userEvent.selectOptions(option5, 'surface_water');
    const option6 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(option6, 'igual a');
    userEvent.click(screen.getByTestId('button-filter'));
    expect(screen.getByText(/surface_water igual a 12/i)).toBeInTheDocument();
  });

  it('Verificar se ao clicar no botão filtrar, sem selecionar os filtros manualmente, os campos são filtrados por population maior que zero', () => {
    render(<App />);
    const btnFilter = screen.getByTestId('button-filter');
    expect(btnFilter).toBeInTheDocument();
    userEvent.click(btnFilter);
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
  }); 

  it('Verificar se ao inserir um dado NaN, retorna um false', () => {
    expect(userEvent.type(screen.findByTestId('value-filter'), NaN)).toBeFalsy();
  });

  it('Verificar se o a string com os filtros selecionados é renderizada corretamente e se exclui a string quando há o click no botão X', async () => {
    render(<App />);
    //caso 1
    // userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    // userEvent.selectOptions(screen.getByTestId('comparison-filter'),'igual a' );
    // userEvent.click(screen.getByTestId('button-filter'));
    //caso 1 - population maior que 10000
    const inputValueFilter = screen.getByTestId('value-filter');
    userEvent.type(inputValueFilter, 10000);
    const option1 = screen.getByTestId('column-filter');
    userEvent.selectOptions(option1, 'population');
    const option2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(option2, 'maior que');
    userEvent.click(screen.getByTestId('button-filter'));
    expect(screen.getByText(/population maior que 10000/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', {
      name: /x/i
    }));
    await waitFor(() => {
      expect(queryByText('population maior que 10000')).not.toBeInTheDocument();
    });

    //caso 2
    userEvent.selectOptions(screen.getByTestId("column-filter"), "diameter");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"maior que" );
    userEvent.click(screen.getByTestId('button-filter'));

    //caso 3
    userEvent.selectOptions(screen.getByTestId("column-filter"), "orbital_period");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"igual a" );
    userEvent.click(screen.getByTestId('button-filter'));
  
    expect(screen.getAllByRole("button", { name: /x/i })[0]).toBeInTheDocument();
    userEvent.click(screen.getAllByRole("button", { name: /x/i })[0]);
    userEvent.click(screen.getAllByRole("button", { name: /x/i })[1]);
  });
  
  it('Quando o botão de remover todos os filtros for clicado, nenhum filtro deverá ser exibido na tela',() => {
    render(<App />);
    userEvent.type(screen.getByTestId("value-filter"), 3000);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"),"maior que" );
    userEvent.click(screen.getByTestId('button-filter'));
    const buttonRemove = screen.getByTestId('button-remove-filters');
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
    userEvent.click(buttonRemove);
  });
});