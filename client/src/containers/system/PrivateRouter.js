import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { fetchDataUser } from '../../api/fetchAdmin';
import { handleChangeAuthState } from '../../app/authSlice';
import { setDataWhenLogin } from '../../app/userSlice';

const PrivateRouter = () => {

    const isLogin = useSelector((state) => state.auth.isLogin);
    const dispatch = useDispatch();

    const { isLoading: isFetchData } = useQuery('getDataUser', fetchDataUser, {
        onSuccess: (resData) => {
            dispatch(
                setDataWhenLogin({
                    dataUser: resData.dataUser,
                    accessToken: resData.accessToken,
                })
            );
        },
        onError: (err) => {
            console.log(err);
            dispatch(handleChangeAuthState({ isLogin: false }));
        },
        select: (resData) => resData.data,
        retryDelay: 300,
        // staleTime: limit the number of call api in millisecond ( staleTime <= cacheTime )
        staleTime: Infinity,
        // cacheTime: it call api in background and compare with data in cache to replace if different
        // cacheTime: 1000 => after 1000ms data it will delete
        cacheTime: Infinity,
        enabled: !!isLogin,
    });

    if (isFetchData) return null;

    return (
        <>
            { isLogin ? <Outlet /> : <Navigate to="/login"/> }
        </>
    );
};

export default PrivateRouter;
