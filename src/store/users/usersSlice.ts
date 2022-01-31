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
}

const initialState: UsersState = usersAdapter.getInitialState({
  isLoaded: false,
  isLoading: false,
  isError: false
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
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


export const usersSelectors = usersAdapter.getSelectors<RootState>(state => state.users);