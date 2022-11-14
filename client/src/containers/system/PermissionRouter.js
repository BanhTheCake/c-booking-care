import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PermissionRouter = ({ roleCheck, to = "/" }) => {

    const roleId = useSelector(state => state.user.dataUser.roleId)

    return (
        <>
            { roleId === roleCheck ? <Outlet /> : <Navigate to={to}/> }
        </>
    );
};

export default PermissionRouter;
