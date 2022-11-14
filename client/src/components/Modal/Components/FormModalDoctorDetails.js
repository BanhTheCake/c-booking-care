import React, { useMemo, useState } from "react";
import InputVertical from "../../form/InputVertical/InputVertical";
import './FormModalDoctorDetails.scss'
import { useForm } from "react-hook-form";
import DoctorDetailsInfo from "../../../containers/patient/component/DoctorDetailsInfo/DoctorDetailsInfo";
import { fetchDoctorInfo, fetchGetDetailsDoctor } from "../../../api/fetchDoctor";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Buffer } from 'buffer';
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { schemaDoctorDetails } from "../../../constant/validateVar";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import InputSelectVertical from "../../form/InputSelectVertical/InputSelectVertical";
import { fetchDataOptions } from "../../../api/fetchAdmin";
import InputDayPickerValidate from "../../form/InputDayPickerValidate/InputDayPickerValidate";
import { handleBookAppointment } from "../../../api/fetchPatient";

const buildAddressClinic = (DataDoctorSelect) => {
    if (!DataDoctorSelect) return '';
    return `${DataDoctorSelect?.nameClinic}, ${DataDoctorSelect?.addressClinic}`
}

const buildFullDate = (hourSelect, language) => {

    if (!hourSelect || !language) return '';

    let date = ''
    if (language === 'vi-VI') {
        date = dayjs(+hourSelect?.date).locale('vi').format('dddd DD/MM/YYYY') || ''
    } else {
        date = dayjs(+hourSelect?.date).format('dddd DD/MM/YYYY') || ''
    }
    return `${hourSelect?.timeTypeData?.valueVI} - ${date}`
}

const FormModalDoctorDetails = ({ doctorId, setIsOpen, hourSelect }) => {

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schemaDoctorDetails)
    });

    const language = useSelector(state => state.app.language)
    const queryClient = useQueryClient()

    const [formattedValue, setFormattedValue] = useState()
    const cacheData = queryClient.getQueryData(['getDetailsDoctor', doctorId])

    const dataDoctor = useMemo(() => {
        return cacheData?.data || []
    }, [cacheData])

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
            enabled: !!doctorId,
            refetchOnWindowFocus: false,
            staleTime: 30000,
            select: (resData) => resData?.data || [],
        }
    );

    const { isLoading: isGetGender, data: DataGenderOpt } = useQuery(
        ['gender'],
        fetchDataOptions,
        {
            onError: (err) => {
                console.log('err', err);
                return toast.error(
                    err?.errCode || 'Something wrong with server !'
                )
            },
            retry: 0,
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            select: (resData) => resData?.data || []
        }
    )

    const fnHandleBookAppointment = useMutation(handleBookAppointment, {
        onSuccess: () => {
            setIsOpen(false)
            return toast.success('book appointment success !')
        },
        onError: (err) => {
            console.log(err);
            return toast.error(err?.message || 'Something wrong with server ')
        }
    })

    const onSubmit = data =>{
        let reqData = {}
        reqData = {...data}
        reqData.birthDay = dayjs(reqData.birthDay).startOf('date').valueOf()
        reqData.doctorId = doctorId
        reqData.date = hourSelect?.date
        reqData.timeType = hourSelect?.timeType
        reqData.nameDoctor = `${dataDoctor.lastName} ${dataDoctor.firstName}`
        reqData.address = buildAddressClinic(DataDoctorSelect)
        reqData.time = buildFullDate(hourSelect, language)
        reqData.price = formattedValue
        fnHandleBookAppointment.mutate(reqData)
    };

    const handleClose = () => {
        setIsOpen(false)
    }

    const renderBookTime = () => {
        let date = buildFullDate(hourSelect, language)
        let addressClinic = buildAddressClinic(DataDoctorSelect)

        return (
            <>
                <div className="ModalDoctorDetails-time">
                        <p>{addressClinic}</p>
                        <p>{date}</p>
                        <p>Miễn phí đặt lịch khám</p>
                </div>
            </>
        )
    }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="ModalDoctorDetails-container">
            <div className="ModalDoctorDetails-info">
                <DoctorDetailsInfo doctorId={doctorId} showDescription={false}>
                    {renderBookTime()}
                </DoctorDetailsInfo>
            </div>
            <div className="ModalDoctorDetails-price">
                <span>Giá khám:</span>
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
                            onValueChange={(val) => {
                                setFormattedValue(val.formattedValue)
                            }}
                        />
            </div>
            <div className="ModalDoctorDetails-hour">
                <span>Giờ khám: </span>
                <span>{hourSelect.timeTypeData.valueVI}</span>
            </div>
            <div className="ModalDoctorDetails-form">
                <div className="ModalDoctorDetails-item col-1">
                    <InputVertical 
                        errors={errors}
                        register={register}
                        label={'name'}
                        name={'name'}
                        nameDisplay={'Họ tên'}
                    />
                </div>
                <div className="ModalDoctorDetails-item col-1">
                    <InputVertical 
                        errors={errors}
                        register={register}
                        label={'phoneNumber'}
                        name={'phoneNumber'}
                        nameDisplay={'Số điện thoại'}
                    />
                </div>
                <div className="ModalDoctorDetails-item col-1">
                    <InputVertical 
                        errors={errors}
                        register={register}
                        label={'email'}
                        name={'email'}
                        nameDisplay={'Địa chỉ email'}
                    />
                </div>
                <div className="ModalDoctorDetails-item col-1">
                    <InputVertical 
                        errors={errors}
                        register={register}
                        label={'address'}
                        name={'address'}
                        nameDisplay={'Địa chỉ liên hệ'}
                    />
                </div>
                <div className="ModalDoctorDetails-item col-2">
                    <InputVertical 
                        errors={errors}
                        register={register}
                        label={'method'}
                        name={'method'}
                        nameDisplay={'Lý do khám'}
                    />
                </div>
                <div className="ModalDoctorDetails-item col-1">
                    <InputDayPickerValidate
                        control={control}
                        errors={errors}
                        name={'birthDay'}
                        label={'birthDay'}
                        nameDisplay={'Ngày sinh'}     
                        menuPosition={'top'}               
                    />
                </div>
                <div className="ModalDoctorDetails-item col-1">
                    <InputSelectVertical
                        control={control}
                        errors={errors}
                        name={'gender'} 
                        menuPlacement={'top'}
                        nameDisplay={'Giới tính'}
                        options={DataGenderOpt}                   
                    />
                </div>
                <div className="ModalDoctorDetails-item col-2">
                    <div className="ModalDoctorDetails-btnGroup">
                        <button type="submit" className="btn-blue">Đặt lịch</button>
                        <button type="button" className="btn-red" onClick={handleClose}>Huỷ</button>
                    </div>
                </div>
            </div>
        </form>
    </>
  );
};

export default FormModalDoctorDetails;
