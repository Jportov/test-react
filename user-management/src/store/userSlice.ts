import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, CreateUserDTO } from '../types/User';
import * as userService from '../services/userService';

// Define o formato do estado desta fatia
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Estado inicial — como o app começa
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// === THUNKS (ações assíncronas) ===
// Thunks são actions que precisam esperar algo (como uma chamada de API)
// antes de atualizar o estado

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return await userService.getUsers();
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: CreateUserDTO) => {
    const response = await userService.createUser(user);
    return { ...response, id: Date.now() };
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async (user: User) => {
    await userService.updateUser(user);
    return user;
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (id: number) => {
    await userService.deleteUser(id);
    return id;
  }
);

// === SLICE ===
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchUsers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar usuários';
      });

    // addUser
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    });

    // editUser
    builder.addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });

    // removeUser
    builder.addCase(removeUser.fulfilled, (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    });
  },
});

export default userSlice.reducer;