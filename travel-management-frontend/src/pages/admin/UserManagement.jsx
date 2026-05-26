// import { useState } from "react";

// import toast from "react-hot-toast";

// import {
//   FaUsers,
//   FaUserShield,
//   FaEnvelope,
//   FaBuilding,
//   FaTrash,
//   FaPlus,
//   FaUserTie,
//   FaMoneyBillWave,
// } from "react-icons/fa";

// import {
//   useGetAllUsersQuery,
//   useDeleteUserMutation,
//   useToggleUserStatusMutation,
// } from "../../services/adminApi";

// import AddUserModal from "./AddUserModal";


// const UserManagement = () => {

//   const [showModal, setShowModal] =
//     useState(false);

//   const {
//     data: users = [],
//     isLoading,
//   } = useGetAllUsersQuery();

//   const [deleteUser] =
//     useDeleteUserMutation();

//   const [toggleUserStatus] =
//     useToggleUserStatusMutation();

//   // ================= DELETE USER =================
//   const handleDelete = async (id) => {

//     try {

//       await deleteUser(id).unwrap();

//       toast.success(
//         "User deleted successfully"
//       );

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         "Failed to delete user"
//       );
//     }
//   };

//   // ================= STATS =================
//   const admins =
//     users.filter(
//       (u) => u.role === "ADMIN"
//     ).length;

//   const employeeUsers =
//     users.filter(
//       (u) => u.role === "EMPLOYEE"
//     ).length;

//   const managerUsers =
//     users.filter(
//       (u) => u.role === "MANAGER"
//     ).length;

//   const financeUsers =
//     users.filter(
//       (u) => u.role === "FINANCE"
//     ).length;

//   if (isLoading) {

//     return (

//       <div className="flex items-center justify-center h-[70vh]">

//         <h1 className="text-3xl font-bold text-slate-700 animate-pulse">

//           Loading Users...

//         </h1>

//       </div>
//     );
//   }

//   return (

//     <div className="space-y-6">

//       {/* ================= HEADER ================= */}
//       <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

//         <div>

//           <h1 className="text-3xl font-bold text-slate-800">

//             User Management

//           </h1>

//           <p className="text-gray-500 mt-2">

//             Manage employees, managers,
//             finance and admin accounts

//           </p>

//         </div>

//         <button
//           onClick={() =>
//             setShowModal(true)
//           }
//           className="flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all text-white px-6 py-3 rounded-2xl shadow-lg font-semibold"
//         >

//           <FaPlus />

//           Add User

//         </button>

//       </div>

//       {/* ================= STATS ================= */}
//       <div className="space-y-6">

//         {/* TOP 3 CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           {/* TOTAL USERS */}
//           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

//             <div className="flex justify-between items-center">

//               <div>

//                 <p className="text-slate-500 font-medium">

//                   Total Users

//                 </p>

//                 <h1 className="text-4xl font-bold text-slate-800 mt-3">

//                   {users.length}

//                 </h1>

//               </div>

//               <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-3xl">

//                 <FaUsers />

//               </div>

//             </div>

//           </div>

//           {/* ADMIN USERS */}
//           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

//             <div className="flex justify-between items-center">

//               <div>

//                 <p className="text-slate-500 font-medium">

//                   Admin Accounts

//                 </p>

//                 <h1 className="text-4xl font-bold text-slate-800 mt-3">

//                   {admins}

//                 </h1>

//               </div>

//               <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 text-3xl">

//                 <FaUserShield />

//               </div>

//             </div>

//           </div>

//           {/* EMPLOYEE USERS */}
//           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

//             <div className="flex justify-between items-center">

//               <div>

//                 <p className="text-slate-500 font-medium">

//                   Employee Accounts

//                 </p>

//                 <h1 className="text-4xl font-bold text-slate-800 mt-3">

//                   {employeeUsers}

//                 </h1>

//               </div>

//               <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-3xl">

//                 <FaUsers />

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* BOTTOM 2 CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* MANAGER USERS */}
//           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

//             <div className="flex justify-between items-center">

//               <div>

//                 <p className="text-slate-500 font-medium">

//                   Manager Accounts

//                 </p>

//                 <h1 className="text-4xl font-bold text-slate-800 mt-3">

//                   {managerUsers}

//                 </h1>

//               </div>

//               <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-700 text-3xl">

//                 <FaUserTie />

//               </div>

//             </div>

//           </div>

//           {/* FINANCE USERS */}
//           <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

//             <div className="flex justify-between items-center">

//               <div>

//                 <p className="text-slate-500 font-medium">

//                   Finance Accounts

//                 </p>

//                 <h1 className="text-4xl font-bold text-slate-800 mt-3">

//                   {financeUsers}

//                 </h1>

//               </div>

//               <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 text-3xl">

//                 <FaMoneyBillWave />

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* ================= USERS TABLE ================= */}
//       <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

//         {/* TABLE HEADER */}
//         <div className="p-7 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

//           <div>

//             <h2 className="text-2xl font-bold text-slate-800">

//               System Users

//             </h2>

//             <p className="text-slate-500 mt-1">

//               Manage all registered platform users

//             </p>

//           </div>

//           <div className="bg-slate-100 px-5 py-3 rounded-2xl">

//             <p className="text-slate-600 font-semibold">

//               {users.length} Registered Users

//             </p>

//           </div>

//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-slate-100">

//   <tr>

//     <th className="text-center p-5 font-semibold text-slate-700">

//       User

//     </th>

//     <th className="text-center p-5 font-semibold text-slate-700">

//       Email

//     </th>

//     <th className="text-center p-5 font-semibold text-slate-700">

//       Role

//     </th>

//     <th className="text-center p-5 font-semibold text-slate-700">

//       Department

//     </th>

//     <th className="text-center p-5 font-semibold text-slate-700">

//       Status

//     </th>

//     <th className="text-center p-5 font-semibold text-slate-700">

//       Actions

//     </th>

//   </tr>

// </thead>

// <tbody>

//   {users.map((user) => (

//     <tr
//       key={user.id}
//       className="border-t border-slate-100 hover:bg-slate-50 transition"
//     >

//       {/* USER */}
//       <td className="p-5 text-center">

//         <div className="flex flex-col items-center justify-center">

//           <h3 className="font-bold text-slate-800 text-lg">

//             {user.name}

//           </h3>

//           <p className="text-sm text-slate-400 mt-1">

//             User ID: {user.id}

//           </p>

//         </div>

//       </td>

//       {/* EMAIL */}
//       <td className="p-5 text-center">

//         <div className="flex items-center justify-center gap-3 text-slate-600">

//           <FaEnvelope className="text-slate-400" />

//           {user.email}

//         </div>

//       </td>

//       {/* ROLE */}
//       <td className="p-5 text-center">

//         <div className="flex justify-center">

//           <span
//             className={`px-4 py-2 rounded-full text-sm font-semibold ${
//               user.role === "ADMIN"
//                 ? "bg-purple-100 text-purple-700"
//                 : user.role === "MANAGER"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : user.role === "FINANCE"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-blue-100 text-blue-700"
//             }`}
//           >

//             {user.role}

//           </span>

//         </div>

//       </td>

//       {/* DEPARTMENT */}
//       <td className="p-5 text-center">

//         <div className="flex items-center justify-center gap-3 text-slate-700 font-medium">

//           <FaBuilding className="text-slate-400" />

//           {user.department}

//         </div>

//       </td>

//       {/* STATUS */}
//       <td className="p-5 text-center">

//         <div className="flex justify-center">

//           <button
//             onClick={async () => {

//               try {

//                 await toggleUserStatus(
//                   user.id
//                 ).unwrap();

//                 toast.success(
//                   `User ${
//                     user.active
//                       ? "disabled"
//                       : "activated"
//                   } successfully`
//                 );

//               } catch {

//                 toast.error(
//                   "Failed to update status"
//                 );
//               }
//             }}
//             className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
//               user.active
//                 ? "bg-green-100 text-green-700 hover:bg-green-200"
//                 : "bg-red-100 text-red-700 hover:bg-red-200"
//             }`}
//           >

//             {user.active
//               ? "Active"
//               : "Disabled"}

//           </button>

//         </div>

//       </td>

//       {/* ACTIONS */}
//       <td className="p-5 text-center">

//         {user.email !==
//           "admin@test.com" && (

//           <div className="flex justify-center gap-3">

//             <button
//               onClick={() => {

//                 const confirmDelete =
//                   window.confirm(
//                     "Are you sure you want to permanently delete this user?"
//                   );

//                 if (
//                   confirmDelete
//                 ) {

//                   handleDelete(
//                     user.id
//                   );
//                 }
//               }}
//               className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition font-medium"
//             >

//               <FaTrash />

//               Delete

//             </button>

//           </div>

//         )}

//       </td>

//     </tr>
//   ))}

// </tbody>

//           </table>

//         </div>

//       </div>

//       {/* ================= ADD USER MODAL ================= */}
//       {showModal && (

//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

//           <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative border border-slate-200">

//             <button
//               onClick={() =>
//                 setShowModal(false)
//               }
//               className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-red-500 transition"
//             >

//               ✕

//             </button>

//             <div className="mb-6">

//               <h2 className="text-3xl font-bold text-slate-800">

//                 Create New User

//               </h2>

//               <p className="text-gray-500 mt-2">

//                 Add new users to the travel management system

//               </p>

//             </div>

//             <AddUserModal
//               closeModal={() =>
//                 setShowModal(false)
//               }
//             />

//           </div>

//         </div>

//       )}

      

//     </div>
//   );
// };

// export default UserManagement;



import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaUsers,
  FaUserShield,
  FaEnvelope,
  FaBuilding,
  FaTrash,
  FaPlus,
  FaUserTie,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useToggleUserStatusMutation,
} from "../../services/adminApi";

import AddUserModal from "./AddUserModal";

const UserManagement = () => {

  const [showModal, setShowModal] = useState(false);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useGetAllUsersQuery();

  const [deleteUser] =
    useDeleteUserMutation();

  const [toggleUserStatus] =
    useToggleUserStatusMutation();

  // ================= DELETE USER =================

  const handleDelete = async (id) => {

    try {

      await deleteUser(id).unwrap();

      toast.success(
        "User deleted successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete user"
      );
    }
  };

  // ================= STATS =================

  const admins =
    users.filter(
      (u) => u.role === "ADMIN"
    ).length;

  const employeeUsers =
    users.filter(
      (u) => u.role === "EMPLOYEE"
    ).length;

  const managerUsers =
    users.filter(
      (u) => u.role === "MANAGER"
    ).length;

  const financeUsers =
    users.filter(
      (u) => u.role === "FINANCE"
    ).length;

  // ================= LOADING =================

  if (isLoading) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <h1 className="text-3xl font-bold text-slate-700 animate-pulse">

          Loading Users...

        </h1>

      </div>
    );
  }

  // ================= ERROR =================

  if (isError) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <h1 className="text-2xl font-bold text-red-500">

          Failed to load users

        </h1>

      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">

            User Management

          </h1>

          <p className="text-gray-500 mt-2">

            Manage employees, managers,
            finance and admin accounts

          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 bg-linear-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold"
        >

          <FaPlus />

          Add User

        </button>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <StatCard
          title="Total Users"
          value={users.length}
          icon={<FaUsers />}
          color="blue"
        />

        <StatCard
          title="Admins"
          value={admins}
          icon={<FaUserShield />}
          color="purple"
        />

        <StatCard
          title="Employees"
          value={employeeUsers}
          icon={<FaUsers />}
          color="cyan"
        />

        <StatCard
          title="Managers"
          value={managerUsers}
          icon={<FaUserTie />}
          color="yellow"
        />

        <StatCard
          title="Finance"
          value={financeUsers}
          icon={<FaMoneyBillWave />}
          color="green"
        />

      </div>

      {/* ================= USERS TABLE ================= */}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* TABLE HEADER */}

        <div className="p-7 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              System Users

            </h2>

            <p className="text-slate-500 mt-1">

              Manage all registered platform users

            </p>

          </div>

          <div className="bg-slate-100 px-5 py-3 rounded-2xl">

            <p className="text-slate-600 font-semibold">

              {users.length} Registered Users

            </p>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-center p-5 font-semibold text-slate-700">

                  User

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Email

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Role

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Department

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Status

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-slate-500"
                  >

                    No users found

                  </td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr
                    key={user.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >

                    {/* USER */}

                    <td className="p-5 text-center">

                      <div className="flex flex-col items-center justify-center">

                        <h3 className="font-bold text-slate-800 text-lg">

                          {user.name}

                        </h3>

                        <p className="text-sm text-slate-400 mt-1">

                          User ID: {user.id}

                        </p>

                      </div>

                    </td>

                    {/* EMAIL */}

                    <td className="p-5 text-center">

                      <div className="flex items-center justify-center gap-3 text-slate-600">

                        <FaEnvelope className="text-slate-400" />

                        {user.email}

                      </div>

                    </td>

                    {/* ROLE */}

                    <td className="p-5 text-center">

                      <div className="flex justify-center">

                        <span
                          className={`px-4 py-2 rounded-full font-semibold text-sm ${
                            user.role === "ADMIN"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "MANAGER"
                              ? "bg-yellow-100 text-yellow-700"
                              : user.role === "FINANCE"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >

                          {user.role}

                        </span>

                      </div>

                    </td>

                    {/* DEPARTMENT */}

                    <td className="p-5 text-center">

                      <div className="flex items-center justify-center gap-3 text-slate-700 font-medium">

                        <FaBuilding className="text-slate-400" />

                        {user.department?.name || "N/A"}

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="p-5 text-center">

                      <div className="flex justify-center">

                        <button
                          onClick={async () => {

                            try {

                              await toggleUserStatus(
                                user.id
                              ).unwrap();

                              toast.success(
                                `User ${
                                  user.active
                                    ? "disabled"
                                    : "activated"
                                } successfully`
                              );

                            } catch {

                              toast.error(
                                "Failed to update status"
                              );
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                            user.active
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >

                          {user.active
                            ? "Active"
                            : "Disabled"}

                        </button>

                      </div>

                    </td>

                    {/* ACTIONS */}

                    <td className="p-5 text-center">

                      {user.email !== "admin@test.com" && (

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() => {

                              const confirmDelete =
                                window.confirm(
                                  "Are you sure you want to permanently delete this user?"
                                );

                              if (
                                confirmDelete
                              ) {

                                handleDelete(
                                  user.id
                                );
                              }
                            }}
                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition font-medium"
                          >

                            <FaTrash />

                            Delete

                          </button>

                        </div>

                      )}

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative border border-slate-200">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-red-500 transition"
            >

              ✕

            </button>

            <div className="mb-6">

              <h2 className="text-3xl font-bold text-slate-800">

                Create New User

              </h2>

              <p className="text-gray-500 mt-2">

                Add new users to the travel management system

              </p>

            </div>

            <AddUserModal
              closeModal={() => setShowModal(false)}
            />

          </div>

        </div>

      )}

    </div>
  );
};

// ================= REUSABLE CARD =================

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    cyan: "bg-cyan-100 text-cyan-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
  };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 font-medium">

            {title}

          </p>

          <h1 className="text-4xl font-bold text-slate-800 mt-3">

            {value}

          </h1>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${colorMap[color]}`}
        >

          {icon}

        </div>

      </div>

    </div>
  );
};

export default UserManagement;