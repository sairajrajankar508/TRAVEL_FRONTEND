// import { useEffect, useState } from "react";

// import {
//   FaUserShield,
//   FaEnvelope,
//   FaUserCog,
//   FaEdit,
//   FaSave,
//   FaUsers,
//   FaPlaneDeparture,
//   FaMoneyCheckAlt,
//   FaClipboardList,
//   FaChartBar,
// } from "react-icons/fa";

// const AdminProfile = () => {

//   const token =
//     localStorage.getItem("token");

//   const [profile, setProfile] =
//     useState(null);

//   const [editMode, setEditMode] =
//     useState(false);

//   const [loading, setLoading] =
//     useState(true);

//   const [formData, setFormData] =
//     useState({
//       name: "",
//       email: "",
//       password: "",
//     });

//   // ================= FETCH PROFILE =================
//   useEffect(() => {

//     const fetchProfile = async () => {

//       try {

//         const res = await fetch(
//           "http://localhost:8080/employee/profile",
//           {
//             headers: {
//               Authorization:
//                 `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {

//           throw new Error(
//             "Failed to fetch profile"
//           );
//         }

//         const data =
//           await res.json();

//         setProfile(data);

//         setFormData({
//           name:
//             data.name || "",
//           email:
//             data.email || "",
//           password: "",
//         });

//       } catch (err) {

//         console.log(err);

//       } finally {

//         setLoading(false);
//       }
//     };

//     fetchProfile();

//   }, [token]);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   // ================= UPDATE PROFILE =================
//   const updateProfile = async (e) => {

//     e.preventDefault();

//     try {

//       const res = await fetch(
//         "http://localhost:8080/employee/profile/update",
//         {
//           method: "PUT",

//           headers: {
//             "Content-Type":
//               "application/json",

//             Authorization:
//               `Bearer ${token}`,
//           },

//           body: JSON.stringify(
//             formData
//           ),
//         }
//       );

//       const msg =
//         await res.text();

//       alert(msg);

//       setProfile({
//         ...profile,
//         name:
//           formData.name,

//         email:
//           formData.email,
//       });

//       setEditMode(false);

//     } catch (err) {

//       console.log(err);

//       alert(
//         "Profile update failed"
//       );
//     }
//   };

//   // ================= LOADING =================
//   if (loading) {

//     return (

//       <div className="flex items-center justify-center h-screen bg-slate-100">

//         <div className="text-2xl font-bold text-slate-700">

//           Loading Profile...

//         </div>

//       </div>
//     );
//   }

//   return (

//     <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-100 p-6 flex flex-col gap-6">

//       {/* ================= HEADER ================= */}
//       <div className="bg-white rounded-3xl shadow-xl p-7 flex items-center justify-between">

//         <div className="flex items-center gap-5">

//           <div className="w-20 h-20 rounded-3xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-4xl">

//             <FaUserShield />

//           </div>

//           <div>

//             <h1 className="text-4xl font-bold text-slate-800">

//               Admin Profile

//             </h1>

//             <p className="text-slate-500 mt-2 text-lg">

//               Manage admin account and system access

//             </p>

//           </div>

//         </div>

//         {!editMode && (

//           <button
//             onClick={() =>
//               setEditMode(true)
//             }
//             className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 transition-all duration-300 text-white px-6 py-4 rounded-2xl shadow-lg font-semibold flex items-center gap-3"
//           >

//             <FaEdit />

//             Edit Profile

//           </button>

//         )}

//       </div>

//       {/* ================= PROFILE CARD ================= */}
//       <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">

//         {/* ================= TOP SECTION ================= */}
//         <div className="bg-gradient-to-r from-indigo-700 to-blue-700 p-8 text-white">

//           <div className="flex items-center gap-6">

//             {/* AVATAR */}
//             <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-6xl border-4 border-white/20">

//               <FaUserShield />

//             </div>

//             {/* INFO */}
//             <div>

//               <h2 className="text-4xl font-bold">

//                 {profile?.name}

//               </h2>

//               <p className="mt-3 text-indigo-100 text-lg">

//                 {profile?.email}

//               </p>

//               <div className="mt-4 inline-block px-5 py-2 rounded-full bg-white/20 text-sm font-semibold tracking-wide">

//                 ADMINISTRATOR ACCESS

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* ================= BODY ================= */}
//         <div className="flex-1 overflow-auto p-8">

//           {!editMode ? (

//             <>
//               {/* ================= INFO GRID ================= */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//                 <InfoCard
//                   icon={<FaUserCog />}
//                   label="Full Name"
//                   value={profile?.name}
//                   color="indigo"
//                 />

//                 <InfoCard
//                   icon={<FaEnvelope />}
//                   label="Email Address"
//                   value={profile?.email}
//                   color="blue"
//                 />

//                 <InfoCard
//                   icon={<FaUserShield />}
//                   label="Role"
//                   value="ADMIN"
//                   color="green"
//                 />

//                 <InfoCard
//                   icon={<FaUsers />}
//                   label="User Management"
//                   value="Employees & Managers"
//                   color="purple"
//                 />

//                 <InfoCard
//                   icon={<FaPlaneDeparture />}
//                   label="Travel Management"
//                   value="Approve Travel Requests"
//                   color="cyan"
//                 />

//                 <InfoCard
//                   icon={<FaMoneyCheckAlt />}
//                   label="Expense Monitoring"
//                   value="Track Employee Expenses"
//                   color="yellow"
//                 />

//                 <InfoCard
//                   icon={<FaClipboardList />}
//                   label="Policy Control"
//                   value="Manage Travel Policies"
//                   color="orange"
//                 />

//                 <InfoCard
//                   icon={<FaChartBar />}
//                   label="Analytics"
//                   value="Dashboard & Reports"
//                   color="pink"
//                 />

//               </div>
//             </>

//           ) : (

//             /* ================= EDIT FORM ================= */
//             <form
//               onSubmit={
//                 updateProfile
//               }
//               className="max-w-3xl space-y-6"
//             >

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                 {/* NAME */}
//                 <Input
//                   label="Full Name"
//                   name="name"
//                   type="text"
//                   value={
//                     formData.name
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 />

//                 {/* EMAIL */}
//                 <Input
//                   label="Email Address"
//                   name="email"
//                   type="email"
//                   value={
//                     formData.email
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 />

//               </div>

//               {/* PASSWORD */}
//               <Input
//                 label="New Password"
//                 name="password"
//                 type="password"
//                 value={
//                   formData.password
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Leave blank if unchanged"
//               />

//               {/* BUTTONS */}
//               <div className="flex gap-4 pt-4">

//                 <button
//                   type="submit"
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-3 transition-all"
//                 >

//                   <FaSave />

//                   Save Changes

//                 </button>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setEditMode(false)
//                   }
//                   className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-2xl font-semibold transition-all"
//                 >

//                   Cancel

//                 </button>

//               </div>

//             </form>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default AdminProfile;

// /* ================= INFO CARD ================= */

// const InfoCard = ({
//   icon,
//   label,
//   value,
//   color,
// }) => {

//   const colors = {

//     indigo:
//       "bg-indigo-100 text-indigo-700",

//     blue:
//       "bg-blue-100 text-blue-700",

//     green:
//       "bg-green-100 text-green-700",

//     purple:
//       "bg-purple-100 text-purple-700",

//     cyan:
//       "bg-cyan-100 text-cyan-700",

//     yellow:
//       "bg-yellow-100 text-yellow-700",

//     orange:
//       "bg-orange-100 text-orange-700",

//     pink:
//       "bg-pink-100 text-pink-700",
//   };

//   return (

//     <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 rounded-3xl p-6 flex items-center gap-5">

//       <div
//         className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colors[color]}`}
//       >

//         {icon}

//       </div>

//       <div>

//         <p className="text-slate-500 text-sm">

//           {label}

//         </p>

//         <h3 className="text-lg font-bold text-slate-800 mt-1">

//           {value}

//         </h3>

//       </div>

//     </div>
//   );
// };

// /* ================= INPUT ================= */

// const Input = ({
//   label,
//   ...props
// }) => (

//   <div>

//     <label className="block mb-2 font-semibold text-slate-700">

//       {label}

//     </label>

//     <input
//       {...props}
//       className="w-full border border-slate-300 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
//     />

//   </div>
// );




import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaUserShield,
  FaEnvelope,
  FaUserCog,
  FaEdit,
  FaSave,
  FaUsers,
  FaPlaneDeparture,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";

const AdminProfile = () => {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= FETCH PROFILE =================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/admin/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        setProfile(data);

        setFormData({
          name: data?.name || "",
          email: data?.email || "",
          password: "",
        });
      } catch (err) {
        console.log(err);

        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE PROFILE =================

  const updateProfile = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
      };

      // password only if entered
      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      const res = await fetch(
        "http://localhost:8080/admin/profile/update",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const updatedData = await res.json();

      setProfile(updatedData);

      setFormData({
        name: updatedData?.name || "",
        email: updatedData?.email || "",
        password: "",
      });

      toast.success("Profile updated successfully");

      setEditMode(false);
    } catch (err) {
      console.log(err);

      toast.error("Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h1 className="text-2xl font-bold text-slate-700 mt-5">
            Loading Profile...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-50 to-blue-100 p-6 flex flex-col gap-6">
      {/* ================= HEADER ================= */}

      <div className="bg-white rounded-3xl shadow-xl p-7 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-4xl">
            <FaUserShield />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Admin Profile
            </h1>

            <p className="text-slate-500 mt-2 text-lg">
              Manage admin account and system access
            </p>
          </div>
        </div>

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-linear-to-r from-indigo-600 to-blue-600 hover:scale-105 transition-all duration-300 text-white px-6 py-4 rounded-2xl shadow-lg font-semibold flex items-center gap-3"
          >
            <FaEdit />

            Edit Profile
          </button>
        )}
      </div>

      {/* ================= PROFILE CARD ================= */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex-1">
        {/* TOP SECTION */}

        <div className="bg-linear-to-r from-indigo-700 to-blue-700 p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-6xl border-4 border-white/20">
              <FaUserShield />
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                {profile?.name || "Admin"}
              </h2>

              <p className="mt-3 text-indigo-100 text-lg">
                {profile?.email}
              </p>

              <div className="mt-4 inline-block px-5 py-2 rounded-full bg-white/20 text-sm font-semibold tracking-wide">
                ADMINISTRATOR ACCESS
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div className="p-8">
          {!editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <InfoCard
                icon={<FaUserCog />}
                label="Full Name"
                value={profile?.name}
                color="indigo"
              />

              <InfoCard
                icon={<FaEnvelope />}
                label="Email Address"
                value={profile?.email}
                color="blue"
              />

              <InfoCard
                icon={<FaUserShield />}
                label="Role"
                value="ADMIN"
                color="green"
              />

              <InfoCard
                icon={<FaUsers />}
                label="User Management"
                value="Employees & Managers"
                color="purple"
              />

              <InfoCard
                icon={<FaPlaneDeparture />}
                label="Travel Management"
                value="Approve Travel Requests"
                color="cyan"
              />

              <InfoCard
                icon={<FaMoneyCheckAlt />}
                label="Expense Monitoring"
                value="Track Employee Expenses"
                color="yellow"
              />

              <InfoCard
                icon={<FaClipboardList />}
                label="Policy Control"
                value="Manage Travel Policies"
                color="orange"
              />

              <InfoCard
                icon={<FaChartBar />}
                label="Analytics"
                value="Dashboard & Reports"
                color="pink"
              />
            </div>
          ) : (
            <form
              onSubmit={updateProfile}
              className="max-w-3xl space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank if unchanged"
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-3 transition-all"
                >
                  <FaSave />

                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-2xl font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

/* ================= INFO CARD ================= */

const InfoCard = ({
  icon,
  label,
  value,
  color,
}) => {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    cyan: "bg-cyan-100 text-cyan-700",
    yellow: "bg-yellow-100 text-yellow-700",
    orange: "bg-orange-100 text-orange-700",
    pink: "bg-pink-100 text-pink-700",
  };

  return (
    <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 rounded-3xl p-6 flex items-center gap-5">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colors[color]}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-slate-500 text-sm">
          {label}
        </p>

        <h3 className="text-lg font-bold text-slate-800 mt-1">
          {value}
        </h3>
      </div>
    </div>
  );
};

/* ================= INPUT ================= */

const Input = ({
  label,
  ...props
}) => (
  <div>
    <label className="block mb-2 font-semibold text-slate-700">
      {label}
    </label>

    <input
      {...props}
      className="w-full border border-slate-300 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
    />
  </div>
);