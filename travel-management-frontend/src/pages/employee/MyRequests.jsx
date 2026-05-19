import { useEffect, useState, useCallback } from "react";

import {
  FaPlus,
  FaPlaneDeparture,
  FaEye,
  FaPaperPlane,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const MyRequests = () => {

  const token = localStorage.getItem("token");

  const emptyForm = {

    source: "",

    destination: "",

    purpose: "",

    startDate: "",

    endDate: "",

    transportMode: "",

    accommodation: "",

    budget: "",

    description: "",
  };

  const [openForm, setOpenForm] = useState(false);

  const [requests, setRequests] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  // INPUT CHANGE
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // FETCH REQUESTS
  const fetchRequests = useCallback(async () => {

    try {

      const res = await fetch(
        "http://localhost:8080/employee/requests",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      setRequests(
        Array.isArray(data)
          ? data
          : data.data || []
      );

    } catch (err) {

      console.log(err);

      setRequests([]);
    }

  }, [token]);

  // LOAD REQUESTS
  useEffect(() => {

  const loadRequests = async () => {

    await fetchRequests();

  };

  loadRequests();

}, [fetchRequests]);

  // CREATE / UPDATE REQUEST
  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {

      source: form.source,

      destination: form.destination,

      purpose: form.purpose,

      startDate: form.startDate,

      endDate: form.endDate,

      budget: Number(form.budget),

      transportMode: form.transportMode,

      accommodation: form.accommodation,

      description: form.description,
    };

    try {

      let url =
        "http://localhost:8080/employee/request";

      let method = "POST";

      if (editMode) {

        url =
          `http://localhost:8080/employee/edit/${editId}`;

        method = "PUT";
      }

      const res = await fetch(url, {

        method,

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      });

      const msg = await res.text();

      if (!res.ok) {

        throw new Error(msg);
      }

      alert(
        editMode
          ? "Request updated successfully"
          : "Request created successfully"
      );

      setOpenForm(false);

      setEditMode(false);

      setEditId(null);

      setForm(emptyForm);

      fetchRequests();

    } catch (err) {

      console.log(err);

      alert("Operation failed");
    }
  };

  // EDIT REQUEST
  const editRequest = (request) => {

    setEditMode(true);

    setEditId(request.id);

    setForm({

      source: request.source || "",

      destination: request.destination || "",

      purpose: request.purpose || "",

      startDate: request.startDate || "",

      endDate: request.endDate || "",

      transportMode: request.transportMode || "",

      accommodation: request.accommodation || "",

      budget: request.budget || "",

      description: request.description || "",
    });

    setOpenForm(true);
  };

  // SUBMIT REQUEST
  const submitRequest = async (id) => {

    try {

      const res = await fetch(
        `http://localhost:8080/employee/submit/${id}`,
        {

          method: "PUT",

          headers: {

            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {

        throw new Error();
      }

      alert("Request submitted");

      fetchRequests();

    } catch {

      alert("Submit failed");
    }
  };

  // DELETE REQUEST
  const deleteRequest = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this request?"
      );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:8080/employee/delete/${id}`,
        {

          method: "DELETE",

          headers: {

            Authorization: `Bearer ${token}`,
          },
        }
      );

      const msg = await res.text();

      if (!res.ok) {

        throw new Error(msg);
      }

      alert("Request deleted successfully");

      fetchRequests();

    } catch (err) {

      console.log(err);

      alert("Delete failed");
    }
  };

  return (

    <div className="h-screen overflow-hidden bg-slate-100 p-5 flex flex-col">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 flex items-center justify-between flex-shrink-0">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">

            <FaPlaneDeparture className="text-2xl text-cyan-700" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">

              My Travel Requests

            </h1>

            <p className="text-slate-500 mt-1">

              Manage your travel requests and approvals

            </p>

          </div>

        </div>

        <button
          onClick={() => {

            setForm(emptyForm);

            setEditMode(false);

            setEditId(null);

            setOpenForm(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold shadow-lg"
        >

          <FaPlus />

          Create Request

        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white mt-5 rounded-3xl shadow-lg border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">

        <div className="px-8 py-5 border-b border-slate-200 flex-shrink-0">

          <h2 className="text-2xl font-bold text-slate-800">

            All Travel Requests

          </h2>

        </div>

        <div className="overflow-auto flex-1">

          <table className="w-full">

            <thead className="bg-slate-100 sticky top-0 z-10">

              <tr>

                <th className="p-4 text-left">Source</th>

                <th className="p-4 text-left">Destination</th>

                <th className="p-4 text-left">Purpose</th>

                <th className="p-4 text-left">Start Date</th>

                <th className="p-4 text-left">Budget</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Actions</th>

              </tr>

            </thead>

            <tbody>

              {requests.map((r) => (

                <tr
                  key={r.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4">{r.source}</td>

                  <td className="p-4">{r.destination}</td>

                  <td className="p-4">{r.purpose}</td>

                  <td className="p-4">{r.startDate}</td>

                  <td className="p-4">₹ {r.budget}</td>

                  <td className="p-4">

                    <span
                      className={`px-4 py-2 rounded-full text-white text-sm
                      ${
                        r.status === "APPROVED"
                          ? "bg-green-500"
                          : r.status === "REJECTED"
                          ? "bg-red-500"
                          : r.status === "SUBMITTED"
                          ? "bg-blue-500"
                          : "bg-amber-500"
                      }`}
                    >

                      {r.status}

                    </span>

                  </td>

                  <td className="p-4 flex gap-2">

                    {/* VIEW */}
                    <button
                      onClick={() => {

                        setSelectedRequest(r);

                        setViewOpen(true);
                      }}
                      className="w-10 h-10 rounded-xl bg-slate-200 hover:bg-slate-300 transition flex items-center justify-center"
                    >

                      <FaEye />

                    </button>

                    {/* EDIT */}
                    {r.status === "DRAFT" && (

                      <button
                        onClick={() => editRequest(r)}
                        className="w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
                      >

                        <FaEdit />

                      </button>

                    )}

                    {/* DELETE */}
                    <button
                      onClick={() => deleteRequest(r.id)}
                      className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                    >

                      <FaTrash />

                    </button>

                    {/* SUBMIT */}
                    {r.status === "DRAFT" && (

                      <button
                        onClick={() => submitRequest(r.id)}
                        className="w-10 h-10 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center"
                      >

                        <FaPaperPlane />

                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* CREATE / EDIT FORM */}
      {openForm && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-5 z-50">

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]"
          >

            {/* HEADER */}
            <div className="p-8 border-b border-slate-200">

              <h2 className="text-3xl font-bold text-slate-800">

                {editMode
                  ? "Edit Travel Request"
                  : "Create Travel Request"}

              </h2>

            </div>

            {/* SCROLLABLE FORM */}
            <div className="overflow-y-auto p-8 flex-1">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Source
                  </label>

                  <input
                    type="text"
                    name="source"
                    placeholder="Enter source location"
                    value={form.source}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Destination
                  </label>

                  <input
                    type="text"
                    name="destination"
                    placeholder="Enter destination"
                    value={form.destination}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Purpose
                  </label>

                  <input
                    type="text"
                    name="purpose"
                    placeholder="Travel purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Transport Mode
                  </label>

                  <input
                    type="text"
                    name="transportMode"
                    placeholder="Flight / Train / Bus"
                    value={form.transportMode}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Accommodation
                  </label>

                  <input
                    type="text"
                    name="accommodation"
                    placeholder="Hotel details"
                    value={form.accommodation}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Budget
                  </label>

                  <input
                    type="number"
                    name="budget"
                    placeholder="Enter estimated budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />
                </div>

              </div>

              <div className="mt-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter complete travel description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-slate-300 p-3 rounded-xl"
                />

              </div>

            </div>

            {/* FIXED BUTTONS */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-8 py-5 flex justify-end gap-3 rounded-b-3xl">

              <button
                type="button"
                onClick={() => {

                  setOpenForm(false);

                  setEditMode(false);

                  setEditId(null);

                  setForm(emptyForm);
                }}
                className="border border-slate-300 px-5 py-3 rounded-xl hover:bg-slate-100 transition"
              >

                Cancel

              </button>

              <button
                type="submit"
                disabled={
                  !form.source ||
                  !form.destination ||
                  !form.purpose ||
                  !form.startDate ||
                  !form.endDate ||
                  !form.transportMode ||
                  !form.accommodation ||
                  !form.budget ||
                  !form.description
                }
                className={`px-6 py-3 rounded-xl font-semibold
                ${
                  !form.source ||
                  !form.destination ||
                  !form.purpose ||
                  !form.startDate ||
                  !form.endDate ||
                  !form.transportMode ||
                  !form.accommodation ||
                  !form.budget ||
                  !form.description
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-cyan-600 hover:bg-cyan-700 text-white"
                }`}
              >

                {editMode
                  ? "Update Request"
                  : "Create Request"}

              </button>

            </div>

          </form>

        </div>

      )}

      {/* VIEW MODAL */}
      {viewOpen && selectedRequest && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-5 z-50">

          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">

            <div className="bg-cyan-600 px-8 py-5 flex justify-between items-center">

              <h2 className="text-2xl font-bold text-white">

                Travel Request Details

              </h2>

              <button
                onClick={() => setViewOpen(false)}
                className="text-white text-3xl font-bold"
              >

                ×

              </button>

            </div>

            <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <p className="text-gray-500 text-sm">Source</p>
                <h3 className="font-semibold text-lg">
                  {selectedRequest.source}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Destination</p>
                <h3 className="font-semibold text-lg">
                  {selectedRequest.destination}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Purpose</p>
                <h3 className="font-semibold text-lg">
                  {selectedRequest.purpose}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <h3 className="font-semibold text-lg">
                  {selectedRequest.status}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Start Date</p>
                <h3 className="font-semibold text-lg">
                  {selectedRequest.startDate}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">End Date</p>
                <h3 className="font-semibold text-lg">
                  {selectedRequest.endDate}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Budget</p>
                <h3 className="font-semibold text-lg">
                  ₹ {selectedRequest.budget}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Transport Mode</p>
                <h3 className="font-semibold text-lg">
                  {selectedRequest.transportMode}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Accommodation</p>
                <h3 className="font-semibold text-lg">
                  {selectedRequest.accommodation}
                </h3>
              </div>

              <div className="md:col-span-2">

                <p className="text-gray-500 text-sm">Description</p>

                <div className="bg-slate-100 p-4 rounded-2xl mt-2">

                  {selectedRequest.description || "No Description"}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default MyRequests;