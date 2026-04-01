import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '@/redux/slices/auth';
import uiReducer from '@/redux/slices/ui';
import counterReducer from '@/redux/slices/counter';
import { baseApi } from '@/services/base-api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    counter: counterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Persists auth credentials to localStorage
 */
export const persistAuth = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
};

/**
 * Loads persisted auth credentials from localStorage
 */
export const loadPersistedAuth = (): {
  accessToken: string;
  refreshToken: string;
} | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  }

  return null;
};

/**
 * Clears persisted auth from localStorage
 */
export const clearPersistedAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};
