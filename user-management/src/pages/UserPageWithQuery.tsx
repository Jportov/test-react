import React, { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import { Add, DarkMode, LightMode } from '@mui/icons-material';
import type { User, CreateUserDTO } from '../types/User';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../services/useUsers';
import { useThemeContext } from '../components/ThemeProvider';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import DeleteDialog from '../components/DeleteDialog';

const UserPageWithQuery: React.FC = () => {
  const { toggleTheme, isDarkMode } = useThemeContext();

  // React Query hooks — substituem o Redux para dados do servidor
  const { data: users = [], isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  // Estado local — só pra controle de UI (modais)
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAdd = useCallback(() => {
    setSelectedUser(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setFormOpen(true);
  }, []);

  const handleDeleteClick = useCallback((user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedUser) {
      deleteUser.mutate(selectedUser.id);
    }
    setDeleteOpen(false);
    setSelectedUser(null);
  }, [deleteUser, selectedUser]);

  const handleSave = useCallback((userData: CreateUserDTO & { id?: number }) => {
    if (userData.id) {
      updateUser.mutate(userData as User);
    } else {
      createUser.mutate(userData as CreateUserDTO);
    }
  }, [createUser, updateUser]);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
    setSelectedUser(null);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setDeleteOpen(false);
    setSelectedUser(null);
  }, []);

  if (isLoading) {
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
        <Box display="flex" gap={1}>
          <IconButton onClick={toggleTheme} aria-label="Alternar tema">
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            aria-label="Adicionar novo usuário"
          >
            Novo Usuário
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Erro ao carregar usuários. Tente novamente.
        </Alert>
      )}

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDeleteClick} />

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

export default UserPageWithQuery;