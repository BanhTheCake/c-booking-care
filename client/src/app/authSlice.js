import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urlLogin, urlLogout } from '../constant/apiVar';
import { setDataWhenLogin } from './userSlice';

export const handleLogin = createAsyncThunk(
    'auth/login',
    async (data, { dispatch, rejectWithValue }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios({
                    method: 'post',
                    url: urlLogin,
                    data: {
                        email: data.email,
                        password: data.password,
                    },
                    withCredentials: 'include',
                });
                const { errCode, message, dataUser, accessToken } = res.data;
                if (errCode !== 0) {
                    return reject(rejectWithValue(message));
                }
                dispatch(setDataWhenLogin({ dataUser, accessToken }));
                resolve();
            } catch (error) {
                console.log(error);
                reject(
                    rejectWithValue(
                        error?.message || 'Something wrong with server'
                    )
                );
            }
        });
    }
);

export const handleLogOut = createAsyncThunk(
    'auth/logout',
    async (data, { dispatch, rejectWithValue }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const resData = await axios({
                    method: 'get',
                    url: urlLogout,
                    withCredentials: 'include',
                });
                if (resData.data.errCode !== 0) {
                    console.log(resData.data);
                    reject(rejectWithValue(resData.data));
                }
                if (data) {
                    dispatch(
                        handleChangeAuthState({ isLogin: false, error: data })
                    );
                    console.log('err: ', data);
                    toast.error(data);
                }
                dispatch(handleChangeAuthState({ isLogin: false }));
                resolve();
            } catch (error) {
                console.log(error);
                reject(rejectWithValue(error));
            }
        });
    }
);

const initialState = {
    isLogin: null,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleChangeAuthState(state, action) {
            let newState = { ...state, ...action.payload };
            return newState;
        },
    },
    extraReducers: {
        [handleLogin.fulfilled]: (state) => {
            state.isLogin = true;
            state.error = null;
        },
        [handleLogin.rejected]: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { handleChangeAuthState } = authSlice.actions;

export default authSlice.reducer;
