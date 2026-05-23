import { useEffect, useState } from "react";

import {
  FaUserShield,
  FaEnvelope,
  FaUserCog,
  FaEdit,
  FaSave,
  FaUsers,
  FaPlaneDeparture,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const AdminProfile = () => {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

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
          "http://localhost:8080/employee/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setProfile(data);

        setFormData({
          name: data.name || "",
          email: data.email || "",
          password: "",
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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

    try {
      const res = await fetch(
        "http://localhost:8080/employee/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const msg = await res.text();

      alert(msg);

      setProfile({
        ...profile,
        name: formData.name,
        email: formData.email,
      });

      setEditMode(false);
    } catch (err) {
      console.log(err);
      alert("Profile update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl font-semibold text-slate-600">
        Loading Admin Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Admin Profile
        </h1>
        <p className="text-slate-500 mt-2">
          Manage your account settings & system access
        </p>
      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* TOP */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white p-8">
          <div className="flex items-center gap-6">

            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl">
              <FaUserShield />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {profile?.name}
              </h2>
              <p className="text-red-100 mt-1">
                {profile?.email}
              </p>

              <span className="mt-3 inline-block px-4 py-1 bg-white/20 rounded-full text-sm">
                ADMINISTRATOR
              </span>
            </div>

          </div>
        </div>

        {/* BODY */}
        <div className="p-8">

          {!editMode ? (
            <>
              {/* INFO GRID */}
              <div className="grid md:grid-cols-2 gap-6">

                <InfoCard icon={<FaUserCog />} label="Full Name" value={profile?.name} color="red" />
                <InfoCard icon={<FaEnvelope />} label="Email" value={profile?.email} color="orange" />
                <InfoCard icon={<FaUserShield />} label="Role" value="ADMIN" color="green" />
                <InfoCard icon={<FaUsers />} label="User Management" value="Employees & Managers" color="blue" />
                <InfoCard icon={<FaPlaneDeparture />} label="Travel System" value="Policies & Requests" color="purple" />
                <InfoCard icon={<FaMoneyCheckAlt />} label="Finance" value="Reports & Expenses" color="yellow" />

              </div>

              {/* EDIT BUTTON */}
              <button
                onClick={() => setEditMode(true)}
                className="mt-8 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
              >
                <FaEdit />
                Edit Profile
              </button>
            </>
          ) : (
            /* ================= EDIT FORM ================= */
            <form onSubmit={updateProfile} className="space-y-5">

              <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
              <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Leave blank if unchanged" />

              <div className="flex gap-3 pt-4">

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
                >
                  <FaSave />
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-slate-200 hover:bg-slate-300 px-5 py-3 rounded-xl"
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

/* ================= REUSABLE COMPONENTS ================= */

const InfoCard = ({ icon, label, value, color }) => {

  const colors = {
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl hover:shadow-md transition">

      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${colors[color]}`}>
        {icon}
      </div>

      <div>
        <p className="text-slate-500 text-sm">{label}</p>
        <h3 className="font-semibold text-slate-800">{value}</h3>
      </div>

    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-2 font-medium text-slate-700">
      {label}
    </label>
    <input
      {...props}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
    />
  </div>
);