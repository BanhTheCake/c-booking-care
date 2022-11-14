import React from 'react';
import { useState } from 'react';
import FormModalEditUser from '../../../../components/Modal/Components/FormModalEditUser';
import ModalBasic from '../../../../components/Modal/ModalBasic/ModalBasic';
import FormUserRedux from '../../components/FormUserRedux/FormUserRedux';
import TableUserRedux from '../../components/TableUserRedux/TableUserRedux';
import './UserRedux.scss';

const UserRedux = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="userRedux-container">
                <div className="container userRedux-wrapper">
                    <h3 className="userRedux-title">
                        User Redux With BanhTheCake
                    </h3>
                    <FormUserRedux />
                    <div className="userRedux-table">
                        <TableUserRedux setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
            <ModalBasic isOpen={isOpen} setIsOpen={setIsOpen}>
                <FormModalEditUser setIsOpen={setIsOpen} />
            </ModalBasic>
        </>
    );
};

export default UserRedux;
