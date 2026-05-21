import { useEffect, useState } from "react";

import ApprovalModal from "./ApprovalModal";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";

const PendingRequests = () => {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [search, setSearch] =
    useState("");

  // ================= FETCH REQUESTS =================
  const fetchRequests = async () => {

    try {

      const res = await fetch(
        "http://localhost:8080/manager/requests"
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch requests"
        );
      }

      const data = await res.json();

      setRequests(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // ================= LOAD =================
  useEffect(() => {

    const loadData = async () => {

      await fetchRequests();
    };

    loadData();

  }, []);

  // ================= OPEN MODAL =================
  const handleReview = (
    request,
    approve
  ) => {

    setSelectedRequest({
      ...request,
      approve,
    });

    setOpenModal(true);
  };

  // ================= FILTER =================
  const filteredRequests =
    requests.filter((r) => {

      const employee =
        r.employeeName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const destination =
        r.destination
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return employee || destination;
    });

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">

            Pending Requests

          </h1>

          <p className="text-slate-500 mt-1">

            Review employee travel requests

          </p>

        </div>

        {/* SEARCH */}
        <div className="relative">

          <FaSearch className="absolute top-3 left-3 text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-10 pr-4 py-2 rounded-xl border bg-white shadow-sm outline-none focus:ring-2 focus:ring-cyan-400"
          />

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        {loading ? (

          <div className="p-10 text-center text-slate-500">

            Loading requests...

          </div>

        ) : (

          <table className="w-full">

            {/* HEADER */}
            <thead className="bg-slate-100 text-slate-700">

              <tr>

                <th className="p-4 text-left">
                  Employee
                </th>

                <th className="p-4 text-left">
                  Destination
                </th>

                <th className="p-4 text-left">
                  Purpose
                </th>

                <th className="p-4 text-left">
                  Budget
                </th>

                <th className="p-4 text-left">
                  Dates
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {filteredRequests.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="p-8 text-center text-slate-500"
                  >

                    No pending requests found

                  </td>

                </tr>

              ) : (

                filteredRequests.map((req) => (

                  <tr
                    key={req.id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    {/* EMPLOYEE */}
                    <td className="p-4 font-semibold">

                      {req.employeeName}

                    </td>

                    {/* DESTINATION */}
                    <td className="p-4">

                      {req.destination}

                    </td>

                    {/* PURPOSE */}
                    <td className="p-4">

                      {req.purpose}

                    </td>

                    {/* BUDGET */}
                    <td className="p-4">

                      ₹ {req.budget}

                    </td>

                    {/* DATES */}
                    <td className="p-4">

                      <div className="text-sm">

                        <div>
                          {req.startDate}
                        </div>

                        <div className="text-slate-400">
                          to
                        </div>

                        <div>
                          {req.endDate}
                        </div>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td className="p-4">

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                        {req.status}

                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        {/* APPROVE */}
                        <button
                          onClick={() =>
                            handleReview(
                              req,
                              true
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
                        >

                          <FaCheckCircle />

                          Approve

                        </button>

                        {/* REJECT */}
                        <button
                          onClick={() =>
                            handleReview(
                              req,
                              false
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition"
                        >

                          <FaTimesCircle />

                          Reject

                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        )}

      </div>

      {/* ================= MODAL ================= */}
      {openModal &&
        selectedRequest && (

          <ApprovalModal

            request={selectedRequest}

            onClose={() =>
              setOpenModal(false)
            }

            refreshRequests={
              fetchRequests
            }

          />
        )}

    </div>
  );
};

export default PendingRequests;