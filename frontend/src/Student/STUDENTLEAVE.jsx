// src/pages/StudentLeave.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";

import StudentSideBar from "./StudentSideBar";
import MainHeader from "../components/MainHeader";
import { AuthStudentContext } from "../context/StudentAuth";

const STATUSES = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function StudentLeave() {
  const { student } = useContext(AuthStudentContext);

  const [form, setForm] = useState({ from: "", to: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState(() =>
    localStorage.getItem("leave-filter") || "all"
  );

  useEffect(() => localStorage.setItem("leave-filter", filter), [filter]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v10/student-leave/");
        setRequests(Array.isArray(data) ? data : data ? [data] : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load leave requests");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const update = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    if (!form.from || !form.to || !form.reason) {
      toast.error("Please fill all fields");
      return;
    }

    if (new Date(form.from) > new Date(form.to)) {
      toast.error("Start date cannot be after end date");
      return;
    }

    if (!student?._id) {
      toast.error("Student ID missing. Please re-login.");
      return;
    }

    const payload = {
      from: form.from,
      to: form.to,
      reason: form.reason,
      student: student._id,
    };

    setSubmitting(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v10/student-leave/",
        payload
      );
      toast.success("Leave request sent!");
      setRequests((prev) => [data, ...(Array.isArray(prev) ? prev : [])]);
      setForm({ from: "", to: "", reason: "" });
    } catch (err) {
      console.error("Submission error:", err);
      const message =
        err.response?.data?.message || "Failed to submit leave request";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const visible = (Array.isArray(requests) ? requests : []).filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  const cardV = {
    initial: { rotateX: 6, rotateY: -6, opacity: 0, y: 40 },
    animate: {
      rotateX: 0,
      rotateY: 0,
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading student info…
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50">
      <Toaster position="top-right" />

      <StudentSideBar />

      <div className="flex-grow flex flex-col ml-0 lg:ml-64">
        <MainHeader />

        <div className="p-4 max-w-7xl w-full mx-auto">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 drop-shadow-sm mb-8">
            Leave Request
          </h1>

          <motion.form
            onSubmit={submit}
            className="relative bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl shadow-rose-200/40 rounded-3xl p-8 mb-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.35 } }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <label className="flex flex-col text-sm font-medium text-gray-600">
                From Date
                <input
                  type="date"
                  name="from"
                  value={form.from}
                  onChange={update}
                  required
                  className="mt-1 px-4 py-2 rounded-xl border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </label>

              <label className="flex flex-col text-sm font-medium text-gray-600">
                To Date
                <input
                  type="date"
                  name="to"
                  value={form.to}
                  onChange={update}
                  required
                  className="mt-1 px-4 py-2 rounded-xl border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </label>
            </div>

            <label className="flex flex-col text-sm font-medium text-gray-600 mt-6">
              Reason
              <textarea
                name="reason"
                rows={3}
                placeholder="I have a medical appointment…"
                value={form.reason}
                onChange={update}
                required
                className="mt-1 px-4 py-2 rounded-xl border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-fuchsia-400 resize-none"
              />
            </label>

            <motion.button
              type="submit"
              disabled={submitting || !student}
              whileTap={{ scale: 0.9 }}
              className="group relative mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-400 text-white font-semibold shadow-lg shadow-rose-300/60 focus:outline-none disabled:opacity-60"
            >
              {submitting ? (
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" /> Submit
                </>
              )}
            </motion.button>
          </motion.form>

          <div className="sticky top-2 z-30 mb-6">
            <div className="flex gap-3 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-fuchsia-200/40 rounded-full p-2 max-w-fit mx-auto">
              {STATUSES.map(({ label, value }) => (
                <motion.button
                  key={value}
                  onClick={() => setFilter(value)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ${filter === value
                    ? "bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow-md shadow-rose-300/60"
                    : "text-gray-600 hover:text-fuchsia-600"
                    }`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 pb-10">
            {loading ? (
              <div className="flex justify-center items-center col-span-full min-h-[200px]">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-fuchsia-400 border-t-transparent rounded-full animate-spin-slow" />
                  <div className="absolute top-2 left-2 w-10 h-10 border-4 border-rose-400 border-b-transparent rounded-full animate-spin-reverse-slow" />
                </div>
              </div>

            ) : visible.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No leave requests to show.
                <br />
                {filter !== "all" && (
                  <span className="text-xs">Try a different filter.</span>
                )}
              </p>
            ) : (
              visible.map((req) => (
                <motion.div
                  key={req._id}
                  variants={cardV}
                  initial="initial"
                  animate="animate"
                  className="relative group bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Status Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${req.status === "approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : req.status === "rejected"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                      }`}
                  >
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>

                  {/* Date Range */}
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">
                      {new Date(req.from).toLocaleDateString()}
                    </span>{" "}
                    &rarr;{" "}
                    <span className="font-medium text-gray-800">
                      {new Date(req.to).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Reason */}
                  <p className="text-base text-gray-700 italic border-l-4 border-fuchsia-400 pl-4 py-2 bg-gray-50 rounded-md">
                    “{req.reason}”
                  </p>

                  {/* Created At */}
                  <p className="text-xs text-right text-gray-400 mt-4">
                    Submitted on {new Date(req.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              ))

            )}
          </div>
        </div>
      </div>
    </div>
  );
}
