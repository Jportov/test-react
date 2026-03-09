import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as userService from './userService';
import type { User, CreateUserDTO } from '../types/User';

// Chave única para identificar essa query no cache
const USERS_KEY = ['users'];

// Hook para buscar usuários
export const useUsers = () => {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: userService.getUsers,
  });
};

// Hook para criar usuário
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: CreateUserDTO) => userService.createUser(user),
    onSuccess: (newUser) => {
      // Atualiza o cache localmente sem refazer o GET
      queryClient.setQueryData<User[]>(USERS_KEY, (old) => {
        const userWithId = { ...newUser, id: Date.now() };
        return old ? [...old, userWithId] : [userWithId];
      });
    },
  });
};

// Hook para editar usuário
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => userService.updateUser(user),
    onSuccess: (_, updatedUser) => {
      queryClient.setQueryData<User[]>(USERS_KEY, (old) => {
        return old
          ? old.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          : [];
      });
    },
  });
};

// Hook para excluir usuário
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<User[]>(USERS_KEY, (old) => {
        return old ? old.filter((u) => u.id !== deletedId) : [];
      });
    },
  });
};