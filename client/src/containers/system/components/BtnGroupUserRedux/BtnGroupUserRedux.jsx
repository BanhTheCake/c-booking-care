import React from 'react';
import { FormattedMessage } from 'react-intl';
import './BtnGroupUserRedux.scss';

const BtnGroupUserRedux = ({
    handleEdit = () => {},
    handleDelete = () => {},
    isDeleting = false,
}) => {

    return (
        <div className="BtnGroupUserRedux">
            <button className="BtnGroupUserRedux__btn BtnGroupUserRedux__edit"
                onClick={handleEdit}
            >
                <FormattedMessage id="table.edit" />
            </button>
            <button className="BtnGroupUserRedux__btn BtnGroupUserRedux__delete"
                onClick={handleDelete}
                disabled={isDeleting}
            >
                <FormattedMessage id="table.delete" />
            </button>
        </div>
    );
};

export default BtnGroupUserRedux;
