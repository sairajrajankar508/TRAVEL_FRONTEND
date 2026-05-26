// import { useState } from "react";

// import { useNavigate } from "react-router-dom";

// import { useLoginMutation } from "../../services/authApi";

// const LoginPage = () => {

//   const navigate = useNavigate();

//   const [login] =
//     useLoginMutation();

//   const [formData, setFormData] =
//     useState({

//       email: "",

//       password: "",
//     });

//   const [loading, setLoading] =
//     useState(false);

//   // HANDLE INPUT
//   const handleChange = (e) => {

//     setFormData({

//       ...formData,

//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   // HANDLE LOGIN
//   const handleLogin = async (
//     e
//   ) => {

//     e.preventDefault();

//     setLoading(true);

//     try {

//       const response =
//         await login(
//           formData
//         ).unwrap();

//       // SAVE DATA
//       localStorage.setItem(
//         "token",
//         response.token
//       );

//       localStorage.setItem(
//         "role",
//         response.role
//       );

//       localStorage.setItem(
//         "email",
//         response.email
//       );

//       localStorage.setItem(
//         "name",
//         response.name
//       );

//       // REDIRECT
//       if (
//         response.role ===
//         "ADMIN"
//       ) {

//         navigate(
//           "/admin/dashboard"
//         );

//       } else if (
//         response.role ===
//         "EMPLOYEE"
//       ) {

//         navigate(
//           "/employee/dashboard"
//         );

//       } else if (
//         response.role ===
//         "MANAGER"
//       ) {

//         navigate(
//           "/manager/dashboard"
//         );

//       } else if (
//         response.role ===
//         "FINANCE"
//       ) {

//         navigate(
//           "/finance/dashboard"
//         );
//       }

//     } catch (error) {

//       console.log(error);

//       alert(
//         "Invalid email or password"
//       );

//     } finally {

//       setLoading(false);
//     }
//   };

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-slate-100 px-40 py-20">

//       {/* LOGIN CARD */}
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-12">

//         {/* TITLE */}
//         <div className="text-center mb-8">

//           <h1 className="text-3xl font-bold text-slate-800">

//             Travel Management System

//           </h1>

//           <p className="text-gray-500 mt-2">

//             Welcome back! Please login to your account.

//           </p>

//         </div>

//         {/* FORM */}
//         <form
//           onSubmit={handleLogin}
//           className="space-y-5"
//         >

//           {/* EMAIL */}
//           <div>

//             <label className="block text-sm font-medium text-slate-700 mb-2">

//               Email

//             </label>

//             <input
//               type="email"
//               name="email"
//               value={
//                 formData.email
//               }
//               onChange={
//                 handleChange
//               }
//               required
//               placeholder="Enter email"
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
//             />

//           </div>

//           {/* PASSWORD */}
//           <div>

//             <label className="block text-sm font-medium text-slate-700 mb-2">

//               Password

//             </label>

//             <input
//               type="password"
//               name="password"
//               value={
//                 formData.password
//               }
//               onChange={
//                 handleChange
//               }
//               required
//               placeholder="Enter password"
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
//             />

//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition"
//           >

//             {loading
//               ? "Logging in..."
//               : "Login"}

//           </button>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default LoginPage;



import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../features/auth/authSlice";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, role, loading, error } = useSelector(
        (state) => state.auth
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // =========================================
    // ROLE BASED REDIRECT
    // =========================================
    const redirectBasedOnRole = useCallback((role) => {

        switch (role) {

            case "ADMIN":
                navigate("/admin/dashboard");
                break;

            case "EMPLOYEE":
                navigate("/employee/dashboard");
                break;

            case "MANAGER":
                navigate("/manager/dashboard");
                break;

            case "FINANCE":
                navigate("/finance/dashboard");
                break;

            default:
                navigate("/");
        }

    }, [navigate]);

    // =========================================
    // AUTO REDIRECT IF ALREADY LOGGED IN
    // =========================================
    useEffect(() => {

        if (token && role) {
            redirectBasedOnRole(role);
        }

    }, [token, role, redirectBasedOnRole]);

    // =========================================
    // HANDLE LOGIN
    // =========================================
    const handleLogin = async (e) => {

        e.preventDefault();

        const res = await dispatch(
            loginUser({
                email,
                password
            })
        );

        if (res.payload?.token) {
            redirectBasedOnRole(res.payload.role);
        }
    };

    return (

        <div className="min-h-screen flex bg-gray-100">

            {/* ========================================= */}
            {/* LEFT SECTION */}
            {/* ========================================= */}

            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-700 via-indigo-700 to-purple-800 text-white p-16 flex-col justify-between">

                <div>

                    <h1 className="text-5xl font-extrabold leading-tight">
                        Travel
                        <br />
                        Management
                        <br />
                        System
                    </h1>

                    <p className="mt-6 text-lg text-blue-100 leading-relaxed max-w-md">
                        Enterprise-grade travel approval, reimbursement,
                        itinerary, and finance workflow platform.
                    </p>

                </div>

                <div className="space-y-5">

                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <p>Role-Based Secure Access</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <p>Travel Request & Approval Workflow</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <p>Expense & Reimbursement Tracking</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <p>Finance & Audit Management</p>
                    </div>

                </div>

            </div>

            {/* ========================================= */}
            {/* RIGHT SECTION */}
            {/* ========================================= */}

            <div className="flex-1 flex items-center justify-center p-6">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                    {/* HEADER */}

                    <div className="mb-8 text-center">

                        <h2 className="text-3xl font-bold text-gray-800">
                            Welcome Back
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Sign in to continue
                        </p>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        {/* EMAIL */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        {/* PASSWORD */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        {/* ERROR */}

                        {error && (

                            <div className="bg-red-100 border border-red-300 text-red-600 text-sm p-3 rounded-lg">

                                {typeof error === "string"
                                    ? error
                                    : "Invalid credentials"}

                            </div>
                        )}

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md disabled:opacity-70"
                        >

                            {loading
                                ? "Signing In..."
                                : "Sign In"}

                        </button>

                    </form>

                    {/* FOOTER */}

                    <div className="mt-8 text-center text-sm text-gray-500">

                        Corporate Travel Workflow Platform

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LoginPage;