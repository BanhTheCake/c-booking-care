import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    editData: {},
    isEditing: false
};

export const userEditSlice = createSlice({
    name: 'userEdit',
    initialState,
    reducers: {
        setEditData(state, action) {
                const newState = { ...state }
                newState.editData = action.payload
                return newState
            },
        setStateEdit(state, action) {
            const newState = { ...state }
            newState.isEditing = action.payload
            return newState
        }
    },
    extraReducers: {}
});

export const { setEditData, setStateEdit } = userEditSlice.actions;

export default userEditSlice.reducer;
