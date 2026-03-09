import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserTable from '../components/UserTable';

const mockUsers = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'active' as const },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', status: 'inactive' as const },
];

describe('UserTable', () => {
  it('deve renderizar a lista de usuários', () => {
    render(
      <UserTable users={mockUsers} onEdit={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('maria@email.com')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('deve filtrar usuários por nome', async () => {
    const user = userEvent.setup();

    render(
      <UserTable users={mockUsers} onEdit={() => {}} onDelete={() => {}} />
    );

    const filterInput = screen.getByRole('textbox', { name: /filtrar por nome/i });
    await user.type(filterInput, 'João');

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument();
    });
  });;
});