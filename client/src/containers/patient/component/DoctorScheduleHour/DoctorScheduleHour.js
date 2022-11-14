import dayjs from 'dayjs';
import { } from 'dayjs/locale/vi';
import _ from 'lodash';
import React, { memo, useMemo, useState } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import {
    fetchDaySchedule
} from '../../../../api/fetchDoctor';
import InputSelectBasicLanguage from '../../../../components/form/InputBasicLanguageSelect/InputBasicLanguageSelect';
import DoctorHourSkeleton from '../../../../Skeleton/DoctorHourSkeleton/DoctorHourSkeleton';
import DoctorScheduleCalendar from '../DoctorScheduleCalendar/DoctorScheduleCalendar';
import DoctorScheduleInfo from '../DoctorScheduleInfo/DoctorScheduleInfo';
import './DoctorScheduleHour.scss';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '180px',
        border: 'none',
        borderRadius: 'none',
        borderBottom: '1.6px solid black',
        boxShadow: 'none',
        fontWeight: '600',
        textTransform: 'capitalize',
    }),
    menu: (provided) => ({
        ...provided,
        width: '180px',
    }),
};

const DoctorScheduleHour = ({ doctorId, direction = 'row', infinityLoading = false }) => {
    const [date, setDate] = useState(null);

    const {
        isLoading: isGetDaySchedule,
        isFetching: isFetchDaySchedule,
        data: dataDaySchedule,
    } = useQuery(['GetDayDoctor', doctorId], fetchDaySchedule, {
        onError: (err) => {
            console.log('error', err);
        },
        onSettled: (data, err) => {
            if (err) return;
            if (!data || _.isEmpty(data)) {
                return;
            }
            // get item that has time >= time today
            let defaultData = data.find((item) => {
                const compareToday = dayjs(+item?.date).diff(
                    dayjs().startOf('date')
                );
                return compareToday >= 0;
            });
            setDate(defaultData?.date);
        },
        enabled: !!doctorId && !infinityLoading,
        select: (resData) => resData.data,
        refetchOnWindowFocus: false,
    });

    const optionData = useMemo(() => {
        let newData = dataDaySchedule?.map((data) => {
            const object = {};
            // Compare time in data and item in today => get time >= today to render
            // convert string => number
            if (dayjs(+data.date).diff(dayjs().startOf('date')) === 0) {
                object.valueVI = `Hôm nay ${dayjs(+data.date).format('DD-MM')}`;
                object.valueEN = `Today ${dayjs(+data.date).format('DD-MM')}`;
            } else {
                object.valueVI = dayjs(+data.date)
                    .locale('vi')
                    .format('ddd DD-MM');
                object.valueEN = dayjs(+data.date).format('ddd DD-MM');
            }
            object.value = data.date;
            return object;
        });
        newData = newData?.filter((item) => {
            const compareToday = dayjs(+item.value).diff(
                dayjs().startOf('date')
            );
            return compareToday >= 0;
        });
        return newData;
    }, [dataDaySchedule]);
    
    const isLoading = isGetDaySchedule || isFetchDaySchedule

    return (
        <>
            <div className="DoctorScheduleHour__container">
                <div className="DoctorScheduleHour__select">
                    { !isLoading && !infinityLoading ? <InputSelectBasicLanguage
                        value={optionData &&
                            optionData.find((data) => data.value === date)}
                        options={optionData}
                        setData={setDate}
                        styles={customStyles}
                    /> : <Skeleton width={130} height={30} /> }
                </div>
                <div className="DoctorScheduleHour__calendar-icon">
                    { !isLoading && !infinityLoading ? <>
                        <div className="DoctorScheduleHour__icon">
                        <AiFillCalendar size={24} />
                    </div>
                    <p>
                        <FormattedMessage id="DoctorDetails.calendar" />
                    </p>
                    </> : <Skeleton width={130} height={30} />}
                </div>
                <div className={`DoctorScheduleHour__content ${direction}`}>
                        <div className="DoctorScheduleHour__content-left">
                            <DoctorScheduleCalendar doctorId={doctorId} date={date} isParentLoading={isLoading} infinityLoading={infinityLoading} />
                        </div>
                        <div className="DoctorScheduleHour__content-right">
                            <DoctorScheduleInfo doctorId={doctorId} isParentLoading={isLoading} infinityLoading={infinityLoading} />
                        </div>
                </div>
            </div>
        </>
    );
};

export default memo(DoctorScheduleHour);
