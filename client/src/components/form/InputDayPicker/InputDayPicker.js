import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { FocusOn } from 'react-focus-on';
import './InputDayPicker.scss'
import dayjs from 'dayjs'
import { memo } from 'react';

const InputDayPicker = ({ selectDay, handleSelectDay }) => {

    const [isOpenDayPicker, setIsOpenDayPicker] = useState(false);
    const date = new Date(dayjs().startOf('date'))

    const handleClickDayPicker = () => {
        setIsOpenDayPicker(!isOpenDayPicker);
    };


    const closePopper = () => {
        setIsOpenDayPicker(false);
    };

    return (
        <>
            <div className="input-dayPicker">
                <div className="input-dayPicker__container">
                    <input 
                        type="text" 
                        readOnly 
                        value={`${dayjs(selectDay).format('DD-MM-YYYY')}`}
                        onClick={handleClickDayPicker}                    
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
                            today={date}
                            onSelect={handleSelectDay}
                            selected={selectDay}
                            className={'modal-dayPicker'}
                            fromDate={date}
                            // toDate={new Date().setDate(date.getDate() + 7)}
                        />
                    </FocusOn>
                )}
            </div>
        </>
    );
};

export default memo(InputDayPicker);
