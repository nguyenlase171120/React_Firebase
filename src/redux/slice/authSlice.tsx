import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { photosApi } from '../../api/photosApi';
import {
    ForgotPassword,
    loginWithFacebook,
    loginWithFirebase,
    loginWithGoogle,
    logout,
    SignUpWithFirebase,
} from '../../firebase/authAction';
import {
    Iinital,
    IParamsPagination,
    IUserLogin,
    IUserRegister,
} from '../../types';

const initialState = {
    currentUser: {
        displayName: '',
        email: '',
        remember: false,
        password: '',
    },
    loading: false,
    listPhotos: [
        {
            albumId: 1,
            id: 1,
            title: '',
            url: '',
            thumbnailUrl: '',
        },
    ],
};

export const authRegister = createAsyncThunk(
    'auth/register',
    async (user: IUserRegister) => await SignUpWithFirebase(user)
);

export const authLogin = createAsyncThunk(
    'auth/login',
    async (user: IUserLogin, state) => await loginWithFirebase(user)
);

export const authLoginGoogle = createAsyncThunk(
    'auth/google',
    async () => await loginWithGoogle()
);

export const authLoginFacebook = createAsyncThunk(
    'auth/facebook',
    async () => await loginWithFacebook()
);

export const authForgotPassword = createAsyncThunk(
    'auth/forgotPasswod',
    async (email: string) => await ForgotPassword(email)
);

export const authLogout = createAsyncThunk(
    'auth/logout',
    async () => await logout()
);

export const getListPhotos = createAsyncThunk(
    'photos/paging',
    async (params: IParamsPagination, action) => {
        const result = await photosApi.getPhotosByPaging(params);

        return result;
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getListPhotos.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getListPhotos.fulfilled, (state, action) => {
            state.loading = false;
            // state.listPhotos.push(action.payload);
        });
        builder
            .addMatcher(
                ({ type }) =>
                    type.startsWith('auth') && type.endsWith('/pending'),
                state => {
                    state.loading = true;
                }
            )
            .addMatcher(
                ({ type }) =>
                    type.startsWith('auth') && type.endsWith('/fulfilled'),
                state => {
                    state.loading = false;
                }
            );
    },
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
