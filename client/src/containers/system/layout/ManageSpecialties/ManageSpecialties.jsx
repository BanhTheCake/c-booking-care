import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createNewSpecialty } from '../../../../api/fetchSpecialties';
import InputFile from '../../../../components/form/InputFile/InputFile';
import InputVertical from '../../../../components/form/InputVertical/InputVertical';
import MarkdownValidate from '../../../../components/form/MarkdownValidate/MarkdownValidate';
import { schemaManageSpecialties } from '../../../../constant/validateVar';
import './ManageSpecialties.scss';

const ManageSpecialties = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({
        resolver: yupResolver(schemaManageSpecialties),
    });

    const [prevData, setPrevData] = useState()

    const fnCreateNewSpecialty = useMutation(createNewSpecialty, {
        onSuccess: (data) => {
            reset()
            return toast.success('Create specialty success !')
        },
        onError: (err) => {
            return toast.error(err?.message || 'Create specialty failed !')
        }
    })

    const onSubmit = (data) => {
        if (!_.isEmpty(prevData) && _.isEqual(prevData, data)) {
            return;
        }
        setPrevData(data)
        fnCreateNewSpecialty.mutate(data)
    };

    return (
        <>
            <div className="ManageSpecialties-container">
                <div className="container">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="ManageSpecialties-form"
                    >
                        <div className="ManageSpecialties-item ManageSpecialties-file">
                            <InputFile
                                control={control}
                                name={'fileSpecialties'}
                                errors={errors}
                                height={'400px'}
                                positionErrMes={'left'}
                            />
                        </div>
                        <div className="ManageSpecialties-item">
                            <InputVertical
                                errors={errors}
                                register={register}
                                label={'nameSpecialties'}
                                name={'nameSpecialties'}
                                nameDisplay={'Tên chuyên khoa'}
                            />
                        </div>
                        <div className="ManageSpecialties-item">
                            <MarkdownValidate
                                control={control}
                                errors={errors}
                                name={'markdownSpecialties'}
                                nameDisplay={'Giới thiệu'}
                                height={'500px'}
                            />
                        </div>
                        <div className="ManageSpecialties-item">
                            <button className="ManageSpecialties-btn">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ManageSpecialties;
