import type { Meta, StoryObj } from '@storybook/react';
import DeleteDialog from '../DeleteDialog';

const meta: Meta<typeof DeleteDialog> = {
  title: 'Components/DeleteDialog',
  component: DeleteDialog,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controla se o diálogo está visível',
    },
    user: {
      control: 'object',
      description: 'Usuário a ser excluído',
    },
    onClose: {
      action: 'onClose',
      description: 'Chamado ao cancelar',
    },
    onConfirm: {
      action: 'onConfirm',
      description: 'Chamado ao confirmar exclusão',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeleteDialog>;

export const Default: Story = {
  args: {
    open: true,
    user: {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      status: 'active',
    },
  },
};

export const InactiveUser: Story = {
  args: {
    open: true,
    user: {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      status: 'inactive',
    },
  },
};

export const Closed: Story = {
  args: {
    open: false,
    user: null,
  },
};