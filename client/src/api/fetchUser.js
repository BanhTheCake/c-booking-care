import {
    urlCreateNewUser,
    urlDeleteUser,
    urlGetAllUser,
    urlUpdateUser,
} from '../constant/apiVar';
import convertBase64 from '../utils/convertBase64';
import reduce_image_file_size from '../utils/reduceFile';
import axiosClient from './axiosClient';

const HandleCreateNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { inputFile, ...reqData } = data;
        try {
            const inputFileConvert = await convertBase64(inputFile);
            const inputFileReduce = await reduce_image_file_size(
                inputFileConvert
            );
            reqData.image = inputFileReduce;
            const resData = await axiosClient({
                method: 'post',
                url: urlCreateNewUser,
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
    });
};

const fetchAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await axiosClient({
                method: 'get',
                url: urlGetAllUser,
            });
            if (resData?.errCode !== 0 || !resData?.data) {
                console.log(resData);
                return reject(resData);
            }
            resolve(resData);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const fetchDeleteUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const resData = await axiosClient({
                    method: 'delete',
                    url: `${urlDeleteUser}/${id}`,
                });
                if (resData?.errCode !== 0) {
                    return reject(resData);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        }, 300);
    });
};

const fetchUpdateUser = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout( async () => {
            try {
                const resData = await axiosClient({
                    method: 'patch',
                    url: `${urlUpdateUser}/${data?.id || ''}`,
                    data: {
                        ...data
                    }
                })
                if (resData.errCode !== 0) {
                    return reject(resData)
                }
                resolve(resData)
            } catch (error) {
                reject(error)
            } 
        }, 300);
    })
}

export { HandleCreateNewUser, fetchAllUser, fetchDeleteUser, fetchUpdateUser };
