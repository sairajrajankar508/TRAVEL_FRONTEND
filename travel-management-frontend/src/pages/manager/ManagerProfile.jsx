import { useEffect, useState } from "react";

import {
  FaUserTie,
  FaEnvelope,
  FaUserShield,
  FaEdit,
  FaSave,
} from "react-icons/fa";

const ManagerProfile = () => {

  const token =
    localStorage.getItem("token");

  const [profile, setProfile] =
    useState(null);

  const [editMode, setEditMode] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
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
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setProfile(data);

        setFormData({
          name:
            data.name || "",
          email:
            data.email || "",
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
      [e.target.name]:
        e.target.value,
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
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const msg =
        await res.text();

      alert(msg);

      setEditMode(false);

      setProfile({
        ...profile,
        name:
          formData.name,

        email:
          formData.email,
      });

    } catch (err) {

      console.log(err);

      alert(
        "Profile update failed"
      );
    }
  };

  if (loading) {

    return (

      <div className="p-10">

        Loading...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">

          Manager Profile

        </h1>

        <p className="text-slate-500 mt-2">

          Manage your profile information

        </p>

      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* TOP SECTION */}
        <div className="bg-gradient-to-r from-cyan-700 to-blue-700 p-8 text-white">

          <div className="flex items-center gap-6">

            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-5xl">

              <FaUserTie />

            </div>

            {/* INFO */}
            <div>

              <h2 className="text-3xl font-bold">

                {profile?.name}

              </h2>

              <p className="mt-2 text-cyan-100">

                {profile?.email}

              </p>

              <div className="mt-3 inline-block px-4 py-1 rounded-full bg-white/20 text-sm">

                MANAGER

              </div>

            </div>

          </div>

        </div>

        {/* BODY */}
        <div className="p-8">

          {!editMode ? (

            <div className="space-y-6">

              {/* NAME */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700">

                  <FaUserTie />

                </div>

                <div>

                  <p className="text-slate-500 text-sm">

                    Full Name

                  </p>

                  <h3 className="text-lg font-semibold">

                    {profile?.name}

                  </h3>

                </div>

              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">

                  <FaEnvelope />

                </div>

                <div>

                  <p className="text-slate-500 text-sm">

                    Email Address

                  </p>

                  <h3 className="text-lg font-semibold">

                    {profile?.email}

                  </h3>

                </div>

              </div>

              {/* ROLE */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700">

                  <FaUserShield />

                </div>

                <div>

                  <p className="text-slate-500 text-sm">

                    Role

                  </p>

                  <h3 className="text-lg font-semibold">

                    MANAGER

                  </h3>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={() =>
                  setEditMode(true)
                }
                className="mt-6 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl transition"
              >

                <FaEdit />

                Edit Profile

              </button>

            </div>

          ) : (

            /* ================= EDIT FORM ================= */
            <form
              onSubmit={
                updateProfile
              }
              className="space-y-5"
            >

              {/* NAME */}
              <div>

                <label className="block mb-2 font-medium">

                  Name

                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block mb-2 font-medium">

                  Email

                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block mb-2 font-medium">

                  New Password

                </label>

                <input
                  type="password"
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Leave blank if unchanged"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                />

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-4">

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
                >

                  <FaSave />

                  Save Changes

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditMode(false)
                  }
                  className="bg-slate-200 hover:bg-slate-300 px-5 py-3 rounded-xl transition"
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

export default ManagerProfile;