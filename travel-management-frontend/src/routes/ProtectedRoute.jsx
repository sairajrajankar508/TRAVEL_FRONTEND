// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRole }) => {

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   if (allowedRole && role !== allowedRole) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;



import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [] }) => {

    const {

        token,

        role,

    } = useSelector(
        (state) => state.auth
    );

    // ======================================
    // NOT LOGGED IN
    // ======================================

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // ======================================
    // ROLE CHECK
    // ======================================

    if (

        allowedRoles.length > 0 &&

        !allowedRoles.includes(role)

    ) {

        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    // ======================================
    // ACCESS GRANTED
    // ======================================

    return <Outlet />;
};

export default ProtectedRoute;

