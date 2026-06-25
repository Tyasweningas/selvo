"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Input from "@/components/global/input";
import TextArea from "@/components/global/textarea";
import { FaEnvelope, FaPaperPlane, FaUser, FaTag } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(3, { message: "Nama harus minimal 3 karakter" }),
  email: z.string().email({ message: "Alamat email tidak valid" }),
  subject: z.string().min(5, { message: "Perihal harus minimal 5 karakter" }),
  message: z.string().min(10, { message: "Pesan harus minimal 10 karakter" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Contact Form Submitted:", data);
    toast.success("Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className="relative px-4 py-16 text-white sm:px-6 md:py-24">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-green/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Hubungi <span className="text-primary-blue">Kami</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-gilroy mx-auto mt-4 max-w-xl text-base text-gray-400 sm:text-lg"
          >
            Memiliki pertanyaan tentang kemitraan, perizinan aset, atau butuh bantuan teknis? Hubungi kami langsung melalui formulir di bawah ini.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-[#111D22]/80 p-6 backdrop-blur-md shadow-2xl sm:p-10"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-300">Nama Lengkap</label>
                <Input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  prefix={<FaUser className="text-gray-400" size={16} />}
                  {...register("name")}
                  className={errors.name ? "border-red-500/50" : ""}
                />
                {errors.name && (
                  <span className="text-xs font-semibold text-red-400">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-300">Alamat Email</label>
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  prefix={<FaEnvelope className="text-gray-400" size={16} />}
                  {...register("email")}
                  className={errors.email ? "border-red-500/50" : ""}
                />
                {errors.email && (
                  <span className="text-xs font-semibold text-red-400">{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-300">Perihal / Subjek</label>
              <Input
                type="text"
                placeholder="Topik pesan Anda"
                prefix={<FaTag className="text-gray-400" size={16} />}
                {...register("subject")}
                className={errors.subject ? "border-red-500/50" : ""}
              />
              {errors.subject && (
                <span className="text-xs font-semibold text-red-400">{errors.subject.message}</span>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-300">Pesan</label>
              <TextArea
                rows={5}
                placeholder="Tulis pesan atau pertanyaan Anda secara detail..."
                {...register("message")}
                className={errors.message ? "border-red-500/50" : ""}
              />
              {errors.message && (
                <span className="text-xs font-semibold text-red-400">{errors.message.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-blue py-3.5 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-blue/95 disabled:scale-100 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={16} />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
