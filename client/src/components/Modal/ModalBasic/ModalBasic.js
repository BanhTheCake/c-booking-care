import React, { useEffect } from 'react';
import { GrClose } from 'react-icons/gr'
import { useDispatch } from 'react-redux';
import { setIsOpenModal } from '../../../app/appSlice';
import './ModalBasic.scss';

const ModalBasic = ({ isOpen = true, setIsOpen = () => {}, label, children }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, dispatch])
    
    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            {isOpen && (
                <div className="ModalBasic-container">
                    <div className="overlay" onClick={handleClose}></div>
                    <div className="ModalBasic-wrapper">
                        <div className="ModalBasic-title">
                            {label}
                        </div>
                        <div onClick={handleClose} className="ModalBasic-close">
                            <GrClose size={24} />
                        </div>
                        <div className="ModalBasic-children">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalBasic;
