import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchTopDoctor } from '../../../api/fetchDoctor';
import { setClinicList, setSpecialtyList, setTopDoctorList } from '../../../app/homeSlice';
import HomeBanner from '../components/Banner/HomeBanner';
import HealthFacilitiesSection from '../components/HealthFacilitiesSection/HealthFacilitiesSection';
import HomeFooter from '../components/HomeFooter/HomeFooter';
import MediaSection from '../components/MediaSection/MediaSection';
import HomeNavbar from '../components/Navbar/HomeNavbar';
import OutstandingDoctorSection from '../components/OutstandingDoctorSection/OutstandingDoctorSection';
import SpecialistSection from '../components/SpecialistSection/SpecialistSection';
import { Buffer } from 'buffer'
import Loading from '../../../components/Loading/Loading';
import './Home.scss'
import { getAllSpecialties } from '../../../api/fetchSpecialties';
import { fetchGetAllClinic } from '../../../api/fetchClinic';

const Home = () => {

    const dispatch = useDispatch()

    const { isLoading: isGetTopDoctor } = useQuery('getTopDoctor', fetchTopDoctor, {
        onSuccess: (resData) => {
            const newData = resData.map(item => {
                const newItem = {...item}
                newItem.image = new Buffer(newItem.image, 'base64').toString('binary')
                return newItem
            })
            dispatch(setTopDoctorList(newData))
        },
        onError: (err) => {
            console.log(err);
            return toast.error(err?.message || 'Something wrong with server !')
        },
        select: (resData) => {
            return resData.data.data
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    const { isLoading: isGetAllSpecialties } = useQuery('getAllSpecialties', getAllSpecialties, {
        onSuccess: (data) => {
            const newData = data.map(item => {
                const newItem = {...item}
                newItem.image = new Buffer(newItem.image, 'base64').toString('binary')
                return newItem
            })
            dispatch(setSpecialtyList(newData))
        },
        onError: (err) => {
            console.log(err);
        },
        select: (resData) => resData.data,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity
    })
    
    const { isLoading: isGetAllClinic } = useQuery('getAllClinic', fetchGetAllClinic, {
        onSuccess: (data) => {
            const newData = data.map(item => {
                const newItem = {...item}
                newItem.image = new Buffer(newItem.image, 'base64').toString('binary')
                return newItem
            })
            dispatch(setClinicList(newData))
        },
        onError: (err) => {
            console.log(err);
        },
        select: (resData) => resData.data,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity
    })
    

    const isLoading = isGetTopDoctor || isGetAllSpecialties || isGetAllClinic

    if (isLoading) {
        return (
            <div className="home__loading">
                    <Loading />
            </div>
        )
    }

    return (
        <div className="home">
            <HomeNavbar />
            <HomeBanner />
            <SpecialistSection />
            <HealthFacilitiesSection />
            <OutstandingDoctorSection />
            <MediaSection />
            <HomeFooter />
        </div>
    );
};

export default Home;
