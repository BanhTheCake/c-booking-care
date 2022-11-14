import React, { useId } from 'react';
import { FormattedMessage } from 'react-intl';
import './InputHorizontal.scss';

const InputHorizontal = ({ label, name, nameDisplay, errors, register }) => {
    // use id for unique label
    const id = useId();
    return (
        <>
            <div className="input-horizontal">
                <div className="input-horizontal__wrapper">
                    <label htmlFor={`${label}${id}`}>
                        { nameDisplay.split('.').length === 1 ? 
                            (nameDisplay ? nameDisplay : label) :
                            <FormattedMessage id={nameDisplay} />
                        }
                    </label>
                    <input id={`${label}${id}`} type="text" {...register(name)} />
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

export default InputHorizontal;
