import axios from "axios";
import { urlGetAllCodes, urlGetDataUser } from "../constant/apiVar";
import axiosClient from "./axiosClient";

const fetchDataOptions = ({ queryKey }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await axios({
                method: 'get',
                url: urlGetAllCodes,
                params: {
                    type: queryKey[0],
                },
            });
            const resData = data?.data
            if (resData.errCode !== 0) {
                return reject(resData);
            }
            resolve(resData);
        } catch (error) {
            reject(error);
        }
    });
};

const fetchDataUser = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const resData = await axios({
                method: 'get',
                url: urlGetDataUser,
                withCredentials: 'include',
            });
            if (resData.data.errCode !== 0) {
                return reject(resData);
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

export { fetchDataOptions, fetchDataUser }