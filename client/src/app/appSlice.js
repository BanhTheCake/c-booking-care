import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  language: 'vi-VI',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleChangeLanguage(state, action) {
      const newState = { ...state }
      newState.language = action.payload
      return {
        ...newState
      }
    },
  },
})

export const { handleChangeLanguage } = appSlice.actions

export default appSlice.reducer