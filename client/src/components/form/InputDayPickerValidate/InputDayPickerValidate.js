import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { FocusOn } from 'react-focus-on';
import './InputDayPickerValidate.scss'
import dayjs from 'dayjs'
import { memo } from 'react';
import { useController } from 'react-hook-form';

const InputDayPickerValidate = ({ control, name, errors, menuPosition = 'bottom' }) => {

    const { field } = useController({ control, name, defaultValue: new Date()});
    const [timeValue, setTimeValue] = useState()

    const [isOpenDayPicker, setIsOpenDayPicker] = useState(false);

    const handleClickDayPicker = () => {
        document.body.style.overflow = 'unset';
        setIsOpenDayPicker(!isOpenDayPicker);
    };
    
    const closePopper = () => {
        setIsOpenDayPicker(false);
    };
    
    const handleSelectDay = (value) => {
        field.onChange(value)
    }

    useEffect(() => {
        if (!isOpenDayPicker) {
            document.body.style.overflow = 'hidden';
        }
    }, [isOpenDayPicker])

    useEffect(() => {
        if (field.value) {
            setTimeValue(dayjs(field.value).format('YYYY-MM-DD'))
        }
    }, [field.value])

    return (
        <>
            <div className={`input-dayPicker ${menuPosition}`}>
                <label htmlFor="DayPicker">Ngày Sinh</label>
                <div className="input-dayPicker__container">
                    <input 
                        id='DayPicker'
                        type="date" 
                        value={`${timeValue}`}
                        className={'inputType-dayPicker'}
                        onChange={(e) => {
                            setTimeValue(e.target.value)
                        }}
                        onBlur={() => {
                            if (!timeValue) {
                                field.onChange(new Date())
                                return;
                            }
                            field.onChange(new Date(timeValue))
                        }}
                    />
                    <span
                        className="btn-dayPicker"
                        onClick={handleClickDayPicker}
                    >
                        📅
                    </span>
                </div>
                {isOpenDayPicker && (
                    <FocusOn onClickOutside={closePopper}>
                        <DayPicker
                            mode="single"
                            today={field.value}
                            onSelect={handleSelectDay}
                            selected={field.value}
                            className={'modal-dayPicker'}
                        />
                    </FocusOn>
                )}
            </div>
        </>
    );
};

export default memo(InputDayPickerValidate);
