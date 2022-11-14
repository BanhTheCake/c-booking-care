import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQueries, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchDataOptions } from '../../../../api/fetchAdmin';
import { fetchGetAllClinic } from '../../../../api/fetchClinic';
import {
    fetchAllDoctor,
    fetchGetMarkdownDoctor,
    handleUpdateOrCreateDoctor,
} from '../../../../api/fetchDoctor';
import { getAllSpecialties } from '../../../../api/fetchSpecialties';
import InputSelectBasic from '../../../../components/form/InputSelectBasic/InputSelectBasic.js';
import InputSelectBasicVal from '../../../../components/form/InputSelectBasicVal/InputSelectBasicVal';
import InputSelectVertical from '../../../../components/form/InputSelectVertical/InputSelectVertical';
import InputVertical from '../../../../components/form/InputVertical/InputVertical';
import MarkdownValidate from '../../../../components/form/MarkdownValidate/MarkdownValidate';
import Loading from '../../../../components/Loading/Loading';
import { schemaManageDoctor } from '../../../../constant/validateVar';
import './ManageDoctor.scss';

const ManageDoctor = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schemaManageDoctor),
    });

    const [doctorSelect, setDoctorSelect] = useState(null);
    const [prevValue, setPrevValue] = useState('');

    const [priceOps, paymentOps, provinceOps] = useQueries(
        ['price', 'payment', 'province'].map((query) => {
            return {
                queryKey: [query],
                queryFn: fetchDataOptions,
                retry: 0,
                staleTime: Infinity,
                cacheTime: Infinity,
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

    const isFetchSelect =
        priceOps.isLoading || paymentOps.isLoading || provinceOps.isLoading;

    const { isLoading: isGetAllDoctor, data: dataDoctor } = useQuery(
        'getAllDoctor',
        fetchAllDoctor,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData.data,
            refetchOnWindowFocus: false,
        }
    );

    const OptionDoctor = useMemo(() => {
        if (!dataDoctor) return [];
        const options = dataDoctor?.map((item) => {
            const newObj = {};
            newObj.value = item.id;
            newObj.label = `${item.firstName} ${item.lastName}`;
            return newObj;
        });
        return options;
    }, [dataDoctor]);

    const fnUpdateOrCreateDoctor = useMutation(handleUpdateOrCreateDoctor, {
        onSuccess: (_, variables) => {
            setPrevValue({ ...variables });
            toast.success('Successfully !');
        },
        onError: (err) => {
            toast.err(err?.message || 'Something wrong with server !');
        },
    });

    const onSubmit = useCallback(
        (data) => {
            if (!doctorSelect) {
                return toast.error('You must choose the doctor !');
            }
            const reqData = {
                doctorId: doctorSelect,
                ...data,
            };
            if (_.isEqual(prevValue, reqData)) {
                return;
            }
            console.log(reqData);
            fnUpdateOrCreateDoctor.mutate(reqData);
        },
        [doctorSelect, fnUpdateOrCreateDoctor, prevValue]
    );

    const { isFetching: isGetMarkdownData } = useQuery(
        ['getMarkdownDoctor', doctorSelect],
        fetchGetMarkdownDoctor,
        {
            onSuccess: (data) => {
                if (!data) {
                    reset({});
                    return;
                }
                const { doctorInfoData, ...markdownData } = data;
                reset({
                    ...doctorInfoData,
                    ...markdownData,
                });
                setPrevValue({
                    ...doctorInfoData,
                    ...markdownData,
                });
            },
            onError: (err) => {
                console.log(err);
                return toast.error(
                    err?.message || 'Something wrong with server !'
                );
            },
            select: (resData) => resData.data,
            enabled: !!doctorSelect,
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: isGetAllSpecialties, data: SpecialtiesList } = useQuery(
        'getAllSpecialties',
        getAllSpecialties,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData.data,
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const { isLoading: isGetClinicList, data: clinicList } = useQuery(
        'getAllClinic',
        fetchGetAllClinic,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData.data,
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const dataSpecialtiesList = useMemo(() => {
        const newData = SpecialtiesList?.map((item) => {
            const newObject = {};
            newObject.value = item.id;
            newObject.valueVI = item.name;
            newObject.valueEN = item.name;
            return newObject;
        });
        return newData;
    }, [SpecialtiesList]);

    const dataClinicList = useMemo(() => {
        const newData = clinicList?.map((item) => {
            const newObject = {};
            newObject.value = item.id;
            newObject.valueVI = item.name;
            newObject.valueEN = item.name;
            return newObject;
        });
        return newData;
    }, [clinicList])

    if (isGetAllDoctor) {
        return (
            <>
                <div className="ManageDoctor__loading">
                    <Loading />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="ManageDoctor-container">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="ManageDoctor-select">
                            <InputSelectBasic
                                nameDisplay={'manage-doctor.choose-doctor'}
                                options={OptionDoctor}
                                setData={setDoctorSelect}
                            />
                        </div>
                        {doctorSelect &&
                            !isGetMarkdownData &&
                            !isFetchSelect &&
                            !isGetAllSpecialties && 
                            !isGetClinicList && (
                                <div className="ManageDoctor-markdowns-group">
                                    <div className="ManageDoctor-select">
                                        <div className="col-2">
                                            <InputSelectVertical
                                                control={control}
                                                errors={errors}
                                                options={priceOps.data}
                                                name={'priceId'}
                                                nameDisplay={
                                                    'manage-doctor.price'
                                                }
                                                isPrice={true}
                                            />
                                        </div>
                                        <div className="col-2">
                                            <InputSelectVertical
                                                control={control}
                                                errors={errors}
                                                options={paymentOps.data}
                                                name={'paymentId'}
                                                nameDisplay={
                                                    'manage-doctor.payment'
                                                }
                                            />
                                        </div>
                                        <div className="col-2">
                                            <InputSelectVertical
                                                control={control}
                                                errors={errors}
                                                options={provinceOps.data}
                                                name={'provinceId'}
                                                nameDisplay={
                                                    'manage-doctor.province'
                                                }
                                            />
                                        </div>
                                        <div className="col-2">
                                            <InputVertical
                                                errors={errors}
                                                register={register}
                                                name={'nameClinic'}
                                                label={'nameClinic'}
                                                nameDisplay={
                                                    'manage-doctor.nameClinic'
                                                }
                                            />
                                        </div>
                                        <div className="col-2">
                                            <InputVertical
                                                errors={errors}
                                                register={register}
                                                name={'addressClinic'}
                                                label={'addressClinic'}
                                                nameDisplay={
                                                    'manage-doctor.addressClinic'
                                                }
                                            />
                                        </div>
                                        <div className="col-2">
                                            <InputSelectBasicVal
                                                control={control}
                                                errors={errors}
                                                name={'specialtiesId'}
                                                nameDisplay={'Chọn chuyên khoa'}
                                                options={dataSpecialtiesList}
                                            />
                                        </div>
                                        <div className="col-2">
                                            <InputSelectBasicVal
                                                control={control}
                                                errors={errors}
                                                name={'clinicId'}
                                                nameDisplay={'Chọn phòng khám'}
                                                options={dataClinicList}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <InputVertical
                                                errors={errors}
                                                register={register}
                                                name={'note'}
                                                label={'note'}
                                                nameDisplay={
                                                    'manage-doctor.note'
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="markdown ManageDoctor-info">
                                        <MarkdownValidate
                                            control={control}
                                            errors={errors}
                                            name={'description'}
                                            nameDisplay="manage-doctor.description"
                                        />
                                    </div>
                                    <div className="markdown ManageDoctor-blog">
                                        <MarkdownValidate
                                            control={control}
                                            errors={errors}
                                            name={'contentMarkdown'}
                                            nameDisplay="manage-doctor.blog"
                                        />
                                    </div>
                                    <div className="ManageDoctor-btn">
                                        <button type="submit">
                                            <FormattedMessage id="manage-doctor.btn" />
                                        </button>
                                    </div>
                                </div>
                            )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default ManageDoctor;
