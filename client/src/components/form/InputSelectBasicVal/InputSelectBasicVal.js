import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import './InputSelectBasicVal.scss';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid black',
        zIndex: 10,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999, fontSize: '1.6rem' }),
};

const InputSelectBasicVal = ({
    nameDisplay,
    name,
    errors,
    options = [],
    control,
    menuPlacement = 'bottom',
    isPrice = false,
}) => {
    const language = useSelector((state) => state.app.language);

    return (
        <>
            <div className="InputSelectBasicVal">
                <label>
                    {nameDisplay.split('.').length === 1 ? (
                        nameDisplay ? (
                            nameDisplay
                        ) : (
                            name
                        )
                    ) : (
                        <FormattedMessage id={nameDisplay} />
                    )}
                </label>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value, ref } }) => (
                        <Select
                            inputRef={ref}
                            value={options.find(item => item.value === value)}
                            styles={customStyles}
                            onChange={(val) => {
                                onChange(val.value);
                            }}
                            options={options}
                            getOptionLabel={
                                isPrice
                                    ? (item) => (
                                          <NumericFormat
                                              value={
                                                    language === 'vi-VI'
                                                        ? item?.valueVI
                                                        : item?.valueEN
                                                    }
                                              displayType="text"
                                              thousandSeparator={'.'}
                                              decimalSeparator={','}
                                              suffix={ language === 'vi-VI' ? 'Đ' : '$' }
                                          />
                                      )
                                    : language === 'vi-VI'
                                    ? (item) => item.valueVI
                                    : (item) => item.valueEN
                            }
                            placeholder={
                                language === 'vi-VI' ? 'Chọn ...' : 'Select ...'
                            }
                            menuPlacement={menuPlacement}
                            menuPortalTarget={document.body}
                        />
                    )}
                />
                <p className="InputSelectBasicVal__errors">
                    {errors[name]?.message &&
                    errors[name]?.message?.split('.').length > 1 ? (
                        <FormattedMessage id={errors[name]?.message} />
                    ) : (
                        errors[name]?.message
                    )}
                </p>
            </div>
        </>
    );
};

export default InputSelectBasicVal;
