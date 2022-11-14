import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQueries } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchDataOptions } from '../../../../api/fetchAdmin';
import { HandleCreateNewUser } from '../../../../api/fetchUser';
import { addNewUser } from '../../../../app/userSlice';
import InputFile from '../../../../components/form/InputFile/InputFile';
import InputSelectVertical from '../../../../components/form/InputSelectVertical/InputSelectVertical';
import InputVertical from '../../../../components/form/InputVertical/InputVertical';
import InputVerticalPassword from '../../../../components/form/InputVerticalPassword/InputVerticalPassword';
import Loading from '../../../../components/Loading/Loading';
import { schemaFormRedux } from '../../../../constant/validateVar';
import './FormUserRedux.scss';

const FormUserRedux = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schemaFormRedux),
    });

    const dispatch = useDispatch();
    const [genderOps, roleOps, positionOps] = useQueries(
        ['gender', 'role', 'position'].map((query) => {
            return {
                queryKey: [query],
                queryFn: fetchDataOptions,
                retry: 0,
                staleTime: Infinity,
                cacheTime: Infinity,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                onError: (err) => {
                    toast.error(
                        err?.message || 'something wrong with server !'
                    );
                },
                select: (data) => {
                    return data?.data || [];
                },
                
            };
        })
    );

    const isLoadingQuery = genderOps.isLoading || roleOps.isLoading || positionOps.isLoading;

    const fnCreateNewUser = useMutation('createNewUser', HandleCreateNewUser, {
        onSuccess: (resData) => {
            dispatch(addNewUser(resData.data));
            reset();
            return toast.success('Create User successfully !');
        },
        onError: (err) => {
            console.log('err: ', err);
            return toast.error(
                err?.message || 'Something wrong with server !'
            );
        },
        // called even if success or error (and call in cache data)
        onSettled: (data, error) => {
        }
    })

    const onSubmit = async (data) => {
        fnCreateNewUser.mutate(data)
    };

    return (
        <>
            {isLoadingQuery ? (
                <div className="userRedux-form__loading">
                    <Loading />
                </div>
            ) : (
                <form
                    className="userRedux-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="userRedux-form__left">
                        <div className="userRedux-form__left-wrapper">
                            <InputFile
                                control={control}
                                name={'inputFile'}
                                errors={errors}
                            />
                        </div>
                        <div className="userRedux-form__left-btn">
                            <button disabled={fnCreateNewUser.isLoading} type="submit">
                                <FormattedMessage id="manage-user.submit" />
                            </button>
                        </div>
                    </div>
                    <div className="userRedux-form__right">
                        <div className="col-3">
                            <InputVertical
                                label={'email'}
                                name={'email'}
                                errors={errors}
                                nameDisplay={'manage-user.email'}
                                register={register}
                            />
                        </div>
                        <div className="col-3">
                            <InputVerticalPassword
                                label={'password'}
                                name={'password'}
                                errors={errors}
                                nameDisplay={'manage-user.password'}
                                register={register}
                            />
                        </div>
                        <div className="col-2">
                            <InputVertical
                                label={'firstName'}
                                name={'firstName'}
                                errors={errors}
                                nameDisplay={'manage-user.firstName'}
                                register={register}
                            />
                        </div>
                        <div className="col-2">
                            <InputVertical
                                label={'lastName'}
                                name={'lastName'}
                                errors={errors}
                                nameDisplay={'manage-user.lastName'}
                                register={register}
                            />
                        </div>
                        <div className="col-2">
                            <InputVertical
                                label={'phoneNumber'}
                                name={'phoneNumber'}
                                errors={errors}
                                nameDisplay={'manage-user.phoneNumber'}
                                register={register}
                            />
                        </div>
                        <div className="col-6">
                            <InputVertical
                                label={'address'}
                                name={'address'}
                                errors={errors}
                                nameDisplay={'manage-user.address'}
                                register={register}
                            />
                        </div>
                        <div className="col-2">
                            <InputSelectVertical
                                nameDisplay={'manage-user.gender'}
                                name={'gender'}
                                options={genderOps.data}
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <div className="col-2">
                            <InputSelectVertical
                                nameDisplay={'manage-user.roleId'}
                                name={'roleId'}
                                options={roleOps.data}
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <div className="col-2">
                            <InputSelectVertical
                                nameDisplay={'manage-user.positionId'}
                                name={'positionId'}
                                options={positionOps.data}
                                control={control}
                                errors={errors}
                            />
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default memo(FormUserRedux);
