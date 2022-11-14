import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { handleLogin } from '../../../../app/authSlice';
import Input from '../../../../components/form/InputHorizontal/InputHorizontal';
import InputPassword from '../../../../components/form/InputHorizontalPassword/InputHorizontalPassword';
import './Login.scss';

const schema = yup
    .object({
        email: yup
            .string()
            .email('Email must be exist !')
            .required(`Email can't be empty !`),
        password: yup.string().required(`Password can't be empty !`),
    })
    .required();

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setLoading(true);
        dispatch(handleLogin(data))
            .unwrap()
            .then(() => {
                setLoading(false);
                return navigate('/system');
            })
            .catch((err) => {
                toast.error(err);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="login-container">
                <div className="container login-wrapper">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-item">
                            <Input
                                label={'email'}
                                name={'email'}
                                nameDisplay={'Tài khoản'}
                                errors={errors}
                                register={register}
                            />
                        </div>
                        <div className="form-item">
                            <InputPassword
                                label={'password'}
                                name={'password'}
                                nameDisplay={'Mật khẩu'}
                                errors={errors}
                                register={register}
                            />
                        </div>
                        <button disabled={loading} className="form-btn">
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
