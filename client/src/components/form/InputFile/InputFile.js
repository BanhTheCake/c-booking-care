import React, { useId, useState } from 'react';
import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';
import './InputFile.scss';

const InputFile = ({ control, name, errors, defaultValue, height = '100%', positionErrMes = 'center' }) => {
    const { field } = useController({ control, name});
    const [imgSrc, setImgSrc] = useState(defaultValue || {});
    const id = useId();

    useEffect(() => {
        // reset form => reset imgSrc
        if (!field.value && !defaultValue) setImgSrc({})
    }, [field.value, defaultValue])

    const handleChange = (e) => {
        if (e.target.files?.length === 0) return;
        let file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file)
        setImgSrc(fileUrl)
        field.onChange(e.target.files[0]);
    };

    return (
        <>
            <div className="inputFile" style={{
                height: height
            }}>
                <label htmlFor={`file${id}`}>
                    {Object.keys(imgSrc)?.length > 0 ? (
                        <img className='img' src={imgSrc} alt="" />
                    ) : (
                        <div className="dashed">
                            <div className="title">
                                <h4>Click To Upload</h4>
                                <div className="icon">
                                    <AiOutlineCloudUpload size={28} />
                                </div>
                            </div>
                        </div>
                    )}
                </label>
                <input type="file" id={`file${id}`} onChange={handleChange} />
            </div>
                <p className='inputFile-error' style={{
                    textAlign: positionErrMes
                }}>
                    {(errors[name]?.message && errors[name]?.message?.split('.').length > 1) ?
                        <FormattedMessage id={errors[name]?.message} /> :
                        errors[name]?.message
                    }
                </p>
        </>
    );
};

export default InputFile;
