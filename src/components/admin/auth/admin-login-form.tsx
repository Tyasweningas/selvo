"use client";

import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";

function AdminLoginFormContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("admin-credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok || result.error) {
        setError(result?.error || "Email atau kata sandi admin tidak valid.");
        return;
      }

      const redirectUrl = searchParams.get("redirect") || "/admin/dashboard";
      router.push(redirectUrl);
      router.refresh();
    } catch (err: unknown) {
      logError(err, "AdminLoginForm");
      setError(formatErrorForDisplay(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center rounded-2xl text-white">
      <div className="border-primary-blue bg-bg-blue mb-6 flex items-center gap-3 rounded-full border-2 px-5 py-2">
        <MdAdminPanelSettings className="text-primary-blue size-6" />
        <span className="text-primary-blue text-sm font-semibold">
          Admin Selvo
        </span>
      </div>
      <h2 className="text-primary-blue mb-[15px] text-[32px] font-semibold">
        Masuk Sebagai Admin
      </h2>
      <p className="mb-[35px] text-center text-[#ffffff]">
        Akses dashboard admin untuk mengelola platform Selvo.
      </p>

      {error && (
        <div className="mb-4 w-full rounded-lg border border-red-500 bg-red-500/20 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <div className="mb-2.5 h-[47px] w-full rounded-[25px] border border-[#363f42] bg-[#29373D]">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukan Alamat Email Admin"
            className="h-[47px] w-full rounded-[25px] border-none bg-transparent pl-10 pr-4 text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-2.5 h-[47px] w-full rounded-[25px] border border-[#363f42] bg-[#29373D]">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukan Kata Sandi Anda"
            className="h-[47px] w-full rounded-[25px] border-none bg-transparent pl-10 pr-4 text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            required
            minLength={6}
          />
        </div>
        <p className="my-[5px] flex w-full justify-end text-[#9CA3A7]">
          Lupa Kata Sandi?
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-blue hover:bg-primary-blue/80 flex h-[47px] w-full items-center justify-center gap-2 rounded-[25px] font-semibold text-[#ffffff] transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Memproses...</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginForm() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex w-full flex-col items-center justify-center rounded-2xl text-white">
          <div className="flex h-[47px] w-full items-center justify-center gap-2 rounded-[25px] bg-[#29373D]">
            <div className="border-primary-blue h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
            <span className="text-gray-400">Memuat...</span>
          </div>
        </div>
      }
    >
      <AdminLoginFormContent />
    </Suspense>
  );
}
