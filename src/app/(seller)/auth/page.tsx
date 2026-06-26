"use client";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import LoginForm from "@/components/seller/auth/login-form";
import RegisterForm from "@/components/seller/auth/register-form";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AuthPage() {
  const [curform, setForm] = useState("Sign In");

  return (
    <>
      <Navbar />
      <div className="from-primary-blue/90 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b via-[#111D29]/100 to-[#0F191E] px-4 pt-24 pb-12">
        <div className="relative mt-10 w-full max-w-[551px] transition-all duration-500 ease-in-out">
          <AnimatePresence mode="wait">
            {curform === "Sign In" ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full"
              >
                <LoginForm curform={curform} setForm={setForm} />
              </motion.div>
            ) : (
              <motion.div
                key="register-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full"
              >
                <RegisterForm curform={curform} setForm={setForm} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
