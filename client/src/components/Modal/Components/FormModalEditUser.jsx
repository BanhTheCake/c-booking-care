import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueries } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchDataOptions } from '../../../api/fetchAdmin';
import { fetchUpdateUser } from '../../../api/fetchUser';
import { updateAllUser } from '../../../app/userSlice';
import { schemaFormModalRedux } from '../../../constant/validateVar';
import convertBase64 from '../../../utils/convertBase64';
import reduce_image_file_size from '../../../utils/reduceFile';
import InputFile from '../../form/InputFile/InputFile';
import InputSelectVertical from '../../form/InputSelectVertical/InputSelectVertical';
import InputVertical from '../../form/InputVertical/InputVertical';
import './FormModalEditUser.scss';

const FormModalEditUser = ({ setIsOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schemaFormModalRedux),
    });

    const dispatch = useDispatch()
    
    const editData = useSelector((state) => state.userEdit.editData);
    const [isLoading, setIsLoading] = useState(false)

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

    const fnUpdateUser = useMutation(fetchUpdateUser, {
        onSuccess: (_resData, variables) => {
            dispatch(updateAllUser(variables))
            toast.success('Update user successfully !')
        },
        onError: (err) => {
            console.log('err', err);
            toast.error(err?.message || 'Something wrong with server !')
        },
        onSettled: (data, err) => {
            setIsOpen(false)
        }
    })

    useEffect(() => {
        setIsLoading(true)
        reset({ ...editData });
        const clear = setTimeout(() => {
            setIsLoading(false)
        }, 0)
        return () => {
            if (clear) clearTimeout(clear)
        }
    }, [editData, reset]);

    const onSubmit = async (data) => {
        const { inputFile, ...reqData } = data;
        const isSame = _.isEqual(reqData, editData);
        if (isSame && !inputFile) {
            setIsOpen(false);
            return;
        }
        if (inputFile) {
            const imgBase64 = await convertBase64(inputFile)
            reqData.image = await reduce_image_file_size(imgBase64)
        }
        fnUpdateUser.mutate(reqData)
    };

    return (
        <>
           <form
                onSubmit={handleSubmit(onSubmit)}
                className="ModalEditUser-form"
            >
                <div className="ModalEditUser-form__left">
                    <div className="ModalEditUser-form__left-input">
                        <InputFile
                            control={control}
                            name={'inputFile'}
                            errors={errors}
                            defaultValue={editData?.image || null}
                        />
                    </div>
                    <div className="userRedux-form__left-btn">
                        <button>Lưu</button>
                    </div>
                </div>
                <div className="ModalEditUser-form__right">
                        <div className="col-3">
                        <InputVertical
                            label={'email'}
                            name={'email'}
                            errors={errors}
                            nameDisplay={'manage-user.email'}
                            register={register}
                            disable={true}
                        />
                    </div>
                    <div className="col-3">
                        <InputVertical
                            label={'phoneNumber'}
                            name={'phoneNumber'}
                            errors={errors}
                            nameDisplay={'manage-user.phoneNumber'}
                            register={register}
                        />
                    </div>
                    <div className="col-3">
                        <InputVertical
                            label={'firstName'}
                            name={'firstName'}
                            errors={errors}
                            nameDisplay={'manage-user.firstName'}
                            register={register}
                        />
                    </div>
                    <div className="col-3">
                        <InputVertical
                            label={'lastName'}
                            name={'lastName'}
                            errors={errors}
                            nameDisplay={'manage-user.lastName'}
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
                            menuPlacement="top"
                            nameDisplay={'manage-user.gender'}
                            name={'gender'}
                            options={genderOps.data}
                            control={control}
                            errors={errors}
                        />
                    </div>
                    <div className="col-2">
                        <InputSelectVertical
                            menuPlacement="top"
                            nameDisplay={'manage-user.roleId'}
                            name={'roleId'}
                            options={roleOps.data}
                            control={control}
                            errors={errors}
                        />
                    </div>
                    <div className="col-2">
                        <InputSelectVertical
                            menuPlacement="top"
                            nameDisplay={'manage-user.positionId'}
                            name={'positionId'}
                            options={positionOps.data}
                            control={control}
                            errors={errors}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormModalEditUser;
