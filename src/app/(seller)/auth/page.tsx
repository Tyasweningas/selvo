"use client";
import React, { useState } from "react";
import LoginForm from "@/features/seller/components/LoginForm";
import RegisterForm from "@/features/seller/components/RegisterForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function AuthPage() {
  const [curform, setForm] = useState("Sign In");

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center bg-white px-4 min-h-screen">
      <div className="relative w-full max-w-[551px] mt-10 transition-all duration-500 ease-in-out">
        {curform === "Sign In" ? (
          <LoginForm curform={curform} setForm={setForm} />
        ) : (
          <RegisterForm curform={curform} setForm={setForm} />
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
