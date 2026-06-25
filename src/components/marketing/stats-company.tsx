"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

function Counter({ value, suffix, label, duration = 1500 }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  // Format decimal values like 98.4%
  const displayValue = suffix === "%" ? (count / 10).toFixed(1) : count.toLocaleString();

  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold tracking-tight text-primary-blue sm:text-5xl lg:text-6xl">
        {displayValue}
        {suffix}
      </p>
      <p className="font-gilroy mt-2 text-sm font-medium text-gray-400 sm:text-base">
        {label}
      </p>
    </div>
  );
}

export default function StatsCompany() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#111D22]/60 py-16 text-white backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Counter value={1250} suffix="+" label="Total Aset Kreatif" />
          <Counter value={460} suffix="+" label="Kreator Terdaftar" />
          <Counter value={8900} suffix="+" label="Aset Diunduh" />
          <Counter value={984} suffix="%" label="Tingkat Kepuasan" />
        </div>
      </motion.div>
    </section>
  );
}
