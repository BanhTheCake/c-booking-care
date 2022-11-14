import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Login from './containers/auth/layout/Login/Login';
import Home from './containers/Home/layout/Home';
import HomeSystem from './containers/system/layout/HomeSystem/HomeSystem';
import PrivateRouter from './containers/system/PrivateRouter';
import { LOCALES } from './i18n/locales';
import { messages } from './i18n/messages';
import { flattenMessages } from './utils/flattenMessages';
import 'react-toastify/dist/ReactToastify.css';
import DoctorDetails from './containers/patient/layout/DoctorDetails/DoctorDetails';
import ScrollToTop from './containers/system/ScrollToTop';
import VerifyBooking from './containers/patient/layout/VerifyBooking/VerifyBooking';
import SpecialtyDetails from './containers/patient/layout/SpecialtyDetails/SpecialtyDetails';
import ClinicDetails from './containers/patient/layout/ClinicDetails/ClinicDetails';

function App() {
    const locale = useSelector((state) => state.app.language);
    return (
        <IntlProvider
            messages={flattenMessages(messages[locale])}
            locale={locale}
            defaultLocale={LOCALES.VIETNAMESE}
        >
            <div className={`app`}>
                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/doctor-details/:id" element={<DoctorDetails />} />
                        <Route path="/specialty-details/:id" element={<SpecialtyDetails />} />
                        <Route path="/clinic-details/:id" element={<ClinicDetails />} />
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/system"
                            element={ <PrivateRouter/> }
                        >
                            <Route index element={<Navigate to="/system/user-manage" />} />
                            <Route path="/system/*" element={<HomeSystem />} />
                        </Route>
                        <Route path="/verifyBooking" element={<VerifyBooking />} />
                        <Route path="*" element={<div> not found </div>} />
                    </Routes>
                </BrowserRouter>
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </IntlProvider>
    );
}

export default App;
