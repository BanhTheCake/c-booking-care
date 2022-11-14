import React, { useState } from 'react';
import { useId } from 'react';
import { RiEye2Fill, RiEye2Line } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import './InputHorizontalPassword.scss';

const InputHorizontalPassword = ({ label, name, nameDisplay, errors, register }) => {

    const [isShow, setIsShow] = useState(false);
    const handleChangeInput = () => {
        setIsShow(!isShow);
    };

    const id = useId()

    return (
        <>
            <div className="input-horizontal-password">
                <div className="input-horizontal-password__wrapper">
                    <label htmlFor={`${label}${id}`}>
                        { nameDisplay.split('.').length === 1 ? 
                            (nameDisplay ? nameDisplay : label) :
                            <FormattedMessage id={nameDisplay} />
                        }
                    </label>
                    <div className="input-horizontal-password__input">
                        <input
                            className="input-password"
                            id={`${label}${id}`}
                            type={isShow ? 'text' : 'password'}
                            {...register(name)}
                        />
                        <div className="icon" onClick={handleChangeInput}>
                            {isShow ? (
                                <RiEye2Line size={20} />
                            ) : (
                                <RiEye2Fill size={20} />
                            )}
                        </div>
                    </div>
                </div>
                <p className="form-error">
                    {(errors[name]?.message && errors[name]?.message?.split('.').length > 1) ?
                        <FormattedMessage id={errors[name]?.message} /> :
                        errors[name]?.message
                    }
                </p>
            </div>
        </>
    );
};

export default InputHorizontalPassword;
