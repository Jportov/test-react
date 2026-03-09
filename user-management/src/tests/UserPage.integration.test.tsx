import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/userSlice';
import UserPage from '../pages/UserPage';

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

const createTestStore = () =>
  configureStore({
    reducer: { users: userReducer },
  });

describe('UserPage - Integração', () => {
  it('deve carregar usuários e exibir na listagem', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.users.users.length).toBe(2);
    expect(state.users.loading).toBe(false);
  });

  it('deve abrir formulário e simular clique no botão Salvar', async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Novo Usuário'));
    expect(screen.getByText('Novo Usuário', { selector: 'h2' })).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: /nome/i }), 'Carlos Lima');
    await user.type(screen.getByRole('textbox', { name: /e-mail/i }), 'carlos@email.com');
    await user.click(screen.getByText('Salvar'));

    await waitFor(() => {
      const state = store.getState();
      expect(state.users.users.length).toBeGreaterThanOrEqual(3);
    });
  });
});