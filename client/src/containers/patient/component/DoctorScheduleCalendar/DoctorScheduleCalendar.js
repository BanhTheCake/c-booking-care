import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { fetchScheduleHourList } from '../../../../api/fetchDoctor';
import FormModalDoctorDetails from '../../../../components/Modal/Components/FormModalDoctorDetails';
import ModalBasic from '../../../../components/Modal/ModalBasic/ModalBasic';
import DoctorCalendar from '../../../../Skeleton/DoctorCalendar/DoctorCalendar';
import './DoctorScheduleCalendar.scss';
import 'react-loading-skeleton/dist/skeleton.css'

const DoctorScheduleCalendar = ({ doctorId, date, isParentLoading = false, infinityLoading = false }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [hourSelect, setHourSelect] = useState(null);

    const { isFetching: isGetHourList, data: dataHourList } = useQuery(
        ['getHourList', doctorId, date],
        fetchScheduleHourList,
        {
            onSettled: (data, err) => {
                if (err) {
                    console.log(err);
                    return toast.error(
                        err?.errCode || 'Something wrong with server !'
                    );
                }
            },
            enabled: !!date && !infinityLoading,
            refetchOnWindowFocus: false,
            select: (resData) => resData.data,
        }
    );

    return (
        <>
            <div className="DoctorScheduleCalendar__content">
                {(isGetHourList || isParentLoading || infinityLoading) && <>
                    <div className="DoctorScheduleCalendar__wrapper">
                        <div className="DoctorScheduleCalendar__hourList">
                            {Array.from(Array(8).keys())?.map((_, index) => {
                                return (
                                    <Skeleton height={30} key={index} />
                                );
                            })}
                        </div>
                        <p className="DoctorScheduleCalendar__guide">
                            <Skeleton />
                        </p>
                        <p className="DoctorScheduleCalendar__warning">
                            <Skeleton />
                        </p>
                    </div>
                </>}
                {!isGetHourList && !isParentLoading && !infinityLoading && (
                    <div className="DoctorScheduleCalendar__wrapper">
                        <div className="DoctorScheduleCalendar__hourList">
                            {dataHourList?.map((data) => {
                                return (
                                    <div
                                        key={data?.id + data?.date}
                                        className="DoctorScheduleCalendar__hourItem"
                                        onClick={() => {
                                            setIsShowModal(true);
                                            setHourSelect(data);
                                        }}
                                    >
                                        <p>{data?.timeTypeData.valueVI}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="DoctorScheduleCalendar__guide">
                            <FormattedMessage id="DoctorDetails.bookFree" />
                        </p>
                        <p className="DoctorScheduleCalendar__warning">
                            <FormattedMessage id="DoctorDetails.warning" />
                        </p>
                    </div>
                )}
            </div>
            <ModalBasic
                isOpen={isShowModal}
                setIsOpen={setIsShowModal}
                label={'Thông tin lịch khám bệnh'}
            >
                <FormModalDoctorDetails
                    setIsOpen={setIsShowModal}
                    doctorId={doctorId}
                    hourSelect={hourSelect}
                />
            </ModalBasic>
        </>
    );
};

export default DoctorScheduleCalendar;
