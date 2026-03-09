import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Chip,
  TableSortLabel,
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
  InputAdornment,
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import type { User } from '../types/User';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

type Order = 'asc' | 'desc';

const UserTable: React.FC<UserTableProps> = React.memo(({ users, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof User>('name');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSort = useCallback((property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [order, orderBy]);

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
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <TextField
          label="Buscar usuário"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filtrar usuários por nome"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.03)'
                : 'rgba(0,0,0,0.02)',
            },
          }}
        />
      </Box>

      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, px: 2, pb: 2 }}>
          {filteredAndSortedUsers.map((user) => (
            <Card
              key={user.id}
              variant="outlined"
              sx={{
                borderRadius: 2.5,
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 12px rgba(99, 102, 241, 0.12)',
                },
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1} minWidth={0}>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {user.email}
                    </Typography>
                    <Box mt={1}>
                      <Chip
                        label={user.status === 'active' ? 'Ativo' : 'Inativo'}
                        color={user.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                  </Box>
                  <Box display="flex" gap={0.5} ml={1}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(user)}
                      aria-label={`Editar ${user.name}`}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(user)}
                      aria-label={`Excluir ${user.name}`}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <TableContainer>
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
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </TableCell>
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
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onDelete(user)}
                      aria-label={`Excluir ${user.name}`}
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
});

UserTable.displayName = 'UserTable';

export default UserTable;