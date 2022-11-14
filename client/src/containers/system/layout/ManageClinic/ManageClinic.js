import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createNewClinic } from '../../../../api/fetchClinic';
import InputFile from '../../../../components/form/InputFile/InputFile';
import InputVertical from '../../../../components/form/InputVertical/InputVertical';
import MarkdownValidate from '../../../../components/form/MarkdownValidate/MarkdownValidate';
import { schemaManageClinic } from '../../../../constant/validateVar';
import './ManageClinic.scss';

const ManageClinic = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schemaManageClinic),
    });

    const [prevData, setPrevData] = useState()

    const fnCreateNewClinic = useMutation(createNewClinic, {
        onSuccess: (data) => {
            reset()
            const isUpdate = data?.message?.startsWith('Update')
            if (isUpdate) {
                return toast.success('Update clinic success !')
            }
            return toast.success('Create clinic success !')
        },
        onError: (err) => {
            return toast.error(err?.message || 'Create clinic failed !')
        },
        retry: 0,
    });

    const onSubmit = (data) => {
        if (!_.isEmpty(prevData) && _.isEqual(prevData, data)) {
            return;
        }
        setPrevData(data)
        fnCreateNewClinic.mutate(data);
    };

    return (
        <>
            <div className="ManageClinic-container">
                <div className="container">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="ManageClinic-form"
                    >
                        <div className="ManageClinic-item ManageClinic-file">
                            <InputFile
                                control={control}
                                name={'fileClinic'}
                                errors={errors}
                                height={'400px'}
                                positionErrMes={'left'}
                            />
                        </div>
                        <div className="ManageClinic-item">
                            <InputVertical
                                errors={errors}
                                register={register}
                                label={'nameClinic'}
                                name={'nameClinic'}
                                nameDisplay={'Tên phòng khám'}
                            />
                        </div>
                        <div className="ManageClinic-item">
                            <InputVertical
                                errors={errors}
                                register={register}
                                label={'addressClinic'}
                                name={'addressClinic'}
                                nameDisplay={'Địa chỉ phòng khám'}
                            />
                        </div>
                        <div className="ManageClinic-item">
                            <MarkdownValidate
                                control={control}
                                errors={errors}
                                name={'markdownClinic'}
                                nameDisplay={'Giới thiệu'}
                                height={'500px'}
                            />
                        </div>
                        <div className="ManageClinic-item">
                            <button className="ManageClinic-btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ManageClinic;
