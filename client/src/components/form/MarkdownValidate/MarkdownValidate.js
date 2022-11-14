import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import './MarkdownValidate.scss';
import { Controller } from 'react-hook-form';

const MarkdownValidate = ({
    nameDisplay = '',
    height = 200,
    control,
    name,
    errors,
}) => {
    return (
        <div className="MarkdownValidate-container">
            <label className="MarkdownValidate-label">
                {nameDisplay.split('.').length === 1 ? (
                    nameDisplay
                ) : (
                    <FormattedMessage id={nameDisplay} />
                )}
                <p className="MarkdownValidate__errors">
                    {errors[name]?.message && (
                        <>
                            <span>( </span>
                            {errors[name]?.message?.split('.').length > 1 ? (
                                <FormattedMessage id={errors[name]?.message} />
                            ) : (
                                errors[name]?.message
                            )}
                            <span> )</span>
                        </>
                    )}
                </p>
            </label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <>
                        <MDEditor
                            value={value}
                            onChange={(val) => {
                                onChange(val);
                            }}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                            }}
                            preview={'live'}
                            height={height}
                        />
                    </>
                )}
            />
        </div>
    );
};

export default MarkdownValidate;
