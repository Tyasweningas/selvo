"use client";
import AuthToggle from "./AuthToggle";
export default function LoginForm({ curform, setForm }) {
    return (
        <>
        <div className = "flex flex-col items-center justify-center mx-auto w-[551px] h-[622px] text-white rounded-2xl ">
             <AuthToggle curform={curform} setForm={setForm} />
            <h2 className="my-[30px] text-[32px] font-[600] text-[#4EBD77]">Masuk Ke Akun Kamu</h2>
            <p className="mb-[35px] text-center text-[#ffffff]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, molestias delectus? Beatae reprehenderit laborum quis asperiores.</p>
            <div className="bg-[#29373D] mb-[10px] w-[551px] h-[47px] rounded-[25px] bg-[#3f494e] border border-[#363f42]">
            <form action="/">
            <input type="email" name="email" id="" placeholder="Masukan Alamat Email Anda" className="w-[551px] h-[47px] border-none rounded-[25px] focus:outline-none pl-10" />
            </form>
           </div>
           <div className="bg-[#29373D] w-[551px] h-[47px] rounded-[25px] bg-[#3f494e] border-[#363f42] ">
            <form action="/">
            <input type="password" name="password" id="" placeholder="Masukan Kata Sandi Anda" className="w-[551px] h-[47px] border-none rounded-[25px] focus:outline-none pl-10" />
            </form>
           </div>
           <p className="my-[5px] w-full flex justify-end text-[#9CA3A7]">Lupa Kata Sandi?</p>
           <button className="bg-[#4EBD77] hover:bg-[#3FA866] text-[#ffffff] font-[600] w-[551px] h-[47px] rounded-[25px] ">Sign In</button>
           
            <div className="flex items-center my-[20px] w-full">
                <div className="flex-grow border-t border-[#48464C]"></div>
                <span className="flex-shrink mx-4 text-[#525155]">Masuk dengan?</span>
                <div className="flex-grow border-t border-[#48464C]"></div>
            </div>
         <button className="bg-[#29373D] hover:bg-[#3FA866] text-[#ffffff] font-[600] mb-[10px] w-[551px] h-[47px] rounded-[25px] border border-[#363f42]">Masuk dengan Akun Google</button> 
           <p>Tidak&apos; Memiliki akun ?{" "}
            <span className="text-[#4EBD77] cursor-pointer hover:underline">
                Daftar
            </span>
           </p>
        </div>
        </>
    )
}