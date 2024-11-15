import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

export interface TUserData {
  user: TUser | null;
  isAuthenticated: boolean;
}

const initialState: TUserData = {
  user: {
    email: '',
    name: ''
  },
  isAuthenticated: false
};

export const register = createAsyncThunk(
  'user/registerUser',
  async (userRegister: TRegisterData) => {
    const data = await registerUserApi(userRegister);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (userLogin: TLoginData) => {
    const data = await loginUserApi(userLogin);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const update = createAsyncThunk(
  'user/update',
  async (userUpdate: Partial<TRegisterData>) => {
    const data = await updateUserApi(userUpdate);
    return data.user;
  }
);

/*export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => {
    await forgotPasswordApi(email);
  }
);*/

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthenticated = true;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {})
      .addCase(update.pending, (state) => {})
      .addCase(register.pending, (state) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(login.rejected, (state, action) => {})
      .addCase(update.rejected, (state, action) => {})
      .addCase(register.rejected, (state, action) => {});
  },
  selectors: {}
});

export const {} = authUserSlice.selectors;
export const { authChecked, userLogout } = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;
