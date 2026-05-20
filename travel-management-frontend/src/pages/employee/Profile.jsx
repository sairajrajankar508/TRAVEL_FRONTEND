import { useEffect, useState, useCallback } from "react";

const Profile = () => {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= FETCH PROFILE =================
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/employee/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      setProfile(data);

      setForm({
        name: data?.name || "",
        email: data?.email || "",
        password: "",
      });

    } catch (err) {
      console.log("Profile error:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
  const loadProfile = async () => {
    await fetchProfile();
  };

  loadProfile();
}, [fetchProfile]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          body: JSON.stringify(form),
        }
      );

      const msg = await res.text();

      if (!res.ok) throw new Error(msg);

      alert("Profile updated successfully");

      setEditOpen(false);

      fetchProfile();

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-100 p-6">

      {/* HEADER CARD (LIKE EXPENSE UI) */}
      <div className="bg-white rounded-3xl shadow-lg border p-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Profile
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your account information
          </p>
        </div>

        <button
          onClick={() => setEditOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold shadow"
        >
          Edit Profile
        </button>

      </div>

      {/* PROFILE CARD */}
      <div className="mt-6 bg-white rounded-3xl shadow-lg border p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="p-4 bg-slate-50 rounded-2xl">
            <p className="text-slate-500 text-sm">Name</p>
            <p className="text-xl font-semibold text-slate-800">
              {profile?.name}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl">
            <p className="text-slate-500 text-sm">Email</p>
            <p className="text-xl font-semibold text-slate-800">
              {profile?.email}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl">
            <p className="text-slate-500 text-sm">Role</p>
            <p className="text-xl font-semibold text-slate-800">
              {profile?.role}
            </p>
          </div>

        </div>

      </div>

      {/* ================= EDIT MODAL ================= */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">

          <form
            onSubmit={updateProfile}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6"
          >

            <h2 className="text-2xl font-bold mb-5 text-slate-800">
              Edit Profile
            </h2>

            {/* NAME */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-1"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-1"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="text-sm font-semibold">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-1"
                placeholder="Leave empty if not changing"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="px-5 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-cyan-600 text-white rounded-xl"
              >
                Update
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  );
};

export default Profile;