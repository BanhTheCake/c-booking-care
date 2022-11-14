import axios from "axios"
import { urlBulkCreateSchedule, urlConfirmBooking, urlGetAllDoctor, urlGetDaySchedule, urlGetDetailsDoctor, urlGetDoctorInfo, urlGetMarkdownDoctor, urlGetPatientDoctor, urlGetScheduleHour, urlGetTopDoctor, urlUpdateOrCreateDoctor } from "../constant/apiVar"
import convertBase64 from "../utils/convertBase64"
import reduce_image_file_size from "../utils/reduceFile"
import axiosClient from "./axiosClient"

const fetchAllDoctor = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const resData = await axiosClient({
                method: 'get',
                url: urlGetAllDoctor,
            })
            if (resData.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const handleUpdateOrCreateDoctor = (reqData) => {
    return new Promise( async (resolve, reject) => {
        try {
            const resData = await axiosClient({
                method: 'post',
                url: `${urlUpdateOrCreateDoctor}/${reqData.doctorId}`,
                data: { ...reqData }
            })
            if (resData.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchGetMarkdownDoctor = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        try {
            const resData = await axiosClient({
                method: 'get',
                url: `${urlGetMarkdownDoctor}/${queryKey[1]}`
            })
            if (resData.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchGetDetailsDoctor = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        const [key, id] = queryKey
        try {
            const resData = await axios({
                method: 'get',
                url: `${urlGetDetailsDoctor}/${id}`
            })
            if (resData.data.errCode !== 0) {
                return reject(resData.data)
            }
            resolve(resData.data)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchTopDoctor = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const resData = await axios({
                method: 'get',
                url: urlGetTopDoctor,
                params: {
                    limit: 10
                }
            })
            if (resData.data.errCode !== 0) {
                return reject(resData);
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const handleBulkCreateSchedule = (reqData) => {
    return new Promise( async (resolve, reject) => {
        try {
            const resData = await axiosClient({
                method: 'post',
                url: urlBulkCreateSchedule,
                data: {
                    ...reqData
                }
            })
            // if (resData.errCode !== 0) {
            //     return reject(resData)
            // }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchDaySchedule = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        const [key, doctorId] = queryKey
        try {
            const data = await axios({
                method: 'get',
                url: urlGetDaySchedule,
                params: {
                    doctorId
                }
            })
            const resData = data?.data;
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchScheduleHourList = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        const [key, doctorId, date] = queryKey
        try {
            const data = await axios({
                method: 'get',
                url: urlGetScheduleHour,
                params: {
                    doctorId,
                    date
                }
            })
            const resData = data?.data
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchDoctorInfo = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        const [key, doctorId] = queryKey
        try {
            const data = await axios({
                method: 'get',
                url: `${urlGetDoctorInfo}/${doctorId}`
            })
            const resData = data?.data
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchPatientDoctor = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        try {
            const [key, doctorId, date] = queryKey
            const resData = await axiosClient({
                method: 'get',
                url: urlGetPatientDoctor,
                params: {
                    doctorId,
                    date
                }
            })
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const handleConfirmBooking = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { image, ...reqData } = data;
            const inputFileConvert = await convertBase64(image);
            const inputFileReduce = await reduce_image_file_size(
                inputFileConvert
            );
            reqData.image = inputFileReduce;
            const resData = await axiosClient({
                method: 'post',
                url: urlConfirmBooking,
                data: reqData
            })
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

export { fetchAllDoctor, handleUpdateOrCreateDoctor, fetchGetMarkdownDoctor, fetchGetDetailsDoctor, fetchTopDoctor, handleBulkCreateSchedule, fetchDaySchedule, fetchScheduleHourList, fetchDoctorInfo,
fetchPatientDoctor, handleConfirmBooking }