import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from '../components/UserForm';

describe('UserForm', () => {
  it('deve mostrar erros de validação quando campos estão vazios', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();

    render(
      <UserForm open={true} user={null} onClose={() => {}} onSave={onSave} />
    );

    const saveButton = screen.getByText('Salvar');
    await user.click(saveButton);

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('deve chamar onSave com dados corretos ao preencher e salvar', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <UserForm open={true} user={null} onClose={onClose} onSave={onSave} />
    );

    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });

    await user.type(nameInput, 'Carlos Lima');
    await user.type(emailInput, 'carlos@email.com');
    await user.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        name: 'Carlos Lima',
        email: 'carlos@email.com',
        status: 'active',
      });
    });
  });
});