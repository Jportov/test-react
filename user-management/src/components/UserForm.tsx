import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import type { User, CreateUserDTO } from '../types/User';

interface UserFormProps {
  open: boolean;
  user: User | null; // null = criando, User = editando
  onClose: () => void;
  onSave: (user: CreateUserDTO & { id?: number }) => void;
}

const UserForm: React.FC<UserFormProps> = React.memo(({ open, user, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Quando o user muda (abriu pra editar), preenche os campos
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setStatus(user.status);
    } else {
      setName('');
      setEmail('');
      setStatus('active');
    }
    setErrors({});
  }, [user, open]);

  // Validação dos campos
  const validate = useCallback((): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email]);

  const handleSave = useCallback(() => {
    if (!validate()) return;

    onSave({
      ...(user && { id: user.id }),
      name: name.trim(),
      email: email.trim(),
      status,
    });

    onClose();
  }, [validate, onSave, onClose, user, name, email, status]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          aria-label="Nome do usuário"
          autoFocus
        />
        <TextField
          label="E-mail"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          aria-label="E-mail do usuário"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
            aria-label="Status do usuário"
          >
            <MenuItem value="active">Ativo</MenuItem>
            <MenuItem value="inactive">Inativo</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
});

UserForm.displayName = 'UserForm';

export default UserForm;