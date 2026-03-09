// Define o "contrato" de como um usuário deve ser
export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

// Para criação de usuário — sem id porque o backend gera
export type CreateUserDTO = Omit<User, 'id'>;