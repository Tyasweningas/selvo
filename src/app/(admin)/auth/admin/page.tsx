"use client";

import AdminLoginForm from "@/components/admin/auth/admin-login-form";
import Footer from "@/components/global/footer";
import NavbarLanding from "@/components/global/navbar-landing";

export default function AdminAuthPage() {
  return (
    <>
      <NavbarLanding />
      <div className="from-primary-blue/90 flex min-h-screen flex-col items-center justify-center bg-linear-to-b via-[#111D29] to-[#0F191E] px-4">
        <div className="relative mt-10 w-full max-w-[551px] transition-all duration-500 ease-in-out">
          <AdminLoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
