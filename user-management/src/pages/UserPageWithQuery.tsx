import React, { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Add, DarkMode, LightMode, PersonOutline } from '@mui/icons-material';
import type { User, CreateUserDTO } from '../types/User';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../services/useUsers';
import { useThemeContext } from '../components/ThemeProvider';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import DeleteDialog from '../components/DeleteDialog';

const UserPageWithQuery: React.FC = () => {
  const { toggleTheme, isDarkMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: users = [], isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={48} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Carregando usuários...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDarkMode
          ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              }}
            >
              <PersonOutline sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
              >
                Gestão de Usuários
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {users.length} usuários cadastrados
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={1} justifyContent={{ xs: 'flex-end', sm: 'flex-start' }}>
            <IconButton
              onClick={toggleTheme}
              aria-label="Alternar tema"
              sx={{
                border: 1,
                borderColor: 'divider',
                width: 42,
                height: 42,
              }}
            >
              {isDarkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
            </IconButton>
            <Button
              variant="contained"
              startIcon={!isMobile && <Add />}
              onClick={handleAdd}
              aria-label="Adicionar novo usuário"
              sx={{
                px: { xs: 2, sm: 3 },
              }}
            >
              {isMobile ? <Add /> : 'Novo Usuário'}
            </Button>
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
          >
            Erro ao carregar usuários. Tente novamente.
          </Alert>
        )}

        {/* Table */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: isDarkMode
              ? '0 4px 24px rgba(0, 0, 0, 0.3)'
              : '0 4px 24px rgba(0, 0, 0, 0.06)',
          }}
        >
          <UserTable users={users} onEdit={handleEdit} onDelete={handleDeleteClick} />
        </Box>

        {/* Modals */}
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
    </Box>
  );
};

export default UserPageWithQuery;