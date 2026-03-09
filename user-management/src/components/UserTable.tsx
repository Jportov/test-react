import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Chip,
  TableSortLabel,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import type { User } from '../types/User';

// Props = os dados que esse componente recebe do pai
interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

// Tipo para controlar a ordenação
type Order = 'asc' | 'desc';

const UserTable: React.FC<UserTableProps> = React.memo(({ users, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof User>('name');

  // useCallback memoriza a função — só recria se as dependências mudarem
  const handleSort = useCallback((property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [order, orderBy]);

  // useMemo memoriza o resultado — só recalcula se users, filter, order ou orderBy mudarem
  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => {
        const valueA = a[orderBy];
        const valueB = b[orderBy];
        if (valueA < valueB) return order === 'asc' ? -1 : 1;
        if (valueA > valueB) return order === 'asc' ? 1 : -1;
        return 0;
      });
  }, [users, filter, order, orderBy]);

  return (
    <Box>
      <TextField
        label="Filtrar por nome"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filtrar usuários por nome"
      />
      <TableContainer component={Paper}>
        <Table aria-label="Tabela de usuários">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Nome
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  E-mail
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status === 'active' ? 'Ativo' : 'Inativo'}
                    color={user.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(user)}
                    aria-label={`Editar ${user.name}`}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(user)}
                    aria-label={`Excluir ${user.name}`}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});

UserTable.displayName = 'UserTable';

export default UserTable;