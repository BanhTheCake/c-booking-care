import axios from 'axios';
import { handleLogOut } from '../app/authSlice';
import { setAccessToken } from '../app/userSlice';
import { urlRefreshToken } from '../constant/apiVar';
import axiosClient from './axiosClient';

const refreshAccessToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const resData = await axios({
                method: 'get',
                url: urlRefreshToken,
                withCredentials: 'include',
            });
            if (resData.data.errCode !== 0) {
                return reject(resData);
            }
            const { accessToken } = resData.data;
            resolve(accessToken);
        } catch (error) {
            reject(error);
        }
    });
};

const setupAxiosClient = (store) => {
    axiosClient.interceptors.request.use((config) => {
        const token = store.getState().user.accessToken;
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    axiosClient.interceptors.response.use(
        (response) => {
            if (response && response.data) {
                return response.data;
            }
            return response;
        },
        async function (err) {
            if (!err.response) throw err;
            if (err.response?.data?.errCode === -3) {
                try {
                    const newAccessToken = await refreshAccessToken();
                    store.dispatch(
                        setAccessToken({ accessToken: newAccessToken })
                    );
                    return axiosClient(err.config);
                } catch (error) {
                    console.log(error);
                    store.dispatch(
                        handleLogOut(
                            error.response?.data?.message ||
                                'something wrong with server !'
                        )
                    );
                }
            }
            throw err?.response?.data || err
        }
    );
};

export default setupAxiosClient;
