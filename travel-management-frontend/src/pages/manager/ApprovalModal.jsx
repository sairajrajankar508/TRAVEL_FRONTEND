import { useState } from "react";

const ApprovalModal = ({
  request,
  onClose,
  refreshRequests,
}) => {

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!request) return null;

  // ================= SUBMIT REVIEW =================
  const submitReview = async () => {

    try {

      setLoading(true);

      const res = await fetch(

        `http://localhost:8080/manager/review/${request.id}?approve=${request.approve}&comment=${encodeURIComponent(comment)}`,

        {
          method: "PUT",
        }
      );

      const msg =
        await res.text();

      if (!res.ok) {
        throw new Error(msg);
      }

      alert(msg);

      // REFRESH LIST
      await refreshRequests();

      // CLOSE MODAL
      onClose();

    } catch (err) {

      console.log(err);

      alert("Review failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md">

        {/* HEADER */}
        <div className="mb-5">

          <h2 className="text-2xl font-bold text-slate-800">

            {request.approve
              ? "Approve Request"
              : "Reject Request"}

          </h2>

          <p className="text-slate-500 mt-1">

            Review employee request

          </p>

        </div>

        {/* DETAILS */}
        <div className="bg-slate-50 rounded-xl p-4 mb-5 space-y-2">

          <p>
            <span className="font-semibold">
              Employee:
            </span>

            {" "}
            {request.employeeName}
          </p>

          <p>
            <span className="font-semibold">
              Destination:
            </span>

            {" "}
            {request.destination}
          </p>

          <p>
            <span className="font-semibold">
              Purpose:
            </span>

            {" "}
            {request.purpose}
          </p>

          <p>
            <span className="font-semibold">
              Budget:
            </span>

            {" "}
            ₹ {request.budget}
          </p>

        </div>

        {/* COMMENT */}
        <div className="mb-5">

          <label className="block mb-2 font-medium">

            Manager Comment

          </label>

          <textarea
            rows="4"
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Add review comment..."
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-xl hover:bg-slate-100"
          >

            Cancel

          </button>

          <button
            onClick={submitReview}
            disabled={loading}
            className={`px-5 py-2 rounded-xl text-white ${
              request.approve
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >

            {loading
              ? "Processing..."
              : request.approve
              ? "Approve"
              : "Reject"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default ApprovalModal;