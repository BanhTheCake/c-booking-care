import React, { useMemo } from 'react';
import './DoctorDetails.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchGetDetailsDoctor } from '../../../../api/fetchDoctor';
import HomeNavbar from '../../../Home/components/Navbar/HomeNavbar';
import Loading from '../../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import MarkdownMDEditor from '../../../../components/MarkdownMDEditor/MarkdownMDEditor';
import DoctorScheduleHour from '../../component/DoctorScheduleHour/DoctorScheduleHour';
import DoctorDetailsInfo from '../../component/DoctorDetailsInfo/DoctorDetailsInfo';
import CommentFacebook from '../../../../SocialPlugins/CommentFacebook/CommentFacebook';

const DoctorDetails = () => {
    const params = useParams();
    const doctorId = params?.id

    const { isLoading: isGetDetailsDoctor, data: dataDoctor } = useQuery(
        ['getDetailsDoctor', doctorId],
        fetchGetDetailsDoctor,
        {
            onError: (err) => {
                console.log(err);
                return toast.error(
                    err?.message || 'Something wrong with server !'
                );
            },
            select: (resData) => {
                const newData = { ...resData.data };
                if (newData?.image) {
                    const imageBase64 = new Buffer(
                        newData.image,
                        'base64'
                    ).toString('binary');
                    newData.image = imageBase64;
                }
                return newData;
            },
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: Infinity,
            retry: 1,
        }
    );

    return (
        <>
            <HomeNavbar />
            <div className="DoctorDetails-container">
                {isGetDetailsDoctor ? (
                    <div className="DoctorDetails__loading">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className="DoctorDetails-des">
                            <div className="container">
                               <DoctorDetailsInfo doctorId={doctorId} />
                                <div className="DoctorDetails-hour">
                                    <DoctorScheduleHour 
                                        doctorId={doctorId} 
                                        direction={'row'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="DoctorDetails-blogger">
                            <div className="container">
                                <div className="DoctorDetails-blog">
                                    <MarkdownMDEditor 
                                        data={dataDoctor?.Markdown?.contentMarkdown} 
                                        style={{
                                            whiteSpace: 'pre-wrap',
                                            backgroundColor: 'inherit',
                                        }}   
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="DoctorDetails-Comment">
                        <div className="container">
                            <CommentFacebook width={'100%'} />
                        </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DoctorDetails;
