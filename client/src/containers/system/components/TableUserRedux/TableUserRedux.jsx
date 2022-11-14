import React, { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setEditData, setStateEdit } from '../../../../app/userEditSlice';
import { removeSelectUser, setAllUser } from '../../../../app/userSlice';
import Table from '../../../../components/Table/Table';
import BtnGroupUserRedux from '../BtnGroupUserRedux/BtnGroupUserRedux';
import { Buffer } from 'buffer';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchAllUser, fetchDeleteUser } from '../../../../api/fetchUser';

const TableUserRedux = ({ setIsOpen }) => {
    const queryClient = useQueryClient();

    const userList = useSelector((state) => state.user.allUser);
    const dispatch = useDispatch();

    const fnGetAlluser = useQuery('getAllUser', fetchAllUser, {
        select: (resData) => resData.data,
        onSuccess: (data) => {
            dispatch(setAllUser(data));
        },
        onError: (err) => {
            console.log('err: ', err);
        },
        onSettled: (data, err) => {},
        refetchOnWindowFocus: false,
        retry: 0,
    });

    const fnDeleteUser = useMutation(fetchDeleteUser, {
        onSuccess: (data, variables) => {
            dispatch(removeSelectUser(variables));
            toast.success('Delete user successfully !');
        },
        onError: (err) => {
            console.log('err: ', err);
            toast.error(err?.message || 'Something wrong with server !');
        },
        onSettled: (data, err) => {
            if (err) return;
            // Call api getAllUser again
            // queryClient.invalidateQueries('getAllUser');
        },
    });

    const userColumns = useMemo(() => {
        if (!userList || userList.length === 0) {
            return [];
        }
        // define col for table
        const { id, email, firstName, address } = userList[0];
        const newObjectOfItem = { id, email, firstName, address };
        let newArr = Object.keys(newObjectOfItem).map((key) => {
            return {
                Header: <FormattedMessage id={`table.${key}`} />,
                accessor: key,
            };
        });
        const editCell = {
            Header: <FormattedMessage id="table.action" />,
            accessor: 'action',
            Cell: ({ cell }) => {
                const handleEdit = async () => {
                    const data = { ...cell.row.original };
                    if (data?.image && typeof data?.image === 'object') {
                        const imageBase64 = new Buffer(
                            data.image,
                            'base64'
                        ).toString('binary');
                        data.image = imageBase64;
                    }
                    dispatch(setEditData(data));
                    dispatch(setStateEdit(true));
                    setIsOpen(true);
                };

                const handleDelete = () => {
                    const { id } = cell.row.original;
                    fnDeleteUser.mutate(id);
                };

                return (
                    <BtnGroupUserRedux
                        isDeleting={fnDeleteUser.isLoading}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                );
            },
        };
        newArr.push(editCell);
        return newArr;
    }, [userList, dispatch, fnDeleteUser.isLoading, setIsOpen]);

    console.log(userList);

    return <Table data={userList} columns={userColumns} />;
};

export default memo(TableUserRedux);
