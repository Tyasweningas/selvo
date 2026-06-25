import React from "react";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import HeroSection from "@/components/marketing/hero-section";
import ValueProp from "@/components/marketing/value-prop";
import FeaturesShowcase from "@/components/marketing/features-showcase";
import StatsCompany from "@/components/marketing/stats-company";
import Testimonials from "@/components/marketing/testimonials";
import ContactForm from "@/components/marketing/contact-form";

export const metadata = {
  title: "Tentang Kami - Selvo Marketplace Digital",
  description:
    "Pelajari lebih lanjut tentang Selvo, misi kami menghubungkan kreator digital lokal dengan talenta profesional, serta fitur-fitur unggulan kami.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#0F191E] text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Layout Sections */}
      <main className="relative z-10 mx-auto w-full">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Stats Component */}
        <StatsCompany />

        {/* 3. Value Proposition Component */}
        <ValueProp />

        {/* 4. Features Showcase Component */}
        <FeaturesShowcase />

        {/* 5. Testimonials Component */}
        <Testimonials />

        {/* 6. Contact Form Component */}
        <ContactForm />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
