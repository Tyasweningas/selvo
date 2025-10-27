"use client";

import AuthToggle from "./AuthToggle";
export default function RegisterForm({ curform, setForm }) {
    return (
        <>
        <div className = "flex flex-col items-center justify-center mx-auto w-[551px] h-[622px]">
            <AuthToggle curform={curform} setForm={setForm} />
            <h2 className="my-[30px] text-[32px] font-[600] text-[#4EBD77]">Create a free account</h2>
            <p className="mb-[35px] text-center text-[#ffffff] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, molestias delectus? Beatae reprehenderit laborum quis asperiores.</p>
             <button className="bg-[#4EBD77] hover:bg-[#3FA866] text-[#ffffff] font-[600] mb-[10px] w-[551px] h-[47px] rounded-[25px] border border-[#000000]">Continue with Google</button> 
              <div className="flex items-center my-[20px] w-full">
                <div className="flex-grow border-t border-[#48464C]"></div>
                <span className="flex-shrink mx-4 text-[#9CA3A7]">Or use email</span>
                <div className="flex-grow border-t border-[#48464C]"></div>
            </div>
            
            
            <div className="bg-[#29373D] mb-[10px] w-[551px] h-[47px] rounded-[25px] bg-[#3f494e] border-[#363f42] text-[#9CA3A7] ">
            <form action="/">
            <input type="email" name="email" id="" placeholder="Enter your email address" className="w-[551px] h-[47px] border-none rounded-[25px] focus:outline-none pl-10" />
            </form>
           </div>
           <div className="bg-[#29373D] w-[551px] h-[47px] rounded-[25px] bg-[#3f494e] border-[#363f42] text-[#9CA3A7] ">
            <form action="/">
            <input type="password" name="password" id="" placeholder="Enter your password" className="w-[551px] h-[47px] border-none rounded-[25px] focus:outline-none pl-10" />
            </form>
           </div>
           <p className="my-[5px] w-full flex justify-end text-[#9CA3A7]">Lupa Kata Sandi?</p>
           <button className="bg-[#29373D] hover:bg-[#3FA866] text-[#ffffff] font-[600] w-[551px] h-[47px] rounded-[25px] ">Sign Up</button>
           
           <p className="text-[#ffffff]">sudah punya akun?{" "}
            <span className="text-[#4EBD77] cursor-pointer hover:underline">
                Masuk
            </span>
           </p>
        </div>
        
        </>
    )
}