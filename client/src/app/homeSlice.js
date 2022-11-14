import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    topDoctorList: [],
    specialtyList: [],
    clinicList: [],
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setTopDoctorList: (state, action) => {
        const newData = {...state}
        newData.topDoctorList = action.payload;
        return newData 
    },
    setSpecialtyList: (state, action) => {
        const newData = {...state}
        newData.specialtyList = action.payload;
        return newData 
    },
    setClinicList: (state, action) => {
        const newData = {...state}
        newData.clinicList = action.payload;
        return newData 
    }
  },
})

export const { setTopDoctorList, setSpecialtyList, setClinicList } = homeSlice.actions

export default homeSlice.reducer