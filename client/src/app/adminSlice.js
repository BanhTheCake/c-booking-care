import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';
import { urlGetAllCodes } from '../constant/apiVar';

const initialState = {
    genders: [],
    roleId: [],
    positionId: [],
    isFetchData: false,
};

// another way to get data for [gender, role, position]
export const handleGetDataForSelect = createAsyncThunk(
    'admin/getDataSelect',
    async (_, { dispatch, rejectWithValue }) => {
        return Promise.all([
            handleGetGender(dispatch),
            handleGetRoleId(dispatch),
            handleGetPositionId(dispatch),
            
        ]).catch((errCode) => {
            console.log('errCode', errCode);
            return rejectWithValue();
        });
    }
);

export const handleGetGender = (dispatch) => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(async () => {
                const resData = await axiosClient({
                    method: 'get',
                    url: urlGetAllCodes,
                    params: {
                        type: 'gender',
                    },
                });
                if (resData.errCode !== 0) {
                    console.log(resData);
                    return reject(resData);
                }
                dispatch(setGenders(resData.data));
                resolve();
            }, 0);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};
export const handleGetRoleId = (dispatch) => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(async () => {
                const resData = await axiosClient({
                    method: 'get',
                    url: urlGetAllCodes,
                    params: {
                        type: 'role',
                    },
                });
                if (resData.errCode !== 0) {
                    console.log(resData);
                    return reject(resData);
                }
                dispatch(setRoleId(resData.data));
                resolve();
            }, 0);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

export const handleGetPositionId = (dispatch) => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(async () => {
                const resData = await axiosClient({
                    method: 'get',
                    url: urlGetAllCodes,
                    params: {
                        type: 'position',
                    },
                });
                if (resData.errCode !== 0) {
                    console.log(resData);
                    return reject(resData);
                }
                dispatch(setPositionId(resData.data));
                resolve();
            }, 300);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

// ====== //

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setGenders(state, action) {
            const newState = { ...state };
            newState.genders = action.payload;
            return newState;
        },
        setRoleId(state, action) {
            const newState = { ...state };
            newState.roleId = action.payload;
            return newState;
        },
        setPositionId(state, action) {
            const newState = { ...state };
            newState.positionId = action.payload;
            return newState;
        },
        setIsFetchData(state, action) {
            console.log('here');
            const newState = { ...state };
            newState.isFetchData = action.payload;
            return newState;
        },
    },
    extraReducers: {
        [handleGetDataForSelect.pending]: (state) => {
            state.isFetchData = true;
        },
        [handleGetDataForSelect.fulfilled]: (state) => {
            state.isFetchData = false;
        },
        [handleGetDataForSelect.rejected]: (state) => {
            state.isFetchData = false;
        },
    },
});

export const { setGenders, setRoleId, setPositionId, setIsFetchData } =
    adminSlice.actions;

export default adminSlice.reducer;
