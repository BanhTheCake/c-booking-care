import axios from "axios"
import { urlBookAppointment, urlVerifyBooking } from "../constant/apiVar"

const handleBookAppointment = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'post',
                url: urlBookAppointment,
                data: data
            })
            const resData = res?.data
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const handleVerifyBooking = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        const [key, doctorId, token] = queryKey
        try {
            const res = await axios({
                method: 'post',
                url: urlVerifyBooking,
                params: {
                    doctorId: doctorId,
                    token: token
                }
            })
            const resData = res.data
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

export { handleBookAppointment, handleVerifyBooking }