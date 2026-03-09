import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteDialog from '../components/DeleteDialog';

const mockUser = { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'active' as const };

describe('DeleteDialog', () => {
  it('deve exibir nome do usuário na mensagem de confirmação', () => {
    render(
      <DeleteDialog open={true} user={mockUser} onClose={() => {}} onConfirm={() => {}} />
    );

    expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });

  it('deve chamar onConfirm ao clicar em Excluir', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(
      <DeleteDialog open={true} user={mockUser} onClose={() => {}} onConfirm={onConfirm} />
    );

    await user.click(screen.getByText('Excluir'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});