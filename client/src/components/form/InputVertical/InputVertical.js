import React from 'react';
import { useId } from 'react';
import { FormattedMessage } from 'react-intl';
import './InputVertical.scss';

const InputVertical = ({
    label,
    name,
    nameDisplay,
    errors,
    register,
    disable = false,
}) => {
    const id = useId()
    return (
        <div className="input-vertical">
            <div className="input-vertical__wrapper">
                <label htmlFor={`${label}${id}`}>
                    {nameDisplay.split('.').length === 1 ? (
                        nameDisplay ? (
                            nameDisplay
                        ) : (
                            label
                        )
                    ) : (
                        <FormattedMessage id={nameDisplay} />
                    )}
                </label>
                <input
                    id={`${label}${id}`}
                    type="text"
                    {...register(name, { disable: disable})}
                    disabled={disable}
                />
                <p className="form-error">
                    {errors[name]?.message &&
                    errors[name]?.message?.split('.').length > 1 ? (
                        <FormattedMessage id={errors[name]?.message} />
                    ) : (
                        errors[name]?.message
                    )}
                </p>
            </div>
        </div>
    );
};

export default InputVertical;
