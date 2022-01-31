import axios from 'axios';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState
} from '@reduxjs/toolkit';

import { UsersInterface } from '../../interfaces/users';
import { RootState } from '..';


const usersAdapter = createEntityAdapter<UsersInterface.User>({
  selectId: user => user.id,
  sortComparer: (a, b) => a.username.localeCompare(b.username)
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const { data } = await axios.get<UsersInterface.User[]>('https://jsonplaceholder.typicode.com/users');
      return data;
    } catch (error) {
      console.log('From users/fetch', error);

      return [];
    }
  }
);

export interface UsersState extends EntityState<UsersInterface.User> {
  isLoaded: boolean;
  isLoading: boolean;
  isError: boolean;
  value: number;
}

const initialState: UsersState = usersAdapter.getInitialState({
  isLoaded: false,
  isLoading: false,
  isError: false,
  value: 0,
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder.addCase(fetchUsers.pending, state => {
      state.isLoaded = false;
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.isLoaded = true;
      state.isLoading = false;
      usersAdapter.setAll(state, payload);
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.isError = true;
    });
  }
});

export default usersSlice.reducer;

export const { increment } = usersSlice.actions
export const usersSelectors = usersAdapter.getSelectors<RootState>(state => state.users);