/**
 * 
 * @file Guard.js
 * 
 * This file contains the ProtectedRoute and AdminRoute components.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 5/5/2025
 */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";


export const ProtectedRoute = ({element: Component}) => {
    const location = useLocation();

    return ApiService.isAuthenticated() ? (
        Component
    ):(
        <Navigate to="/login" replace state={{from: location}}/>
    );
};


export const AdminRoute = ({element: Component}) => {
    const location = useLocation();

    return ApiService.isAdmin() ? (
        Component
    ):(
        <Navigate to="/login" replace state={{from: location}}/>
    );
};
