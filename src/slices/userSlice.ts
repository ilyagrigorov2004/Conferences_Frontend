import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { api } from '../api';
import { RootState } from '../store';


interface UserState {
  username: string;
  isAuthenticated: boolean;
    data: {
        first_name: string;
        last_name: string;
        email: string;
    };
  error?: string | null; 
  loading: boolean;
}
// дебаг-версия
const initialState: UserState = {
  username: '',
  data: {
    first_name: '',
    last_name: '',
    email: '',
  },
  isAuthenticated: false,
  error: null,
  loading : false,
};

// Асинхронное действие для авторизации
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.user.userLoginCreate(credentials);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response.data.error || 'Ошибка авторизации'); // Возвращаем ошибку в случае неудачи
    }
  }
);

// Асинхронное действие для деавторизации
export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      await api.user.userLogoutCreate;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error || 'Ошибка при выходе из системы'); 
    }
  }
);

export const registerUserAsync = createAsyncThunk(
    'user/registerUserAsync',
    async (credentials: { username: string; password: string; first_name: string; last_name: string; email: string;}, { rejectWithValue }) => {
        try {
        const response = await api.user.userRegisterCreate(credentials);
        return response.data;
        } catch (error: any) {
        return rejectWithValue(error.response.data.error || 'Ошибка регистрации');
        }
    }
);

export const changePersonalDataAsync = createAsyncThunk(
    'user/changePersonalDataAsync',
    async (credentials: { first_name?: string; last_name?: string; email?: string; password?: string}, { rejectWithValue }) => {
        try {
        const response = await api.user.userUpdate(credentials);
        return response.data;
        } catch (error: any) {
        return rejectWithValue(error.response.data.error || 'Ошибка изменения данных');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                const { username } = action.payload;
                state.username = username;
                state.isAuthenticated = true;
                state.error = null;
                state.loading = false;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(logoutUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.username = '';
                state.isAuthenticated = false;
                state.error = null;
                state.loading = false;
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(registerUserAsync.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(registerUserAsync.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.loading = false;
            })
            
            .addCase(changePersonalDataAsync.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(changePersonalDataAsync.fulfilled, (state, action) => {
                const { first_name, last_name, email } = action.payload;
                state.data.first_name = first_name;
                state.data.last_name = last_name;
                state.data.email = email;
                state.error = null;
                state.loading = false;
            })
            .addCase(changePersonalDataAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
            },
});

export const useIsAuthenticated = () => useSelector((state: RootState) => state.user.isAuthenticated);
export const useUsername = () => useSelector((state: RootState) => state.user.username);

export const {setError} = userSlice.actions;
export default userSlice.reducer;