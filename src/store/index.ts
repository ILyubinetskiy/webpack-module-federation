import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux';

import users from './users/usersSlice';

const isDev = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: {
    users
  },
  devTools: isDev
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
