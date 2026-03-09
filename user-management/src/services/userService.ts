import axios from 'axios';
import type { User, CreateUserDTO } from '../types/User';

// URL base da API — se mudar, muda só aqui
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Busca todos os usuários
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);

  // A API retorna muitos campos, mas só precisamos de id, name, email
  // Adicionamos o status manualmente porque a API não tem esse campo
  return response.data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    status: 'active' as const,
  }));
};

// Cria um novo usuário
export const createUser = async (user: CreateUserDTO): Promise<User> => {
  const response = await axios.post(API_URL, user);
  return {
    ...response.data,
    status: user.status,
  };
};

// Atualiza um usuário existente
export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put(`${API_URL}/${user.id}`, user);
  return {
    ...response.data,
    status: user.status,
  };
};

// Exclui um usuário
export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};