"use client";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
export default function Navbar() {
  return (
    <>
       <nav className="flex flex-col w-full">
   
      <div className="flex h-[30px] w-full items-center justify-between bg-[#1D1B20] px-10 text-sm text-white">
        <ul className="flex gap-6 font-medium">
          <li><Link href="#">Help Center</Link></li>
          <li><Link href="#">Find a Store</Link></li>
          <li><Link href="#">Contact Us</Link></li>
        </ul>

        <p className="font-light">Your Favorite Digital Market</p>

        <div className="flex items-center gap-2">
          <span>🇮🇩</span>
          <p className="font-medium">Indonesia (Rupiah IDR)</p>
        </div>
      </div>

 
      <div className="flex h-[90px] w-full items-center justify-between bg-white px-10">
      
        <p className="text-3xl font-extrabold text-[#1D1B20]">SELVO</p>

      
        <div className="relative flex h-[47px] w-[700px] items-center rounded-[25px] bg-[#D9D9D9] px-4">
          <select
            className="cursor-pointer bg-transparent pr-3 font-semibold text-black outline-none"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
            <option value="planner">Planner</option>
            <option value="book">Books</option>
            <option value="code">Code</option>
          </select>

          <div className="mx-3 h-[25px] w-[1px] bg-gray-400"></div>

          <form action="/" className="flex-1">
            <input
              type="search"
              name="search"
              placeholder="What are you looking for?"
              className="h-[47px] w-full rounded-[25px] border-none bg-transparent pr-10 pl-2 text-black placeholder-gray-600 focus:outline-none"
            />
          </form>

          <button
            type="submit"
            className="absolute right-5 text-gray-700 hover:text-black"
          >
            <IoSearch size={20} />
          </button>
        </div>

 
        <div className="flex items-center gap-5 text-[#1D1B20]">
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <PiBookOpenTextDuotone size={18} />
            <p className="text-sm">Seller Guide</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <FaRegCircleUser size={18} />
            <p className="text-sm">Sign in / Register</p>
          </div>
          <button className="relative">
            <FaShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 h-[8px] w-[8px] rounded-full bg-[#1D1B20]"></span>
          </button>
        </div>
      </div>

      
      <div className="flex h-[50px] w-full items-center bg-white px-10 text-sm font-medium text-[#1D1B20]">
        <select
            className="cursor-pointer bg-transparent pr-3 font-semibold text-black outline-none"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
            <option value="planner">Planner</option>
            <option value="book">Books</option>
            <option value="code">Code</option>
          </select>
          <select
            className="cursor-pointer bg-transparent pr-3 font-semibold text-black outline-none"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
            <option value="planner">Planner</option>
            <option value="book">Books</option>
            <option value="code">Code</option>
          </select>
          <select
            className="cursor-pointer bg-transparent pr-3 font-semibold text-black outline-none"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
            <option value="planner">Planner</option>
            <option value="book">Books</option>
            <option value="code">Code</option>
          </select>
          <select
            className="cursor-pointer bg-transparent pr-3 font-semibold text-black outline-none"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
            <option value="planner">Planner</option>
            <option value="book">Books</option>
            <option value="code">Code</option>
          </select>
      </div>
    </nav>
    </>
  );
}
