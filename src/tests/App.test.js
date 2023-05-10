import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testando App', () => {
  it('Verificar se o título da página é exibido', () => {
    render(<App />);
    const title = screen.getByText(/project star wars planets search/i);
    expect(title).toBeInTheDocument();
  });
});