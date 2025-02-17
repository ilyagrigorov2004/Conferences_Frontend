import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { api } from '../api';
import { RootState } from '../store';

interface UserState {
  username: string;
  isAuthenticated: boolean;
  isCurator: boolean;
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
  isCurator: false,
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
export const apiCallWithRefresh = async (dispatch: any, apiCall: () => Promise<any>) => {
  try {
    return await apiCall();
  } catch (error: any) {
    if (error.response.status === 401) {
      await dispatch(refreshTokenAsync());
      return await apiCall();
    }
    throw error;
  }
};

export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: { username: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiCallWithRefresh(dispatch, () => api.user.userLoginCreate(credentials));
      const { refresh_token, token, username, first_name, last_name, email, is_staff, is_superuser } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refresh_token);
      api.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { username, first_name, last_name, email, is_staff, is_superuser }; 
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
      await api.user.userLogoutCreate();
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
    async (credentials: { first_name?: string; last_name?: string; email?: string; password?: string}, { dispatch, rejectWithValue }) => {
        try {
        const response = await apiCallWithRefresh(dispatch, () => api.user.userUpdate(credentials));
        return response.data;
        } catch (error: any) {
        return rejectWithValue(error.response.data.error || 'Ошибка изменения данных');
        }
    }
);

export const refreshTokenAsync = createAsyncThunk(
  'user/refreshTokenAsync',
  async (_, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      if (!refresh_token) {
        throw new Error('Refresh token отсутствует');
      }
      const response = await api.user.userRefreshCreate({ refresh_token });
      const { token, new_refresh_token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', new_refresh_token);
      api.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { token, new_refresh_token };
    } catch (error: any) {
      return rejectWithValue(error.response.data.error || 'Ошибка обновления токена');
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
                const { username, first_name, last_name, email, is_staff, is_superuser } = action.payload;
                state.username = username;
                state.data = {
                  first_name,
                  last_name,
                  email,
                };
                state.isAuthenticated = true;
                state.isCurator = is_staff || is_superuser;
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
            .addCase(logoutUserAsync.fulfilled, (state, action) => {
                state.username = '';
                state.isAuthenticated = false;
                state.data = initialState.data
                state.isCurator = false;
                state.error = null;
                state.loading = false;
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                delete api.instance.defaults.headers.common['Authorization'];
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(registerUserAsync.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                const { username } = action.payload;
                state.username = username;
                state.data = {
                  first_name: action.payload.first_name,
                  last_name: action.payload.last_name,
                  email: action.payload.email,
                };
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
            })
            .addCase(refreshTokenAsync.fulfilled, (state, action) => {
                state.error = null;
            })
            .addCase(refreshTokenAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            });
            },
});

export const useIsAuthenticated = () => useSelector((state: RootState) => state.user.isAuthenticated);
export const useUsername = () => useSelector((state: RootState) => state.user.username);
export const useIsCurator = () => useSelector((state: RootState) => state.user.isCurator);

export const {setError} = userSlice.actions;
export default userSlice.reducer;