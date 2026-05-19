import { useEffect, useState } from "react";

const Profile = () => {

  const token =
    localStorage.getItem("token");

  const [profile, setProfile] =
    useState(null);

  const [editMode, setEditMode] =
    useState(false);

  const [form, setForm] =
    useState({

      name: "",

      password: "",

      phone: "",

    });

  // FETCH PROFILE
  const fetchProfile = async () => {

    try {

      const res =
        await fetch(
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

      setForm({

        name: data.name,

        phone: data.phone || "",

        password: "",

      });

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

  const fetchData = async () => {
    await fetchProfile();
  };

  fetchData();

},);

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  // UPDATE PROFILE
  const handleUpdate = async (
    e
  ) => {

    e.preventDefault();

    try {

      const res =
        await fetch(
          "http://localhost:8080/employee/profile",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              form
            ),

          }
        );

      if (!res.ok)
        throw new Error();

      alert(
        "Profile updated successfully"
      );

      setEditMode(false);

      fetchProfile();

    } catch (err) {

      console.log(err);

      alert(
        "Failed to update profile"
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold">

            👤 My Profile

          </h1>

          <p className="text-gray-500">

            Manage your personal details

          </p>

        </div>

        <button
          onClick={() =>
            setEditMode(
              !editMode
            )
          }
          className="bg-cyan-600 text-white px-5 py-2 rounded-xl hover:bg-cyan-700"
        >

          {editMode
            ? "Cancel"
            : "Edit Profile"}

        </button>

      </div>

      {/* PROFILE CARD */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow max-w-xl">

        {profile ? (

          <form
            onSubmit={
              handleUpdate
            }
            className="space-y-4"
          >

            {/* NAME */}
            <div>

              <label className="text-sm text-gray-500">

                Name

              </label>

              <input
                name="name"
                value={form.name}
                disabled={!editMode}
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded-xl mt-1"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="text-sm text-gray-500">

                Email

              </label>

              <input
                value={
                  profile.email
                }
                disabled
                className="w-full border p-3 rounded-xl mt-1 bg-gray-100"
              />

            </div>

            {/* PHONE */}
            <div>

              <label className="text-sm text-gray-500">

                Phone

              </label>

              <input
                name="phone"
                value={form.phone}
                disabled={!editMode}
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded-xl mt-1"
              />

            </div>

            {/* PASSWORD */}
            {editMode && (

              <div>

                <label className="text-sm text-gray-500">

                  New Password

                </label>

                <input
                  name="password"
                  type="password"
                  value={
                    form.password
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border p-3 rounded-xl mt-1"
                />

              </div>

            )}

            {/* BUTTON */}
            {editMode && (

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
              >

                Update Profile

              </button>

            )}

          </form>

        ) : (

          <p>Loading...</p>

        )}

      </div>

    </div>
  );
};

export default Profile; 