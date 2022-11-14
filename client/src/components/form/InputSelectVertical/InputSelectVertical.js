import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import './InputSelectVertical.scss';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid black',
        zIndex: 10,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999, fontSize: '1.6rem' }),
};

const InputSelectVertical = ({
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
            <div className="input-select-vertical">
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
                    defaultValue={''}
                    // want to reset input selected => must has defaultValue
                    render={({ field: { onChange, value, ref } }) => (
                        <Select
                            inputRef={ref}
                            // defaultValue must be one of options
                            defaultValue={
                                options.find((item) => {
                                    return item?.keyMap === value;
                                }) || ''
                            }
                            // Value must be one of options
                            // want to reset => check value before render
                            value={
                                value === ''
                                    ? null
                                    : options.find((item) => {
                                          return item?.keyMap === value;
                                      })
                            }
                            styles={customStyles}
                            onChange={(val) => {
                                onChange(val.keyMap);
                            }}
                            options={options}
                            // custom value display on menu
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
                            // change value => value.keyMap to display
                            getOptionValue={(item) => item.keyMap}
                            placeholder={
                                language === 'vi-VI' ? 'Chọn ...' : 'Select ...'
                            }
                            menuPlacement={menuPlacement}
                            menuPortalTarget={document.body}
                        />
                    )}
                />
                <p className="input-select-vertical__errors">
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

export default InputSelectVertical;
