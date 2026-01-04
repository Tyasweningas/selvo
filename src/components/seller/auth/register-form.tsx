"use client";

import { formatErrorForDisplay, logError } from "@/lib/error-handler";
import authService from "@/services/auth.service";
import { AuthFormProps } from "@/types/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthToggle from "./auth-toggle";

export default function RegisterForm({ curform, setForm }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.register({
        email,
        password,
        name: name || undefined,
      });

      // After successful registration, redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      logError(err, "RegisterForm");
      setError(formatErrorForDisplay(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto flex w-[551px] flex-col items-center justify-center">
        <AuthToggle curform={curform} setForm={setForm} />
        <h2 className="my-[30px] text-[32px] font-[600] text-[#4EBD77]">
          Buat Akun Gratis
        </h2>
        <p className="mb-[35px] text-center text-[#ffffff]">
          Daftar sekarang untuk mulai berjualan di platform Selvo.
        </p>

        <div className="my-[20px] flex w-full items-center">
          <div className="flex-grow border-t border-[#48464C]"></div>
          <span className="mx-4 flex-shrink text-[#9CA3A7]">
            Daftar dengan email
          </span>
          <div className="flex-grow border-t border-[#48464C]"></div>
        </div>

        {error && (
          <div className="mb-4 w-[551px] rounded-lg border border-red-500 bg-red-500/20 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center"
        >
          <div className="mb-[10px] h-[47px] w-[551px] rounded-[25px] border border-[#363f42] bg-[#3f494e] bg-[#29373D] text-[#9CA3A7]">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukan Nama Anda (Opsional)"
              className="h-[47px] w-[551px] rounded-[25px] border-none bg-transparent pl-10 text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            />
          </div>
          <div className="mb-[10px] h-[47px] w-[551px] rounded-[25px] border border-[#363f42] bg-[#3f494e] bg-[#29373D] text-[#9CA3A7]">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukan Alamat Email Anda"
              className="h-[47px] w-[551px] rounded-[25px] border-none bg-transparent pl-10 text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              required
            />
          </div>
          <div className="mb-[10px] h-[47px] w-[551px] rounded-[25px] border border-[#363f42] bg-[#3f494e] bg-[#29373D] text-[#9CA3A7]">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukan Kata Sandi (Min. 6 karakter)"
              className="h-[47px] w-[551px] rounded-[25px] border-none bg-transparent pl-10 text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-[10px] flex h-[47px] w-[551px] items-center justify-center gap-2 rounded-[25px] bg-[#4EBD77] font-[600] text-[#ffffff] transition-all hover:bg-[#3FA866] disabled:cursor-not-allowed disabled:opacity-50"
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
                <span>Mendaftar...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-[20px] text-[#ffffff]">
          Sudah punya akun?{" "}
          <span
            className="cursor-pointer text-[#4EBD77] hover:underline"
            onClick={() => setForm("Sign In")}
          >
            Masuk
          </span>
        </p>
      </div>
    </>
  );
}
