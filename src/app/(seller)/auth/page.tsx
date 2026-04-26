"use client";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import LoginForm from "@/components/seller/auth/login-form";
import RegisterForm from "@/components/seller/auth/register-form";
import { useState } from "react";

export default function AuthPage() {
  const [curform, setForm] = useState("Sign In");

  return (
    <>
      <Navbar />
      <div className="from-primary-blue/90 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b via-[#111D29]/100 to-[#0F191E] px-4">
        <div className="relative mt-10 w-full max-w-[551px] transition-all duration-500 ease-in-out">
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
