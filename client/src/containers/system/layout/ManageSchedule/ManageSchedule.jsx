import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchDataOptions } from '../../../../api/fetchAdmin';
import { fetchAllDoctor, handleBulkCreateSchedule } from '../../../../api/fetchDoctor';
import InputDayPicker from '../../../../components/form/InputDayPicker/InputDayPicker';
import InputSelectBasic from '../../../../components/form/InputSelectBasic/InputSelectBasic';
import Loading from '../../../../components/Loading/Loading';
import './ManageSchedule.scss';

const ManageSchedule = () => {
    const roleId = useSelector((state) => state.user.dataUser.roleId);
    const userId = useSelector((state) => state.user.dataUser.id);
    const isAdmin = roleId === 'R1'
    let doctorId = isAdmin ? null : userId;

    const [doctorSelect, setDoctorSelect] = useState(doctorId);
    const [selectDay, setSelectDay] = useState(new Date(dayjs().startOf('date')));
    const [prevValue, setPrevValue] = useState('');
    const [selectHour, setSelectHour] = useState([]);

    const language = useSelector((state) => state.app.language);

    const fnBulkCreateSchedule = useMutation(handleBulkCreateSchedule, {
        onSuccess: (data, variables) => {
            setPrevValue(variables)
            toast.success('Create Schedule success !')
        },
        onError: (err) => {
            console.log(err);
            toast.error(err?.message || 'Something wrong with server !')
        }
    })

    const { isLoading: isGetAllDoctorLoading, data: dataAllDoctor } = useQuery(
        'getAllDoctor',
        fetchAllDoctor,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData.data,
            refetchOnWindowFocus: false,
            enabled: isAdmin
        }
    );

    const { isLoading: isGetHourLoading, data: dataHourDoctor } = useQuery(
        'Time',
        fetchDataOptions,
        {
            onError: (err) => {
                console.log(err);
            },
            select: (resData) => resData.data,
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const isLoading = isGetAllDoctorLoading || isGetHourLoading;

    const OptionDoctor = useMemo(() => {
        if (!dataAllDoctor) return [];
        const options = dataAllDoctor.map((item) => {
            const newObj = {};
            newObj.value = item.id;
            newObj.label = `${item.firstName} ${item.lastName}`;
            return newObj;
        });
        return options;
    }, [dataAllDoctor]);

    const handleSelectDay = useCallback((data) => {
        setSelectDay(data);
    }, [])

    const handleModifyDay = (item) => {
        if (selectHour?.includes(item)) {
            let newSelectHour = [...selectHour];
            newSelectHour = newSelectHour.filter(
                (itemCur) => itemCur.id !== item.id
            );
            setSelectHour(newSelectHour);
            return;
        }
        const newSelectHour = [...selectHour];
        newSelectHour.push(item);
        setSelectHour(newSelectHour);
    };

    const handleSaveData = useCallback(
        (e) => {
            if (!doctorSelect) {
                return toast.error('You must choose the doctor !');
            }
            if (selectHour.length === 0) {
                return toast.error('You must choose hour for day !');
            }
            const hourData = selectHour.map(item => {
                const newItem = {
                    doctorId: doctorSelect,
                    selectDay: dayjs(selectDay).valueOf(), 
                    timeType: item.keyMap,
                }
                return newItem
            })
            const reqData = {
                doctorId: doctorSelect,
                selectDay: dayjs(selectDay).valueOf(),
                hourData,
            };
            if (_.isEqual(prevValue, reqData)) {
                return toast.success('Create Schedule success !')
            }
            console.log(reqData);
            fnBulkCreateSchedule.mutate(reqData)
        },
        [doctorSelect, prevValue, selectHour, selectDay, fnBulkCreateSchedule]
    );

    if (isLoading) {
        return (
            <div className="Manage-schedule__loading">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <div className="Manage-schedule__container">
                <div className="container">
                    <div className="Manage-schedule__top">
                        {isAdmin && (
                            <InputSelectBasic
                                nameDisplay={'manage-doctor.choose-doctor'}
                                options={OptionDoctor}
                                setData={setDoctorSelect}
                            />
                        )}
                        <InputDayPicker
                            selectDay={selectDay}
                            handleSelectDay={handleSelectDay}
                        />
                    </div>
                    <div className="Manage-schedule__bottom">
                        {dataHourDoctor &&
                            dataHourDoctor?.map((item, index) => {
                                return (
                                    <p
                                        key={item.valueVI + index}
                                        className={`Manage-schedule__hour ${
                                            selectHour.includes(item) &&
                                            'active'
                                        }`}
                                        onClick={() => handleModifyDay(item)}
                                    >
                                        {language === 'vi-VI' ? item.valueVI : item.valueEN}
                                    </p>
                                );
                            })}
                    </div>
                    <div className="Manage-schedule__btn">
                        <button onClick={handleSaveData}>
                            <FormattedMessage id="manage-doctor.btn" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageSchedule;
