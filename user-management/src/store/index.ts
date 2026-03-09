import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Cria a store combinando todas as fatias (slices)
export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// Tipos para usar em todo o app
// RootState = formato completo da store
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch = tipo do dispatch (para disparar actions)
export type AppDispatch = typeof store.dispatch;