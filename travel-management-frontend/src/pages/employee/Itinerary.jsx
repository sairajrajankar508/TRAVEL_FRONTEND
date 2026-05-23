import {
  useEffect,
  useState,
  useCallback,
} from "react";

import toast from "react-hot-toast";

import {
  FaMapMarkedAlt,
  FaHotel,
  FaClipboardList,
  FaPlus,
  FaRoute,
  FaCalendarDay,
  FaSpinner,
} from "react-icons/fa";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

const Itinerary = () => {

  // ================= ROUTE PARAM =================
  const { requestId } = useParams();
  console.log(
  "Current Request ID:",
  requestId
);

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  // ================= STATES =================
  const [itineraries, setItineraries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [formData, setFormData] =
    useState({
      dayNumber: "",
      location: "",
      activity: "",
      hotelName: "",
      notes: "",
    });

  // ================= FETCH ITINERARY =================
  const fetchItinerary =
    useCallback(async () => {

      try {

        if (!requestId) {
          setLoading(false);
          return;
        }

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

    }, [requestId, token]);

  // ================= LOAD =================
useEffect(() => {

  if (!requestId) {

    toast.error(
      "Invalid Travel Request"
    );

    navigate("/employee");

    return;
  }

  fetchItinerary();

}, [
  requestId,
  fetchItinerary,
  navigate,
]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= ADD ITINERARY =================
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (!requestId) {

      toast.error(
        "Travel Request ID missing"
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
        parseInt(requestId),
    };

    console.log(payload);

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

    await fetchItinerary();

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

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Travel Itinerary
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Create and manage your day-wise travel plan
            </p>

          </div>

          <div className="bg-cyan-100 text-cyan-700 px-6 py-4 rounded-2xl font-bold text-lg shadow-sm">

  Request ID:
  {" "}

  {requestId || "Unavailable"}

</div>

        </div>

      </div>

      {/* TOP STATS */}
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
                Locations Covered
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {
                  new Set(
                    itineraries.map(
                      (i) =>
                        i.location
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
                Hotels Planned
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {
                  itineraries.filter(
                    (i) =>
                      i.hotelName
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

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-2xl">
            <FaPlus />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Add Day Plan
            </h2>

            <p className="text-slate-500">
              Create detailed travel schedule
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="number"
              name="dayNumber"
              value={formData.dayNumber}
              onChange={handleChange}
              placeholder="Day Number"
              required
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="text"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              placeholder="Activity"
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              placeholder="Hotel Name"
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

          </div>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            rows="4"
            className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all text-white px-8 py-4 rounded-2xl shadow-lg font-semibold flex items-center gap-3"
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

        </form>

      </div>

      {/* LIST */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center gap-3 mb-8">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-2xl">
            <FaRoute />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Day Wise Travel Plan
            </h2>

            <p className="text-slate-500">
              Your complete itinerary schedule
            </p>

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

          </div>

        ) : (

          <div className="space-y-6">

            {itineraries.map(
              (item) => (

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
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default Itinerary;