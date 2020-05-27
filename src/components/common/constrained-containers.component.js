import React from "react";
import RoleConstrained from "./role-constrained-container.component";

export const AdminConstrained = ({ children }) => {
    return (<RoleConstrained role='admin'>{children}</RoleConstrained>)
}

export const ConsumerConstrained = ({ children }) => {
    return (<RoleConstrained role='consumer'>{children}</RoleConstrained>)
}

