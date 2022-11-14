import React, { useMemo, useState } from 'react';
import InputDayPicker from '../../../../components/form/InputDayPicker/InputDayPicker';
import './ManagePatient.scss';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    fetchPatientDoctor,
    handleConfirmBooking,
} from '../../../../api/fetchDoctor';
import { useSelector } from 'react-redux';
import Table from '../../../../components/Table/Table';
import { FormattedMessage } from 'react-intl';
import ModalBasic from '../../../../components/Modal/ModalBasic/ModalBasic';
import InputFile from '../../../../components/form/InputFile/InputFile';
import InputVertical from '../../../../components/form/InputVertical/InputVertical';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const todayAtMidnight = dayjs().startOf('date').valueOf();
const ManagePatient = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm();

    const queryClient = useQueryClient();

    const fnConfirmBooking = useMutation(handleConfirmBooking, {
        onSuccess: (_, variables) => {
            queryClient.setQueryData(
                ['getPatientDoctor', doctorId, selectedDay],
                (data) => {
                    const newDataPatient = dataPatient?.filter(
                        (item) =>
                            item?.patientId !== variables?.patientId &&
                            item?.timeType !== variables?.timeType
                    );
                    return { ...data, data: newDataPatient };
                }
            );
            setIsOpenModal(false);
            return toast.success('Confirm booking success !');
        },
        onError: (err) => {
            console.log(err);
            return toast.error(err?.message || 'Confirm booking error !');
        },
    });

    const onCancelModal = () => {
        setIsOpenModal(false);
    };

    const doctorId = useSelector((state) => state.user?.dataUser?.id);
    const language = useSelector((state) => state.app.language);

    const [selectedDay, handleSelectedDay] = useState(todayAtMidnight);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { isLoading: isGetPatientDoctor, data: dataPatient } = useQuery(
        ['getPatientDoctor', doctorId, selectedDay],
        fetchPatientDoctor,
        {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (err) => {
                console.log(err);
            },
            retry: 0,
            refetchOnWindowFocus: false,
            enabled: !!doctorId || !!selectedDay,
            select: (resData) => resData?.data || [],
        }
    );

    const onHandleSelectedDay = (data) => {
        const milliSecond = dayjs(data).valueOf();
        handleSelectedDay(milliSecond);
    };

    const dataPatientTable = useMemo(() => {
        if (!dataPatient || dataPatient.length === 0) {
            return [];
        }

        const newArr = dataPatient?.map((item, index) => {
            const newObj = {};
            newObj.id = index;
            newObj.email = item?.patientData?.email;
            newObj.firstName = item?.patientData?.firstName;
            newObj.address = item?.patientData?.address;
            newObj.gender =
                language === 'vi-VI'
                    ? item?.patientData?.genderData?.valueVI
                    : item?.patientData?.genderData?.valueEN;
            newObj.timeType =
                language === 'vi-VI'
                    ? item?.timeTypePatientData?.valueVI
                    : item?.timeTypePatientData?.valueEN;
            return newObj;
        });

        return newArr;
    }, [dataPatient, language]);

    const patientColumns = useMemo(() => {
        if (!dataPatientTable || dataPatientTable.length === 0) {
            return [];
        }
        // define col for table
        const newObjectOfItem = dataPatientTable[0];

        let newArr = Object.keys(newObjectOfItem).map((key) => {
            return {
                Header: <FormattedMessage id={`table.${key}`} />,
                accessor: key,
            };
        });
        const editCell = {
            Header: <FormattedMessage id="table.action" />,
            accessor: 'action',
            Cell: ({ cell }) => {
                const handleClick = () => {
                    console.log(cell?.row?.original);
                    setIsOpenModal(true);
                    reset({
                        gmail: cell?.row?.original?.email,
                    });
                };
                return (
                    <button
                        onClick={handleClick}
                        className="ManagePatient-col-btn"
                    >
                        Hoàn thành
                    </button>
                );
            },
        };
        newArr.push(editCell);
        return newArr;
    }, [dataPatientTable, reset]);

    const onSubmit = (data) => {
        // { doctorId, patientId, timeType, email, image, fullName }
        console.log(dataPatient);
        const currentPatient = dataPatient?.find((item) => {
            return item?.patientData?.email === data.gmail;
        });
        const reqData = {};
        reqData.doctorId = currentPatient.doctorId;
        reqData.patientId = currentPatient.patientId;
        reqData.timeType = currentPatient.timeType;
        reqData.email = data.gmail;
        reqData.image = data.FilePatient;
        reqData.fullName = data?.patientData?.firstName;
        fnConfirmBooking.mutate(reqData);
    };

    return (
        <>
            <div className="ManagePatient">
                <div className="container">
                    <h2>Quản lý bệnh nhân</h2>
                    <div className="ManagePatient-date">
                        <InputDayPicker
                            handleSelectDay={onHandleSelectedDay}
                            selectDay={new Date(selectedDay)}
                        />
                    </div>
                    <div className="ManagePatient-table">
                        <Table
                            columns={patientColumns}
                            data={dataPatientTable}
                        />
                    </div>
                </div>
                <ModalBasic
                    label={'Xác nhận hoá đơn (gửi ảnh đơn thuốc)'}
                    isOpen={isOpenModal}
                    setIsOpen={setIsOpenModal}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="ManagePatient-form"
                    >
                        <div className="ManagePatient-item">
                            <InputVertical
                                register={register}
                                errors={errors}
                                label={'gmail'}
                                name={'gmail'}
                                nameDisplay={'Gmail'}
                                disable={true}
                            />
                        </div>
                        <div className="ManagePatient-item">
                            <InputFile
                                control={control}
                                name={'FilePatient'}
                                errors={errors}
                                height={250}
                            />
                        </div>
                        <div className="ManagePatient-item ManagePatient-form__btnGroup">
                            <button className="ManagePatient-form__btn access">
                                Xác nhận
                            </button>
                            <button
                                onClick={onCancelModal}
                                className="ManagePatient-form__btn cancel"
                            >
                                Huỷ bỏ
                            </button>
                        </div>
                    </form>
                </ModalBasic>
            </div>
        </>
    );
};

export default ManagePatient;
