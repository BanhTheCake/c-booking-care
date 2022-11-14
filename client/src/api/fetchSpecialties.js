import axios from "axios";
import { urlCreateNewSpecialty, urlGetAllSpecialties, urlGetDoctorInSpecialty, urlGetSpecialty } from "../constant/apiVar";
import convertBase64 from "../utils/convertBase64";
import reduce_image_file_size from "../utils/reduceFile";
import axiosClient from "./axiosClient";

const createNewSpecialty = (data) => {
    return new Promise( async (resolve, reject) => {
        const { fileSpecialties} = data;
        try {
            let reqData = {};
            const inputFileConvert = await convertBase64(fileSpecialties);
            const inputFileReduce = await reduce_image_file_size(
                inputFileConvert
            );
            reqData.image = inputFileReduce;
            reqData.name = data?.nameSpecialties
            reqData.description = data?.markdownSpecialties
            const resData = await axiosClient({
                method: 'post',
                url: urlCreateNewSpecialty,
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

const getAllSpecialties = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: urlGetAllSpecialties,
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

const fetchSpecialtyById = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        try {
            const [key, specialtyId] = queryKey
            const res = await axios({
                method: 'get',
                url: `${urlGetSpecialty}/${specialtyId}`,
            })
            const resData = res?.data;
            if (resData?.errCode !== 0) {
                return reject(resData)
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchDoctorInSpecialty = ({ queryKey }) => {
    return new Promise( async (resolve, reject) => {
        try {
            const [key, specialtyId, provinceId] = queryKey
            const res = await axios({
                method: 'get',
                url: `${urlGetDoctorInSpecialty}/${specialtyId}`,
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

export { createNewSpecialty, getAllSpecialties, fetchSpecialtyById, fetchDoctorInSpecialty }