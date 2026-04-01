/**
 * Redux store.
 *
 * Typed dispatch and selector hooks are exported here.
 * Always use `useAppDispatch` and `useAppSelector` — never the raw hooks.
 */
import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import authReducer from './slices/auth';
import { baseApi } from '@/services/base-api';

export const store = configureStore({
  reducer: {
    auth:                  authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed dispatch hook — use this instead of raw useDispatch */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Typed selector hook — use this instead of raw useSelector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
