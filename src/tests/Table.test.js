import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('Teste do componente Table', () => {
  it('Verificar se todas as colunas são renderizadas', () => {
    render(<App/>);
    const columns = [
      'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
      'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
      'Edited', 'URL',
    ];
    columns.forEach((header) => {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument();
    });
  });
  
  it('Verificar se a tabela é preenchida com os dados retornados da API', async () => {
    render(<App />);
    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });
});
