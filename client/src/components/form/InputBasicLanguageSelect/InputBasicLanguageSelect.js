import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import './InputBasicLanguageSelect.scss';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid black',
    }),
};

const InputSelectBasicLanguage = ({
    nameDisplay,
    name,
    options = [],
    setData,
    value,
    menuPlacement = 'bottom',
    styles = customStyles,
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
                    styles={styles}
                    options={options}
                    value={value}
                    placeholder={
                        language === 'vi-VI' ? 'Chọn ...' : 'Select ...'
                    }
                    onChange={(val) => {
                        setData(val.value);
                    }}
                    getOptionLabel={
                                language === 'vi-VI'
                                    ? (item) => item.valueVI
                                    : (item) => item.valueEN
                    }
                    menuPlacement={menuPlacement}
                />
            </div>
        </>
    );
};

export default InputSelectBasicLanguage;
