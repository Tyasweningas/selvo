"use client";
import React from "react";

export default function AuthToggle({
  curform,
  setForm,
}: {
  curform: string;
  setForm: (val: string) => void;
}) {
  return (
    <div className="relative flex items-center bg-gray-100 border border-gray-200 rounded-full p-1 w-[220px] shadow-sm">
      {/* Sliding background */}
      <div
        className={`absolute top-1 bottom-1 w-[105px] bg-black rounded-full transition-transform duration-300 ease-in-out ${
          curform === "Sign In" ? "translate-x-0" : "translate-x-[110px]"
        }`}
      ></div>

      {/* Buttons */}
      <button
        onClick={() => setForm("Sign In")}
        className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
          curform === "Sign In"
            ? "text-white"
            : "text-gray-600 hover:text-black"
        }`}
      >
        Sign In
      </button>

      <button
        onClick={() => setForm("Sign Up")}
        className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
          curform === "Sign Up"
            ? "text-white"
            : "text-gray-600 hover:text-black"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}
