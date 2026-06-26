"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AuthToggle({
  curform,
  setForm,
}: {
  curform: string;
  setForm: (val: string) => void;
}) {
  return (
    <div className="relative flex items-center bg-[#29373D] border border-gray-200/20 rounded-full p-1.5 w-[220px] shadow-lg">
      {/* Buttons */}
      <button
        onClick={() => setForm("Sign In")}
        className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-full transition-colors duration-300 cursor-pointer ${
          curform === "Sign In"
            ? "text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Masuk
      </button>

      <button
        onClick={() => setForm("Sign Up")}
        className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-full transition-colors duration-300 cursor-pointer ${
          curform === "Sign Up"
            ? "text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Daftar
      </button>

      {/* Sliding background */}
      <motion.div
        layoutId="authTabIndicator"
        className="absolute top-1.5 bottom-1.5 rounded-full bg-black"
        style={{
          left: curform === "Sign In" ? "6px" : "calc(50% + 2px)",
          width: "calc(50% - 8px)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    </div>
  );
}
