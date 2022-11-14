import React from 'react';
import { BiLogIn } from 'react-icons/bi';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { handleChangeLanguage } from '../../../../app/appSlice';
import { handleLogOut } from '../../../../app/authSlice';
import BarNavigator from '../../../../components/BarNavigator/BarNavigator';
import { doctorSystem, menuSystem } from '../../../../constant/data';
import PermissionRouter from '../../PermissionRouter';
import ManageClinic from '../ManageClinic/ManageClinic';
import ManageDoctor from '../ManageDoctor/ManageDoctor';
import ManagePatient from '../ManagePatient/ManagePatient';
import ManageSchedule from '../ManageSchedule/ManageSchedule';
import ManageSpecialties from '../ManageSpecialties/ManageSpecialties';
import NotFound from '../NotFound/NotFound';
import UserManage from '../UserManage';
import UserRedux from '../UserRedux/UserRedux';
import './HomeSystem.scss';

const HomeSystem = () => {
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language)
    const username = useSelector(state => state.user.dataUser.firstName)
    const roleId = useSelector(state => state.user.dataUser.roleId)

    const handleClickBtn = (languageInput) => {
        if (languageInput === language) {
            return;
        }
        dispatch(handleChangeLanguage(languageInput));
    };

    const handleLogOutClick = () => {
      dispatch(handleLogOut())
    }

    return (
        <div className="homeSystem">
            <div className="homeSystem-header">
                <div className="container">
                    {roleId === 'R1' && <BarNavigator menus={menuSystem} /> }
                    {roleId === 'R2' && <BarNavigator menus={doctorSystem} /> }
                    <div className="homeSystem-header__language">
                        <p> 
                            <FormattedMessage id='menu.Welcome' />
                            <span>{ username || '' }</span>
                        </p>
                        <div className="language">
                            <span
                                className={language === 'vi-VI' ? 'active' : ''}
                                onClick={() => handleClickBtn('vi-VI')}
                            >
                                VN
                            </span>
                            <span
                                className={language === 'en-US' ? 'active' : ''}
                                onClick={() => handleClickBtn('en-US')}
                            >
                                EN
                            </span>
                        </div>
                        <div className="icon" onClick={handleLogOutClick}>
                            <BiLogIn size={26} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="homeSystem-container">
                <div className="container">
                    <Routes>
                        <Route path="/user-manage" element={<UserManage />} />
                        <Route element={<PermissionRouter roleCheck={'R1'} to={"/system/not-found"} />}> 
                            <Route path="/user-redux" element={<UserRedux />} />
                            <Route path="/user-doctor" element={<ManageDoctor />} />
                            <Route path="/manage-specialty" element={<ManageSpecialties />} />
                            <Route path="/manage-clinic" element={<ManageClinic />} />
                        </Route>
                        <Route element={<PermissionRouter roleCheck={'R2'} to={"/system/not-found"} />}> 
                            <Route path='/user-patient' element={<ManagePatient />} />
                        </Route>
                        <Route path='/user-schedule' element={<ManageSchedule />} />
                        
                        <Route path='/not-found' element={<NotFound />} />
                        <Route path="*" element={<Navigate to={'/system/not-found'} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default HomeSystem;
