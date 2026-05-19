import { useState } from "react";

const CreateRequest = ({ closeModal }) => {

  const token =
    localStorage.getItem("token");

  const [form, setForm] =
    useState({

      destination: "",

      purpose: "",

      travelDate: "",

      returnDate: "",

      estimatedCost: "",

      travelMode: "FLIGHT",

      hotelRequired: false,

      description: "",
    });

  const [loading, setLoading] =
    useState(false);

  // HANDLE CHANGE
  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setForm({

      ...form,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // SUBMIT REQUEST
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(

        "http://localhost:8080/employee/request",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...form,
            status: "SUBMITTED",
          }),
        }

      );

      if (!res.ok)
        throw new Error(
          "Failed"
        );

      alert(
        "Travel request submitted successfully"
      );

      closeModal();

    } catch (err) {

      console.log(err);

      alert(
        "Failed to submit request"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      {/* MODAL */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white flex justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              ✈️ Create Travel Request

            </h2>

            <p className="text-sm opacity-80">

              Submit your travel plan for approval

            </p>

          </div>

          <button
            onClick={closeModal}
            className="text-white text-2xl"
          >
            ×
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* DESTINATION */}
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl"
          />

          {/* PURPOSE */}
          <input
            type="text"
            name="purpose"
            placeholder="Purpose"
            value={form.purpose}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl"
          />

          {/* TRAVEL DATE */}
          <input
            type="date"
            name="travelDate"
            value={form.travelDate}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl"
          />

          {/* RETURN DATE */}
          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl"
          />

          {/* COST */}
          <input
            type="number"
            name="estimatedCost"
            placeholder="Estimated Cost"
            value={form.estimatedCost}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          {/* TRAVEL MODE */}
          <select
            name="travelMode"
            value={form.travelMode}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >

            <option value="FLIGHT">

              Flight

            </option>

            <option value="TRAIN">

              Train

            </option>

            <option value="BUS">

              Bus

            </option>

          </select>

          {/* HOTEL */}
          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="hotelRequired"
              checked={form.hotelRequired}
              onChange={handleChange}
            />

            Hotel Required

          </label>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-3 rounded-xl md:col-span-2"
          />

          {/* BUTTONS */}
          <div className="md:col-span-2 flex justify-end gap-3">

            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2 border rounded-xl"
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700"
            >

              {loading
                ? "Submitting..."
                : "Submit Request"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateRequest;