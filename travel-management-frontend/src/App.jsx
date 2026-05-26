// import { Routes, Route } from "react-router-dom";

// import LoginPage from "./pages/auth/LoginPage";

// import AppShell from "./components/layout/AppShell";

// import ProtectedRoute from "./routes/ProtectedRoute";

// /* ================= ADMIN ================= */

// import AdminDashboard from "./pages/admin/AdminDashboard";

// import PolicyManagement from "./pages/admin/PolicyManagement";

// import Reports from "./pages/admin/Reports";

// import AuditLogs from "./pages/admin/AuditLogs";

// import UserManagement from "./pages/admin/UserManagement";

// import AdminProfile from "./pages/admin/AdminProfile";

// /* ================= EMPLOYEE ================= */

// import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

// import MyRequests from "./pages/employee/MyRequests";

// import Itinerary from "./pages/employee/Itinerary"; 

// import ExpenseManagement from "./pages/employee/ExpenseManagement";

// import Profile from "./pages/employee/Profile";

// /* ================= MANAGER ================= */

// import ManagerDashboard from "./pages/manager/ManagerDashboard";

// import PendingRequests from "./pages/manager/PendingRequests";

// import ApprovalHistory from "./pages/manager/ApprovalHistory";

// import TeamActivity from "./pages/manager/TeamActivity";

// import ManagerReports from "./pages/manager/ManagerReports";

// import ReviewHistory from "./pages/manager/ReviewHistory";

// import ManagerProfile from "./pages/manager/ManagerProfile";

// import ManagerPolicies from "./pages/manager/ManagerPolicies";

// /* ================= FINANCE ================= */

// import FinanceDashboard from "./pages/finance/FinanceDashboard";

// import ExpenseApproval from "./pages/finance/ExpenseApproval";

// import Reimbursements from "./pages/finance/Reimbursements";

// import PaymentHistory from "./pages/finance/PaymentHistory";

// import FinanceReports from "./pages/finance/FinanceReports";

// import FinanceProfile from "./pages/finance/FinanceProfile"; 

// function App() {

//   return (

//     <Routes>

//       {/* ================= LOGIN ================= */}
//       <Route
//         path="/"
//         element={<LoginPage />}
//       />

//       {/* ================= ADMIN ================= */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRole="ADMIN">

//             <AppShell />

//           </ProtectedRoute>
//         }
//       >

//         <Route
//           path="dashboard"
//           element={<AdminDashboard />}
//         />

//         <Route
//           path="users"
//           element={<UserManagement />}
//         />

//         <Route
//           path="policies"
//           element={<PolicyManagement />}
//         />

//         <Route
//           path="reports"
//           element={<Reports />}
//         />

//         <Route
//           path="audit-logs"
//           element={<AuditLogs />}
//         />

//         <Route
//           path="profile"
//           element={<AdminProfile />}
//         />

//       </Route>

//       {/* ================= EMPLOYEE ================= */}
//       <Route
//         path="/employee"
//         element={
//           <ProtectedRoute allowedRole="EMPLOYEE">

//             <AppShell />

//           </ProtectedRoute>
//         }
//       >

//         <Route
//           path="dashboard"
//           element={<EmployeeDashboard />}
//         />

//         <Route
//           path="requests"
//           element={<MyRequests />}
//         />

//         <Route
//           path="expenses"
//           element={<ExpenseManagement />}
//         />

// <Route
//   path="itinerary/:requestId"
//   element={<Itinerary />}
// />

//         <Route
//           path="profile"
//           element={<Profile />}
//         />

        

//       </Route>

//       {/* ================= MANAGER ================= */}
//       <Route
//         path="/manager"
//         element={
//           <ProtectedRoute allowedRole="MANAGER">

//             <AppShell />

//           </ProtectedRoute>
//         }
//       >

//         {/* DASHBOARD */}
//         <Route
//           path="dashboard"
//           element={<ManagerDashboard />}
//         />

//         {/* REQUEST MANAGEMENT */}
//         <Route
//           path="requests"
//           element={<PendingRequests />}
//         />

//         {/* APPROVAL HISTORY */}
//         <Route
//           path="approvals"
//           element={<ApprovalHistory />}
//         />

//         {/* TEAM ACTIVITY */}
//         <Route
//           path="team-activity"
//           element={<TeamActivity />}
//         />

//         {/* MANAGER REPORTS */}
//         <Route
//           path="reports"
//           element={<ManagerReports />}
//         />

//         {/* REVIEW HISTORY */}
//         <Route 
//           path="history"
//           element={<ReviewHistory />}
//         />

//         {/* MANAGER PROFILE */}
//         <Route
//           path="profile"
//           element={<ManagerProfile />}
//         />

//         {/* MANAGER POLICIES */}
//         <Route
//           path="policies"
//           element={<ManagerPolicies />}
//         />

//       </Route>

//       {/* ================= FINANCE ================= */}
//       <Route
//         path="/finance"
//         element={
//           <ProtectedRoute allowedRole="FINANCE">

//             <AppShell />

//           </ProtectedRoute>
//         }
//       >

//         <Route
//           path="dashboard"
//           element={<FinanceDashboard />}
//         />

//         <Route
//           path="expenses"
//           element={<ExpenseApproval />}
//         />

//         <Route
//           path="reimbursements"
//           element={<Reimbursements />}
//         />

//         <Route
//           path="history"
//           element={<PaymentHistory />}
//         />

//         <Route
//           path="reports"
//           element={<FinanceReports />}
//         />

//         <Route
//           path="profile"
//           element={<FinanceProfile />}
//         />

//       </Route>

//     </Routes>
//   );
// }

// export default App;



import { Routes, Route, Navigate } from "react-router-dom";

// =======================================
// AUTH
// =======================================

import LoginPage from "./pages/auth/LoginPage";

// =======================================
// LAYOUTS
// =======================================

import DashboardLayout from "./layouts/DashboardLayout";

// =======================================
// ROUTE PROTECTION
// =======================================

import ProtectedRoute from "./routes/ProtectedRoute";

// =======================================
// ADMIN PAGES
// =======================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PolicyManagement from "./pages/admin/PolicyManagement";
import Reports from "./pages/admin/Reports";
import AuditLogs from "./pages/admin/AuditLogs";

// =======================================
// EMPLOYEE PAGES
// =======================================

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import CreateRequest from "./pages/employee/CreateRequest";
import MyRequests from "./pages/employee/MyRequests";
import ExpenseManagement from "./pages/employee/ExpenseManagement";

// =======================================
// MANAGER PAGES
// =======================================

import ManagerDashboard from "./pages/manager/ManagerDashboard";
import PendingRequests from "./pages/manager/PendingRequests";
import ManagerApprovals from "./pages/manager/ManagerApprovals";

// =======================================
// FINANCE PAGES
// =======================================

import FinanceDashboard from "./pages/finance/FinanceDashboard";
import ExpenseApproval from "./pages/finance/ExpenseApproval";
import Reimbursements from "./pages/finance/Reimbursements";

// =======================================
// COMMON PAGES
// =======================================

const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-red-500">
                Unauthorized Access 🚫
            </h1>
        </div>
    );
};

function App() {

    return (

        <Routes>

            {/* ======================================= */}
            {/* PUBLIC ROUTES */}
            {/* ======================================= */}

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />

            {/* ======================================= */}
            {/* PROTECTED ROUTES */}
            {/* ======================================= */}

            <Route element={<ProtectedRoute />}>

                <Route element={<DashboardLayout />}>

                    {/* ======================================= */}
                    {/* ROOT REDIRECT */}
                    {/* ======================================= */}

                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />

                    {/* ======================================= */}
                    {/* ADMIN ROUTES */}
                    {/* ======================================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            />
                        }
                    >

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/users"
                            element={<UserManagement />}
                        />

                        <Route
                            path="/admin/policies"
                            element={<PolicyManagement />}
                        />

                        <Route
                            path="/admin/reports"
                            element={<Reports />}
                        />

                        <Route
                            path="/admin/audit"
                            element={<AuditLogs />}
                        />

                    </Route>

                    {/* ======================================= */}
                    {/* EMPLOYEE ROUTES */}
                    {/* ======================================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["EMPLOYEE"]}
                            />
                        }
                    >

                        <Route
                            path="/employee/dashboard"
                            element={<EmployeeDashboard />}
                        />

                        <Route
                            path="/employee/create-request"
                            element={<CreateRequest />}
                        />

                        <Route
                            path="/employee/requests"
                            element={<MyRequests />}
                        />

                        <Route
                            path="/employee/expenses"
                            element={<ExpenseManagement />}
                        />

                    </Route>

                    {/* ======================================= */}
                    {/* MANAGER ROUTES */}
                    {/* ======================================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["MANAGER"]}
                            />
                        }
                    >

                        <Route
                            path="/manager/dashboard"
                            element={<ManagerDashboard />}
                        />

                        <Route
                            path="/manager/pending"
                            element={<PendingRequests />}
                        />

                        <Route
                            path="/manager/approvals"
                            element={<ManagerApprovals />}
                        />

                    </Route>

                    {/* ======================================= */}
                    {/* FINANCE ROUTES */}
                    {/* ======================================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["FINANCE"]}
                            />
                        }
                    >

                        <Route
                            path="/finance/dashboard"
                            element={<FinanceDashboard />}
                        />

                        <Route
                            path="/finance/expenses"
                            element={<ExpenseApproval />}
                        />

                        <Route
                            path="/finance/reimbursements"
                            element={<Reimbursements />}
                        />

                    </Route>

                </Route>

            </Route>

            {/* ======================================= */}
            {/* 404 ROUTE */}
            {/* ======================================= */}

            <Route
                path="*"
                element={
                    <div className="flex items-center justify-center min-h-screen text-3xl font-bold">
                        404 Page Not Found
                    </div>
                }
            />

        </Routes>
    );
}

export default App;