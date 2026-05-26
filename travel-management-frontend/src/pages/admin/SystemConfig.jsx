import { useState } from "react";

import toast from "react-hot-toast";

import {
  FaCog,
  FaSave,
  FaBell,
  FaLock,
  FaGlobe,
  FaMoneyBillWave,
  FaDatabase,
  FaShieldAlt,
  FaSyncAlt,
  FaCheckCircle,
} from "react-icons/fa";

const SystemConfig = () => {

  const [loading, setLoading] = useState(false);

  const [config, setConfig] = useState({

    companyName: "Travel Management System",

    supportEmail: "support@travel.com",

    currency: "INR",

    timezone: "Asia/Kolkata",

    autoApprovalLimit: 10000,

    enableNotifications: true,

    enableAuditLogs: true,

    maintenanceMode: false,

    passwordExpiryDays: 90,

    sessionTimeout: 30,
  });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setConfig({
      ...config,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // ================= SAVE CONFIG =================

  const handleSave = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // ================= API CALL =================
      // Example:
      // await updateSystemConfig(config)

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      toast.success(
        "System configuration updated successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update configuration"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-4">

              <FaCog className="text-cyan-600" />

              System Configuration

            </h1>

            <p className="text-slate-500 mt-3 text-lg">

              Configure global system settings, security policies,
              notifications and platform preferences

            </p>

          </div>

          <div className="bg-green-50 border border-green-200 px-6 py-4 rounded-2xl flex items-center gap-4">

            <FaCheckCircle className="text-green-600 text-2xl" />

            <div>

              <p className="font-bold text-green-700">
                System Status
              </p>

              <p className="text-green-600 text-sm">
                Operational
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= SETTINGS FORM ================= */}

      <form
        onSubmit={handleSave}
        className="space-y-8"
      >

        {/* ================= GENERAL SETTINGS ================= */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="p-6 border-b border-slate-200 flex items-center gap-3">

            <FaGlobe className="text-blue-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-800">
              General Settings
            </h2>

          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputField
              label="Company Name"
              name="companyName"
              value={config.companyName}
              onChange={handleChange}
            />

            <InputField
              label="Support Email"
              name="supportEmail"
              type="email"
              value={config.supportEmail}
              onChange={handleChange}
            />

            <SelectField
              label="Currency"
              name="currency"
              value={config.currency}
              onChange={handleChange}
              options={[
                "INR",
                "USD",
                "EUR",
                "GBP",
              ]}
            />

            <SelectField
              label="Timezone"
              name="timezone"
              value={config.timezone}
              onChange={handleChange}
              options={[
                "Asia/Kolkata",
                "UTC",
                "America/New_York",
                "Europe/London",
              ]}
            />

          </div>

        </div>

        {/* ================= TRAVEL SETTINGS ================= */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="p-6 border-b border-slate-200 flex items-center gap-3">

            <FaMoneyBillWave className="text-green-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-800">
              Travel Policy Settings
            </h2>

          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputField
              label="Auto Approval Limit"
              name="autoApprovalLimit"
              type="number"
              value={config.autoApprovalLimit}
              onChange={handleChange}
            />

            <InputField
              label="Session Timeout (Minutes)"
              name="sessionTimeout"
              type="number"
              value={config.sessionTimeout}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ================= SECURITY SETTINGS ================= */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="p-6 border-b border-slate-200 flex items-center gap-3">

            <FaShieldAlt className="text-red-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-800">
              Security Settings
            </h2>

          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputField
              label="Password Expiry (Days)"
              name="passwordExpiryDays"
              type="number"
              value={config.passwordExpiryDays}
              onChange={handleChange}
            />

            <ToggleField
              icon={<FaLock />}
              label="Enable Audit Logs"
              name="enableAuditLogs"
              checked={config.enableAuditLogs}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ================= NOTIFICATION SETTINGS ================= */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="p-6 border-b border-slate-200 flex items-center gap-3">

            <FaBell className="text-yellow-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-800">
              Notification Settings
            </h2>

          </div>

          <div className="p-8 space-y-6">

            <ToggleField
              icon={<FaBell />}
              label="Enable System Notifications"
              name="enableNotifications"
              checked={config.enableNotifications}
              onChange={handleChange}
            />

            <ToggleField
              icon={<FaDatabase />}
              label="Enable Maintenance Mode"
              name="maintenanceMode"
              checked={config.maintenanceMode}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 flex justify-end gap-4">

          <button
            type="button"
            className="px-6 py-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all font-semibold"
          >

            <FaSyncAlt className="inline mr-2" />

            Reset

          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-linear-to-r from-cyan-600 to-blue-700 hover:scale-105 transition-all duration-300 text-white px-8 py-3 rounded-2xl shadow-lg font-semibold flex items-center gap-3 disabled:opacity-50"
          >

            <FaSave />

            {loading
              ? "Saving..."
              : "Save Configuration"}

          </button>

        </div>

      </form>

    </div>
  );
};

export default SystemConfig;

/* ================= INPUT FIELD ================= */

const InputField = ({
  label,
  ...props
}) => (

  <div>

    <label className="block text-sm font-semibold text-slate-700 mb-2">

      {label}

    </label>

    <input
      {...props}
      className="w-full border border-slate-300 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
    />

  </div>
);

/* ================= SELECT FIELD ================= */

const SelectField = ({
  label,
  options,
  ...props
}) => (

  <div>

    <label className="block text-sm font-semibold text-slate-700 mb-2">

      {label}

    </label>

    <select
      {...props}
      className="w-full border border-slate-300 rounded-2xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
    >

      {options.map((option) => (

        <option
          key={option}
          value={option}
        >

          {option}

        </option>
      ))}

    </select>

  </div>
);

/* ================= TOGGLE FIELD ================= */

const ToggleField = ({
  icon,
  label,
  name,
  checked,
  onChange,
}) => (

  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-5">

    <div className="flex items-center gap-4">

      <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-xl">

        {icon}

      </div>

      <div>

        <h3 className="font-bold text-slate-800">

          {label}

        </h3>

      </div>

    </div>

    <label className="relative inline-flex items-center cursor-pointer">

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />

      <div className="w-14 h-7 bg-slate-300 rounded-full peer peer-checked:bg-cyan-600 transition-all"></div>

      <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-7"></div>

    </label>

  </div>
);