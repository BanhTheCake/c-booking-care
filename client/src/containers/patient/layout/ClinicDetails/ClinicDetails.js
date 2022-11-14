import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchGetClinicById, fetchGetDoctorInClinic } from '../../../../api/fetchClinic';
import HomeNavbar from '../../../Home/components/Navbar/HomeNavbar';
import './ClinicDetails.scss';
import { IoLocationSharp } from 'react-icons/io5'
import MarkdownMDEditor from '../../../../components/MarkdownMDEditor/MarkdownMDEditor';
import { Buffer } from 'buffer';
import InputSelectBasicLanguage from '../../../../components/form/InputBasicLanguageSelect/InputBasicLanguageSelect';
import DoctorDetailsInfo from '../../component/DoctorDetailsInfo/DoctorDetailsInfo';
import DoctorScheduleHour from '../../component/DoctorScheduleHour/DoctorScheduleHour';
import { fetchDataOptions } from '../../../../api/fetchAdmin';
import Loading from '../../../../components/Loading/Loading';

const ClinicDetails = () => {
    const [provinceId, setProvinceId] = useState('');
    const params = useParams();
    const clinicId = params?.id;

    const { isLoading: isGetClinic, data: dataClinic } = useQuery(
        ['getClinicById', clinicId],
        fetchGetClinicById,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => {
                const data = resData?.data
                const newData = {...data}
                newData.image = new Buffer(newData.image, 'base64').toString('binary')
                return newData
            },
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: Infinity,
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

    const { isFetching: isGetDoctorInClinic, data: dataDoctor } = useQuery(
        ['getDoctorInClinic', clinicId, provinceId],
        fetchGetDoctorInClinic,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData?.data,
            refetchOnWindowFocus: false,
        }
    );

    const isLoading = isGetClinic || isGetProvince

    if (isLoading) {
        return (
            <div className="ClinicDetails__loading">
                    <Loading />
            </div>
        )
    }

    return (
        <>
            <HomeNavbar />
            <div className="ClinicDetails-container">
                <div className="ClinicDetails-info">
                    <div className="container">
                        <div className="ClinicDetails-img">
                            <img src={dataClinic?.image} alt="" />
                        </div>
                        <div className="ClinicDetails-logo">
                            <div className="ClinicDetails-logo__img">
                                <img src={dataClinic?.image} alt="" />
                            </div>
                            <div className="ClinicDetails-logo__title">
                                <h3>{dataClinic?.name}</h3>
                                <div className="ClinicDetails-logo__address">
                                <IoLocationSharp size={20} />
                                <p>
                                    { dataClinic?.address }
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ClinicDetails-doctors">
                    <div className="container">
                        <div className="ClinicDetails-select">
                            <InputSelectBasicLanguage
                                value={provinceOpts.find(
                                    (data) => data?.value === provinceId
                                )}
                                options={provinceOpts}
                                setData={setProvinceId}
                            />
                        </div>
                        {isGetDoctorInClinic && <div className="specialtiesDetails__loading">
                    <Loading />
            </div>}
                        {!isGetDoctorInClinic && (
                            <div className="ClinicDetails-list"
                            >
                                {dataDoctor?.map((doctor) => {
                                    return (
                                        <div
                                            className="ClinicDetails-doctor"
                                            key={
                                                doctor?.doctorId +
                                                doctor?.specialtiesId
                                            }>
                                            <div className="ClinicDetails-doctor__left">
                                                <DoctorDetailsInfo
                                                    doctorId={doctor?.doctorId}
                                                />
                                            </div>
                                            <div className="ClinicDetails-doctor__right">
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
                <div className="ClinicDetails-des">
                    <div className="container">
                        <p className='title'>Giới thiệu: </p>
                        <MarkdownMDEditor style={{ whiteSpace: 'pre-wrap' }} data={dataClinic?.description} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicDetails;
