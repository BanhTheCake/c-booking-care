import React, { useMemo, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import './Markdown.scss';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash'

const Markdown = ({ nameDisplay = '', setData, data = '', height = 200 }) => {
    const [value, setValue] = useState(data);
    const debounceFn = useMemo(() => {
        return _.debounce((data) => {
            setData(data)
        }, 200)
    }, [setData])

    const handleChange = (data) => {
        setValue(data)
        debounceFn(data)
    }

    return (
        <div className="Markdown-container">
            <label className="Markdown-label">
                {nameDisplay.split('.').length === 1 ? nameDisplay : (
                    <FormattedMessage id={nameDisplay} />
                )}
            </label>
            <MDEditor
                value={value}
                onChange={handleChange}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
                preview={'live'}
                height={height}
            />
        </div>
    );
};

export default Markdown;
