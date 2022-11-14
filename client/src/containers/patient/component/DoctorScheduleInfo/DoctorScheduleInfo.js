import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NumericFormat } from 'react-number-format';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchDoctorInfo } from '../../../../api/fetchDoctor';
import './DoctorScheduleInfo.scss';

const DoctorScheduleInfo = ({ doctorId, isParentLoading = false, infinityLoading = false }) => {

    const [showDetailsPrice, setShowDetailsPrice] = useState(false);

    const language = useSelector((state) => state.app.language);

    const { isLoading: isGetDoctorInfo, data: DataDoctorSelect } = useQuery(
        ['getDoctorInfo', doctorId],
        fetchDoctorInfo,
        {
            onError: (err) => {
                console.log('err', err);
                return toast.error(
                    err?.errCode || 'Something wrong with server !'
                );
            },
            enabled: !!doctorId && !infinityLoading,
            refetchOnWindowFocus: false,
            staleTime: 30000,
            select: (resData) => resData?.data || [],
        }
    );

    const handleToggleShow = () => {
        setShowDetailsPrice(!showDetailsPrice);
    };



    return (
        <div className="DoctorScheduleInfo__content">
            <p className="DoctorScheduleInfo__label">{ isParentLoading || infinityLoading ? <Skeleton width={160} /> : 'ĐỊA CHỈ KHÁM:' }</p>
            <p className="DoctorScheduleHour__hospital">
                { isParentLoading || infinityLoading ? <Skeleton width={160} /> : DataDoctorSelect?.nameClinic}
            </p>
            <p className="DoctorScheduleInfo__address">
                { isParentLoading || infinityLoading  ? <Skeleton  /> : DataDoctorSelect?.addressClinic}
            </p>
            {(isParentLoading || infinityLoading) && <>
                <div className="DoctorScheduleInfo__price">
                    <Skeleton height={36} />
                </div>
            </>}
            {!showDetailsPrice && !isParentLoading && !infinityLoading && (
                <div className="DoctorScheduleInfo__price">
                    <span>GIÁ KHÁM:</span>
                    <NumericFormat
                        value={
                            language === 'vi-VI'
                                ? DataDoctorSelect?.priceData?.valueVI
                                : DataDoctorSelect?.priceData?.valueEN
                        }
                        displayType="text"
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        suffix={language === 'vi-VI' ? 'Đ' : '$'}
                    />
                    <span onClick={handleToggleShow}>Xem chi tiết</span>
                </div>
            )}
            {showDetailsPrice && (
                <div className="DoctorScheduleInfo__price-more">
                    <p className="DoctorScheduleInfo__price-more-title">
                        GIÁ KHÁM:
                    </p>
                    <div className="DoctorScheduleInfo__price-box-wrapper">
                        <div className="DoctorScheduleInfo__price-box">
                            <div className="DoctorScheduleInfo__price-up">
                                <div className="DoctorScheduleInfo__price-title">
                                    <p>Giá khám</p>
                                    <p>
                                        <NumericFormat
                                            value={
                                                language === 'vi-VI'
                                                    ? DataDoctorSelect
                                                          ?.priceData?.valueVI
                                                    : DataDoctorSelect
                                                          ?.priceData?.valueEN
                                            }
                                            displayType="text"
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            suffix={
                                                language === 'vi-VI' ? 'Đ' : '$'
                                            }
                                        />
                                    </p>
                                </div>
                                <p className="DoctorScheduleInfo__price-note">
                                    {DataDoctorSelect?.note}
                                </p>
                            </div>
                            <div className="DoctorScheduleInfo__price-down">
                                <p>
                                    {`Người bệnh có thể thanh toán chi
                                                phí bằng hình thức: ${
                                                    DataDoctorSelect?.paymentData
                                                        ? language === 'vi-VI'
                                                            ? DataDoctorSelect
                                                                  ?.paymentData
                                                                  ?.valueVI
                                                            : DataDoctorSelect
                                                                  ?.paymentData
                                                                  ?.valueEN
                                                        : ''
                                                }`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p
                        className="DoctorScheduleInfo__price-more-off"
                        onClick={handleToggleShow}
                    >
                        Ẩn bảng giá
                    </p>
                </div>
            )}
        </div>
    );
};

export default DoctorScheduleInfo;
