import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import './InputSelectBasic.scss';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid black',
    }),
    menuPortal: base => ({ ...base, zIndex: 9999, fontSize: '1.6rem' }),
};

const InputSelectBasic = ({
    nameDisplay,
    name,
    options = [],
    menuPlacement = 'bottom',
    setData,
    styles = customStyles,
    defaultValue
}) => {
    const language = useSelector((state) => state.app.language);
    return (
        <>
            <div className="input-select-vertical">
                {(nameDisplay || name) && (
                    <label>
                        {nameDisplay.split('.').length === 1 ? (
                            nameDisplay ? (nameDisplay) : (name)
                            ) : (<FormattedMessage id={nameDisplay} />)}
                    </label>
                )}
                <Select
                    defaultValue={defaultValue}
                    styles={styles}
                    options={options}
                    placeholder={
                        language === 'vi-VI' ? 'Chọn ...' : 'Select ...'
                    }
                    onChange={(val) => {
                        setData(val.value);
                    }}
                    menuPlacement={menuPlacement}
                    // To use zIndex must have menuPortalTarget={document.body}
                    menuPortalTarget={document.body}
                />
            </div>
        </>
    );
};

export default InputSelectBasic;
