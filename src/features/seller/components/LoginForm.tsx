"use client";
import AuthToggle from "./AuthToggle";
export default function LoginForm({ curform, setForm }) {
    return (
        <>
        <div className = "flex flex-col items-center justify-center mx-auto w-[551px] h-[622px]">
             <AuthToggle curform={curform} setForm={setForm} />
            <h2 className="my-[30px] text-[32px] font-[600] text-[#4EBD77]">Sign In to Your Account</h2>
            <p className="mb-[35px] text-center text-[#A0A0A0]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, molestias delectus? Beatae reprehenderit laborum quis asperiores.</p>
            <div className="bg-[#D9D9D9] mb-[10px] w-[551px] h-[47px] rounded-[25px] bg-[#1E2D28] border border-[#2F4F4F]">
            <form action="/">
            <input type="email" name="email" id="" placeholder="Enter your email address" className="w-[551px] h-[47px] border-none rounded-[25px] focus:outline-none pl-10" />
            </form>
           </div>
           <div className="bg-[#D9D9D9] w-[551px] h-[47px] rounded-[25px] bg-[#1E2D28] border border-[#2F4F4F] ">
            <form action="/">
            <input type="password" name="password" id="" placeholder="Enter your password" className="w-[551px] h-[47px] border-none rounded-[25px] focus:outline-none pl-10" />
            </form>
           </div>
           <p className="my-[5px] w-full flex justify-end">forgot password?</p>
           <button className="bg-[#000000] text-[#FFFFFF] font-[600] w-[551px] h-[47px] rounded-[25px] ">Sign In</button>
           
            <div className="flex items-center my-[20px] w-full">
                <div className="flex-grow border-t border-[#48464C]"></div>
                <span className="flex-shrink mx-4 text-[#48464C]">Or sign in with</span>
                <div className="flex-grow border-t border-[#48464C]"></div>
            </div>
         <button className="bg-[#FFFFFF] text-[#000000] font-[600] mb-[10px] w-[551px] h-[47px] rounded-[25px] border border-[#000000]">Sign in with Google</button> 
           <p>Don&apos;t have an account? Sign Up</p>
        </div>
        </>
    )
}