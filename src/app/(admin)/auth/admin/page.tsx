"use client";

import AdminLoginForm from "@/components/admin/auth/admin-login-form";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { motion } from "framer-motion";

export default function AdminAuthPage() {
  return (
    <>
      <Navbar />
      <div className="from-primary-blue/90 flex min-h-screen flex-col items-center justify-center bg-linear-to-b via-[#111D29] to-[#0F191E] px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative mt-10 w-full max-w-[551px]"
        >
          <AdminLoginForm />
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
