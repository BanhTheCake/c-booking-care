import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchDataOptions } from '../../../../api/fetchAdmin';
import {
    fetchDoctorInSpecialty,
    fetchSpecialtyById,
} from '../../../../api/fetchSpecialties';
import InputSelectBasicLanguage from '../../../../components/form/InputBasicLanguageSelect/InputBasicLanguageSelect';
import Loading from '../../../../components/Loading/Loading';
import MarkdownMDEditor from '../../../../components/MarkdownMDEditor/MarkdownMDEditor';
import HomeNavbar from '../../../Home/components/Navbar/HomeNavbar';
import DoctorDetailsInfo from '../../component/DoctorDetailsInfo/DoctorDetailsInfo';
import DoctorScheduleHour from '../../component/DoctorScheduleHour/DoctorScheduleHour';
import './SpecialtyDetails.scss';

const SpecialtyDetails = () => {
    const [provinceId, setProvinceId] = useState('');
    const params = useParams();
    const specialtyId = params?.id;

    const { isFetching: isGetSpecialtyById, data: dataSpecialty } = useQuery(
        ['getSpecialtyById', specialtyId],
        fetchSpecialtyById,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData.data,
            retry: 1,
            refetchOnWindowFocus: false,
        }
    );

    const { isFetching: isGetDoctorInSpecialty, data: dataDoctor } = useQuery(
        ['getDoctorInSpecialty', specialtyId, provinceId],
        fetchDoctorInSpecialty,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData?.data,
            refetchOnWindowFocus: false,
        }
    );

    const { isLoading: isGetProvince, data: dataProvince } = useQuery(
        ['province'],
        fetchDataOptions,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData?.data || [],
            retry: 0,
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
        }
    );

    const provinceOpts = useMemo(() => {
        if (!dataProvince) return [];
        let newData = dataProvince?.map((data) => {
            const newObj = {};
            newObj.value = data?.keyMap;
            newObj.valueVI = data?.valueVI;
            newObj.valueEN = data?.valueEN;
            return newObj;
        });
        const allProvince = {
            value: '',
            valueVI: 'Toàn quốc',
            valueEN: 'All province',
        };
        return [allProvince, ...newData];
    }, [dataProvince]);

    const isLoading = isGetSpecialtyById || isGetProvince

    if (isLoading) {
        return (
            <div className="specialtiesDetails__loading">
                    <Loading />
            </div>
        )
    }

    return (
        <>
            <HomeNavbar />
            <div className="SpecialtyDetails-container">
                <div className="SpecialtyDetails-info">
                    <div className="container">
                        <MarkdownMDEditor
                            data={dataSpecialty?.description}
                            style={{ whiteSpace: 'pre-wrap' }}
                            isShow={true}
                        />
                    </div>
                </div>
                <div className="SpecialtyDetails-doctors">
                    <div className="container">
                        <div className="SpecialtyDetails-select">
                            <InputSelectBasicLanguage
                                value={provinceOpts.find(
                                    (data) => data?.value === provinceId
                                )}
                                options={provinceOpts}
                                setData={setProvinceId}
                            />
                        </div>
                        {isGetDoctorInSpecialty && <>
                            <div className="SpecialtyDetails-list"
                            >
                                {Array.from(Array(1).keys())?.map((_, index) => {
                                    return (
                                        <div
                                            className="SpecialtyDetails-doctor"
                                            key={index}
                                            >
                                            <div className="SpecialtyDetails-doctor__left">
                                                <DoctorDetailsInfo
                                                    infinityLoading={true}
                                                />
                                            </div>
                                            <div className="SpecialtyDetails-doctor__right">
                                                <DoctorScheduleHour
                                                    direction={'column'}
                                                    infinityLoading={true}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>}
                        {!isGetDoctorInSpecialty && (
                            <div className="SpecialtyDetails-list"
                            >
                                {dataDoctor?.map((doctor) => {
                                    return (
                                        <div
                                            className="SpecialtyDetails-doctor"
                                            key={
                                                doctor?.doctorId +
                                                doctor?.specialtiesId
                                            }>
                                            <div className="SpecialtyDetails-doctor__left">
                                                <DoctorDetailsInfo
                                                    doctorId={doctor?.doctorId}
                                                />
                                            </div>
                                            <div className="SpecialtyDetails-doctor__right">
                                                <DoctorScheduleHour
                                                    doctorId={doctor?.doctorId}
                                                    direction={'column'}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpecialtyDetails;
