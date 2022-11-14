import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchGetDetailsDoctor } from '../../../../api/fetchDoctor';
import MarkdownMDEditor from '../../../../components/MarkdownMDEditor/MarkdownMDEditor';
import './DoctorDetailsInfo.scss';
import { Buffer } from 'buffer';
import Skeleton from 'react-loading-skeleton';

const DoctorDetailsInfo = ({ children, doctorId, showDescription = true, infinityLoading = false }) => {
    const language = useSelector((state) => state.app.language);

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
            enabled: !!doctorId && !infinityLoading,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: Infinity,
            retry: 1,
        }
    );

    return (
        <div className="DoctorDetailsInfo">
            <div className="img">
                { isGetDetailsDoctor || infinityLoading ? <Skeleton width={120} height={120} circle={true} /> : <>
                <img
                    src={
                        dataDoctor?.image ||
                        'https://cdn.bookingcare.vn/fr/w200/2019/11/14/103848anh-dai-dien-bs.jpg'
                    }
                    alt=""
                />
                </> }
            </div>
            <div className="info">
                <h3>
                    { isGetDetailsDoctor || infinityLoading ? <Skeleton height={30} style={{marginBottom: '1rem'}} /> : <>
                    {`${
                        language === 'vi-VI'
                            ? dataDoctor?.positionData?.valueVI
                            : dataDoctor?.positionData?.valueEN
                    }, ${dataDoctor?.lastName} ${dataDoctor?.firstName}`}
                    </>}
                </h3>
                {showDescription && (
                    <div className="DoctorDetailsInfo-des">
                        { isGetDetailsDoctor || infinityLoading ? <Skeleton count={4} style={{marginBottom: '0.6rem'}} /> : <>
                        <MarkdownMDEditor
                            data={dataDoctor?.Markdown?.description}
                            style={{ whiteSpace: 'pre-wrap' }}
                        />
                        </> }
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default DoctorDetailsInfo;
