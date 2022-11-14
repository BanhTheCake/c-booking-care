import axios from "axios";
import { urlCreateNewClinic, urlGetAllClinic, urlGetClinicById, urlGetDoctorInClinic } from "../constant/apiVar";
import convertBase64 from "../utils/convertBase64";
import reduce_image_file_size from "../utils/reduceFile";
import axiosClient from "./axiosClient";

const createNewClinic = (data) => {
    return new Promise( async (resolve, reject) => {
        const { fileClinic } = data;
        try {
            let reqData = {};
            const inputFileConvert = await convertBase64(fileClinic);
            const inputFileReduce = await reduce_image_file_size(
                inputFileConvert
            );
            reqData.image = inputFileReduce;
            reqData.name = data?.nameClinic
            reqData.description = data?.markdownClinic
            reqData.address = data?.addressClinic
            const resData = await axiosClient({
                method: 'post',
                url: urlCreateNewClinic,
                data: { ...reqData },
            });
            if (resData.errCode !== 0) {
                return reject(resData);
            }
            resolve(resData);
        } catch (error) {
            console.log(error);
            return reject(error);
        }
    })
}

const fetchGetAllClinic = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: urlGetAllClinic
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

const fetchGetClinicById = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        try {
            const [key, clinicId] = queryKey
            const res = await axios({
                method: 'get',
                url: `${urlGetClinicById}/${clinicId}`
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

const fetchGetDoctorInClinic = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        try {
            const [key, clinicId, provinceId] = queryKey
            const res = await axios({
                method: 'get',
                url: `${urlGetDoctorInClinic}/${clinicId}`,
                params: {
                    provinceId
                }
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

export { createNewClinic, fetchGetAllClinic, fetchGetClinicById, fetchGetDoctorInClinic }