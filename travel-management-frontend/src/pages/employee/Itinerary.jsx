import { useEffect, useState } from "react";

import {
  FaMapMarkedAlt,
  FaHotel,
  FaClipboardList,
  FaPlus,
  FaRoute,
  FaCalendarDay,
  FaSpinner,
} from "react-icons/fa";

import toast from "react-hot-toast";

const Itinerary = () => {

  const token = localStorage.getItem("token");

  // ================= STATES =================
  const [requests, setRequests] =
    useState([]);

  const [selectedRequestId, setSelectedRequestId] =
    useState("");

  const [itineraries, setItineraries] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [openForm, setOpenForm] =
  useState(false);
    
  const [openViewModal, setOpenViewModal] =
  useState(false);

  const [formData, setFormData] =
    useState({
      dayNumber: "",
      location: "",
      activity: "",
      hotelName: "",
      notes: "",
    });

  // ================= FETCH REQUESTS =================
  useEffect(() => {

    const fetchRequests = async () => {

      try {

        const res = await fetch(
          "http://localhost:8080/employee/requests",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setRequests(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.log(err);

      }
    };

    fetchRequests();

  }, [token]);

  // ================= FETCH ITINERARY =================
  const fetchItinerary = async (
    requestId
  ) => {

    try {

      if (!requestId) return;

      setLoading(true);

      const res = await fetch(
        `http://localhost:8080/itinerary/${requestId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch itinerary"
        );
      }

      const data =
        await res.json();

      setItineraries(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.log(err);

      setItineraries([]);

    } finally {

      setLoading(false);
    }
  };

  // ================= REQUEST CHANGE =================
  const handleRequestChange = (
    e
  ) => {

    const value =
      e.target.value;

    setSelectedRequestId(
      value
    );

    fetchItinerary(value);
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= ADD ITINERARY =================
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      if (!selectedRequestId) {

        toast.error(
          "Please select travel request"
        );

        return;
      }

      setSubmitting(true);

      const payload = {
        dayNumber: parseInt(
          formData.dayNumber
        ),

        location:
          formData.location,

        activity:
          formData.activity,

        hotelName:
          formData.hotelName,

        notes:
          formData.notes,

        travelRequestId:
          parseInt(
            selectedRequestId
          ),
      };

      const res = await fetch(
        "http://localhost:8080/itinerary/add",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      const msg =
        await res.text();

      if (!res.ok) {
        throw new Error(msg);
      }

      toast.success(msg);

      setFormData({
        dayNumber: "",
        location: "",
        activity: "",
        hotelName: "",
        notes: "",
      });

      fetchItinerary(
        selectedRequestId
      );

    } catch (err) {

      console.log(err);

      toast.error(
        err.message ||
        "Failed to add itinerary"
      );

    } finally {

      setSubmitting(false);
    }
  };

  return (

  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6 space-y-6 overflow-hidden">

    {/* ================= HEADER ================= */}
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* LEFT */}
        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-3xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-4xl">

            <FaRoute />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-slate-800">

              Travel Itinerary

            </h1>

            <p className="text-slate-500 mt-2 text-lg">

              Create and view travel plans

            </p>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => setOpenForm(true)}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all duration-300 text-white px-7 py-4 rounded-2xl shadow-lg font-semibold flex items-center gap-3"
        >

          <FaPlus />

          Create Itinerary

        </button>

        {/* VIEW BUTTON */}
  <button
  onClick={() =>
    setOpenViewModal(true)
  }
  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all duration-300 text-white px-7 py-4 rounded-2xl shadow-lg font-semibold flex items-center gap-3"
>

  <FaClipboardList />

  View Itinerary

</button>

      </div>

    </div>

    {/* ================= STATS ================= */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* TOTAL DAYS */}
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500 font-medium">

              Total Days Planned

            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-3">

              {itineraries.length}

            </h2>

          </div>

          <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-3xl">

            <FaCalendarDay />

          </div>

        </div>

      </div>

      {/* LOCATIONS */}
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500 font-medium">

              Locations

            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-3">

              {
                new Set(
                  itineraries.map(
                    (i) => i.location
                  )
                ).size
              }

            </h2>

          </div>

          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-3xl">

            <FaMapMarkedAlt />

          </div>

        </div>

      </div>

      {/* HOTELS */}
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-slate-500 font-medium">

              Hotels

            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-3">

              {
                itineraries.filter(
                  (i) => i.hotelName
                ).length
              }

            </h2>

          </div>

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 text-3xl">

            <FaHotel />

          </div>

        </div>

      </div>

    </div>

    {/* ================= LIST ================= */}
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-3">

    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-2xl">

      <FaClipboardList />

    </div>

    <div>

      <h2 className="text-2xl font-bold text-slate-800">

        Day Wise Plan

      </h2>

      <p className="text-slate-500">

        Complete travel itinerary

      </p>

    </div>

  </div>

  

</div>

      {loading ? (

        <div className="flex justify-center py-16">

          <FaSpinner className="animate-spin text-5xl text-cyan-600" />

        </div>

      ) : itineraries.length === 0 ? (

        <div className="text-center py-16">

          <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl">

            <FaClipboardList />

          </div>

          <h3 className="text-2xl font-bold text-slate-700 mt-6">

            No Itinerary Added

          </h3>

          <p className="text-slate-500 mt-2">

            Create itinerary to start planning

          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {itineraries.map((item) => (

            <div
              key={item.id}
              className="rounded-3xl bg-slate-50 p-6 hover:shadow-lg transition-all"
            >

              <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center font-bold text-cyan-700">

                    {item.dayNumber}

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-slate-800">

                      Day {item.dayNumber}

                    </h3>

                    <p className="text-slate-500">

                      {item.location}

                    </p>

                  </div>

                </div>

                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">

                  {item.activity || "Activity"}

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                <div className="bg-white rounded-2xl p-5">

                  <p className="text-sm text-slate-500 mb-2">

                    Hotel

                  </p>

                  <h4 className="font-bold text-slate-800">

                    {item.hotelName || "Not Added"}

                  </h4>

                </div>

                <div className="bg-white rounded-2xl p-5">

                  <p className="text-sm text-slate-500 mb-2">

                    Notes

                  </p>

                  <h4 className="font-medium text-slate-700">

                    {item.notes || "No Notes"}

                  </h4>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

    {/* ================= MODAL ================= */}
{openForm && (

  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">

    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden"
    >

      {/* HEADER */}
      <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Add Day Plan

          </h2>

          <p className="text-slate-500 mt-1 text-sm">

            Create detailed travel schedule

          </p>

        </div>

        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="w-10 h-10 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-red-500 text-2xl transition"
        >

          ×

        </button>

      </div>

      {/* BODY */}
      <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">

        {/* REQUEST */}
        <div>

          <label className="block text-sm font-semibold mb-2 text-slate-700">

            Travel Request

          </label>

          <select
            value={selectedRequestId}
            onChange={handleRequestChange}
            required
            className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
          >

            <option value="">
              Select Request
            </option>

            {requests.map((r) => (

              <option
                key={r.id}
                value={r.id}
              >

                {r.destination} ({r.startDate} → {r.endDate})

              </option>

            ))}

          </select>

        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* DAY NUMBER */}
          <div>

            <label className="block text-sm font-semibold mb-2 text-slate-700">

              Day Number

            </label>

            <input
              type="number"
              name="dayNumber"
              value={formData.dayNumber}
              onChange={handleChange}
              className="w-full border border-slate-300 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter day"
              required
            />

          </div>

          {/* LOCATION */}
          <div>

            <label className="block text-sm font-semibold mb-2 text-slate-700">

              Location

            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-slate-300 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter location"
              required
            />

          </div>

          {/* ACTIVITY */}
          <div>

            <label className="block text-sm font-semibold mb-2 text-slate-700">

              Activity

            </label>

            <input
              type="text"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="w-full border border-slate-300 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Travel activity"
            />

          </div>

          {/* HOTEL */}
          <div>

            <label className="block text-sm font-semibold mb-2 text-slate-700">

              Hotel Name

            </label>

            <input
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              className="w-full border border-slate-300 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Hotel name"
            />

          </div>

        </div>

        {/* NOTES */}
        <div>

          <label className="block text-sm font-semibold mb-2 text-slate-700">

            Notes

          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full border border-slate-300 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Additional notes..."
          />

        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3 bg-white">

        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="border border-slate-300 px-5 py-2.5 rounded-2xl hover:bg-slate-100 transition font-medium"
        >

          Cancel

        </button>

        <button
          type="submit"
          disabled={submitting}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all text-white px-6 py-2.5 rounded-2xl font-semibold flex items-center gap-2 shadow-lg"
        >

          {submitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaPlus />
              Add Itinerary
            </>
          )}

        </button>

      </div>

    </form>

  </div>

)}

    {/* ================= VIEW ITINERARY MODAL ================= */}
{openViewModal && (

  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-5">

    <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="p-7 border-b border-slate-200 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            View Itinerary

          </h2>

          <p className="text-slate-500 mt-1">

            Select travel request

          </p>

        </div>

        <button
          onClick={() =>
            setOpenViewModal(false)
          }
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
        >

          ✕

        </button>

      </div>

      {/* BODY */}
      <div className="p-7">

        <label className="block text-sm font-semibold mb-3 text-slate-700">

          Travel Request

        </label>

        <select
          value={selectedRequestId}
          onChange={(e) => {

            handleRequestChange(e);

            setOpenViewModal(false);

            setTimeout(() => {

              document
                .getElementById("itinerary-list")
                ?.scrollIntoView({
                  behavior: "smooth",
                });

            }, 300);
          }}
          className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-500"
        >

          <option value="">
            Select Request
          </option>

          {requests.map((r) => (

            <option
              key={r.id}
              value={r.id}
            >

              {r.destination}
              {" "}
              (
              {r.startDate}
              {" "}
              →
              {" "}
              {r.endDate}
              )

            </option>

          ))}

        </select>

      </div>

    </div>

  </div>

)}
  </div>
);
};

export default Itinerary;