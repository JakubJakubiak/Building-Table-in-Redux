import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, User } from './types';

const initialState: RootState = {
  users: [],
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ key: keyof RootState['filters']; value: string }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
  },
});

export const { setUsers, setFilter } = userSlice.actions;

export const store = configureStore({
  reducer: userSlice.reducer,
});