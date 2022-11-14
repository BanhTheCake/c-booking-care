import React from "react";
import { useQuery } from "react-query";
import { useSearchParams, useLocation } from "react-router-dom";
import { handleVerifyBooking } from "../../../../api/fetchPatient";
import HomeNavbar from "../../../Home/components/Navbar/HomeNavbar";
import './VerifyBooking.scss'
import queryString from 'query-string'

const VerifyBooking = () => {
    
    const locations = useLocation()
    const { doctorId, token } = queryString.parse(locations.search)
    const { isLoading, isError, isSuccess } = useQuery(['verifyBooking', doctorId, token], handleVerifyBooking, {
        retry: 0,
        cacheTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })


  return (
    <>
        <div className="VerifyBooking-container">
            <HomeNavbar />
            <div className="VerifyBooking-wrapper">
                <div className="container">
                    <h3 className="VerifyBooking-title">
                        { isLoading && 'Vui lòng đợi 1 vài giây để kích hoạt ... ' }
                        { !isLoading && isError && 'Lịch khám đã được kích hoạt hoặc không tồn tại !' }
                        { !isLoading && isSuccess && 'Lịch khám đã được kích hoạt thành công !' }
                    </h3>
                </div>
            </div>
        </div>
    </>
  );
};

export default VerifyBooking;
