import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { useState } from 'react';
import './MarkdownMDEditor.scss';
import { motion } from 'framer-motion';

const MarkdownMDEditor = ({
    data,
    style,
    height = 200,
    isShow = false,
    defaultShow = false,
}) => {
    const [isShowFull, setIsShowFull] = useState(defaultShow);

    return (
        <>
            <motion.div
                className="MarkdownMDEditor"
                // initial={false} => when load page it don't show animate
                initial={false}
                animate={!isShowFull && isShow ? { height: height } : { height: 'unset' }}
                transition={{ type: "tween" }}
            >
                <MDEditor.Markdown
                    className="MDEditor"
                    source={data}
                    style={style}
                />
            </motion.div>
            {isShow && (
                <div
                    className="MarkdownMDEditor-btnShow"
                    onClick={() => setIsShowFull(!isShowFull)}
                >
                    {isShowFull ? <p>Show Less</p> : <p>Show More ...</p>}
                </div>
            )}
        </>
    );
};

export default MarkdownMDEditor;
