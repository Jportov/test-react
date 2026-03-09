import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import type { RootState, AppDispatch } from '../store';
import type { User, CreateUserDTO } from '../types/User';
import { fetchUsers, addUser, editUser, removeUser } from '../store/userSlice';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import DeleteDialog from '../components/DeleteDialog';

const UserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  // Controle dos modais
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Busca os usuários ao montar o componente
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // === HANDLERS ===

  const handleAdd = useCallback(() => {
    setSelectedUser(null); // null = modo criação
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setSelectedUser(user); // user preenchido = modo edição
    setFormOpen(true);
  }, []);

  const handleDeleteClick = useCallback((user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedUser) {
      dispatch(removeUser(selectedUser.id));
    }
    setDeleteOpen(false);
    setSelectedUser(null);
  }, [dispatch, selectedUser]);

  const handleSave = useCallback((userData: CreateUserDTO & { id?: number }) => {
    if (userData.id) {
      // Tem id = editando
      dispatch(editUser(userData as User));
    } else {
      // Sem id = criando
      dispatch(addUser(userData as CreateUserDTO));
    }
  }, [dispatch]);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
    setSelectedUser(null);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setDeleteOpen(false);
    setSelectedUser(null);
  }, []);

  // === RENDER ===

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Gestão de Usuários
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          aria-label="Adicionar novo usuário"
        >
          Novo Usuário
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <UserForm
        open={formOpen}
        user={selectedUser}
        onClose={handleFormClose}
        onSave={handleSave}
      />

      <DeleteDialog
        open={deleteOpen}
        user={selectedUser}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default UserPage;