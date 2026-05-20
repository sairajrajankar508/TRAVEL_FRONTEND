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

  // SUBMIT REVIEW
  const submitReview = async () => {

    setLoading(true);

    try {

      const res = await fetch(

        `http://localhost:8080/manager/review/${request.id}`,

        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            approve: request.approve,
            comment,
          }),
        }
      );

      const msg =
        await res.text();

      alert(msg);

      refreshRequests();

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

      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[450px]">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-slate-800 mb-4">

          {request.approve
            ? "Approve Request"
            : "Reject Request"}

        </h2>

        {/* DETAILS */}
        <div className="space-y-2 text-slate-700">

          <p>

            <b>Employee:</b>{" "}
            {request.employeeName}

          </p>

          <p>

            <b>Destination:</b>{" "}
            {request.destination}

          </p>

          <p>

            <b>Budget:</b> ₹
            {request.budget}

          </p>

        </div>

        {/* COMMENT */}
        <div className="mt-5">

          <label className="block mb-2 font-medium">

            Manager Comment

          </label>

          <textarea
            rows="4"
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Add review comment..."
          />

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border hover:bg-slate-100"
          >

            Cancel

          </button>

          <button
            onClick={submitReview}
            disabled={loading}
            className={`px-5 py-2 rounded-xl text-white transition ${
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