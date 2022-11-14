import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataUser: {},
    accessToken: null,
    error: null,
    allUser: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDataWhenLogin(state, action) {
            const newState = { ...state };
            newState.dataUser = action.payload.dataUser;
            newState.accessToken = action.payload.accessToken;
            return newState;
        },
        setAccessToken(state, action) {
            const newState = { ...state };
            newState.accessToken = action.payload.accessToken;
            return newState;
        },
        setAllUser(state, action) {
            const newState = { ...state };
            newState.allUser = action.payload;
            return newState;
        },
        addNewUser(state, action) {
            const newState = { ...state };
            newState.allUser = [action.payload, ...newState.allUser];
            return newState;
        },
        removeSelectUser(state, action) {
            const newState = { ...state };
            newState.allUser = newState.allUser.filter(
                (item) => item.id !== action.payload
            );
            return newState;
        },
        updateAllUser(state, action) {
            let newArr = [...state.allUser];
            newArr = newArr.map((user) => {
                if (user.id === action.payload.id) {
                    return action.payload;
                }
                return user;
            });
            return { ...state, allUser: newArr };
        },
    },
});

export const {
    setDataWhenLogin,
    setAccessToken,
    addNewUser,
    removeSelectUser,
    updateAllUser,
    setAllUser,
} = userSlice.actions;

export default userSlice.reducer;
