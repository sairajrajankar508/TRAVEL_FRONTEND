import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";

import AppShell from "./components/layout/AppShell";

import ProtectedRoute from "./routes/ProtectedRoute";

/* ================= ADMIN ================= */

import AdminDashboard from "./pages/admin/AdminDashboard";

import PolicyManagement from "./pages/admin/PolicyManagement";

import Reports from "./pages/admin/Reports";

import AuditLogs from "./pages/admin/AuditLogs";

import UserManagement from "./pages/admin/UserManagement";

/* ================= EMPLOYEE ================= */

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import MyRequests from "./pages/employee/MyRequests";

import ExpenseManagement from "./pages/employee/ExpenseManagement";

import Profile from "./pages/employee/Profile";

/* ================= MANAGER ================= */

import ManagerDashboard from "./pages/manager/ManagerDashboard";

import PendingRequests from "./pages/manager/PendingRequests";

import ApprovalHistory from "./pages/manager/ApprovalHistory";

import TeamActivity from "./pages/manager/TeamActivity";

import ManagerReports from "./pages/manager/ManagerReports";

import ReviewHistory from "./pages/manager/ReviewHistory";

import ManagerProfile from "./pages/manager/ManagerProfile";

import ManagerPolicies from "./pages/manager/ManagerPolicies";

/* ================= FINANCE ================= */

import FinanceDashboard from "./pages/finance/FinanceDashboard";

function App() {

  return (

    <Routes>

      {/* ================= LOGIN ================= */}
      <Route
        path="/"
        element={<LoginPage />}
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="ADMIN">

            <AppShell />

          </ProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="users"
          element={<UserManagement />}
        />

        <Route
          path="policies"
          element={<PolicyManagement />}
        />

        <Route
          path="reports"
          element={<Reports />}
        />

        <Route
          path="audit-logs"
          element={<AuditLogs />}
        />

      </Route>

      {/* ================= EMPLOYEE ================= */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="EMPLOYEE">

            <AppShell />

          </ProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<EmployeeDashboard />}
        />

        <Route
          path="requests"
          element={<MyRequests />}
        />

        <Route
          path="expenses"
          element={<ExpenseManagement />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

      </Route>

      {/* ================= MANAGER ================= */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRole="MANAGER">

            <AppShell />

          </ProtectedRoute>
        }
      >

        {/* DASHBOARD */}
        <Route
          path="dashboard"
          element={<ManagerDashboard />}
        />

        {/* REQUEST MANAGEMENT */}
        <Route
          path="requests"
          element={<PendingRequests />}
        />

        {/* APPROVAL HISTORY */}
        <Route
          path="approvals"
          element={<ApprovalHistory />}
        />

        {/* TEAM ACTIVITY */}
        <Route
          path="team-activity"
          element={<TeamActivity />}
        />

        {/* MANAGER REPORTS */}
        <Route
          path="reports"
          element={<ManagerReports />}
        />

        {/* REVIEW HISTORY */}
        <Route
          path="history"
          element={<ReviewHistory />}
        />

        {/* MANAGER PROFILE */}
        <Route
          path="profile"
          element={<ManagerProfile />}
        />

        {/* MANAGER POLICIES */}
        <Route
          path="policies"
          element={<ManagerPolicies />}
        />

      </Route>

      {/* ================= FINANCE ================= */}
      <Route
        path="/finance"
        element={
          <ProtectedRoute allowedRole="FINANCE">

            <AppShell />

          </ProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<FinanceDashboard />}
        />

      </Route>

    </Routes>
  );
}

export default App;