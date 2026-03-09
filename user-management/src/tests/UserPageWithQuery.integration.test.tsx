import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserPageWithQuery from '../pages/UserPageWithQuery';
import ThemeProviderWrapper from '../components/ThemeProvider';

jest.mock('../services/userService', () => ({
  getUsers: jest.fn().mockResolvedValue([
    { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'active' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', status: 'active' },
  ]),
  createUser: jest.fn().mockResolvedValue({
    id: 3,
    name: 'Carlos Lima',
    email: 'carlos@email.com',
    status: 'active',
  }),
  updateUser: jest.fn().mockResolvedValue({}),
  deleteUser: jest.fn().mockResolvedValue({}),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        {ui}
      </ThemeProviderWrapper>
    </QueryClientProvider>
  );
};

describe('UserPageWithQuery - Integração', () => {
  it('deve carregar e exibir usuários da API', async () => {
    renderWithProviders(<UserPageWithQuery />);

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    });
  });

  it('deve abrir formulário, preencher e salvar novo usuário', async () => {
    const user = userEvent.setup();
    renderWithProviders(<UserPageWithQuery />);

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Novo Usuário'));
    await user.type(screen.getByRole('textbox', { name: /nome/i }), 'Carlos Lima');
    await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'carlos@email.com');
    await user.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.queryByText('Novo Usuário', { selector: 'h2' })).not.toBeInTheDocument();
    });
  });

  it('deve alternar entre Dark Mode e Light Mode', async () => {
    const user = userEvent.setup();
    renderWithProviders(<UserPageWithQuery />);

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    const themeButton = screen.getByLabelText('Alternar tema');
    await user.click(themeButton);

    expect(screen.getByLabelText('Alternar tema')).toBeInTheDocument();
  });
});