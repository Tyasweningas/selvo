import { MdMail, MdNotifications, MdPerson } from "react-icons/md";
import TopBanner from "./top-banner";

const SellerAppBar = () => {
  return (
    <>
      <TopBanner variant="green" />
      <nav className="bg-[linear-gradient(to_bottom,_#111D22_0%,_#111D22_40%,_rgba(17,29,34,0.7)_100%)] py-8">
        {/* <nav className="bg-primary-green/70 bg-gradient-to-b from-[#111D22] to-[#111D22]/70 py-8"> */}
        <div className="container mx-auto flex flex-row items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-primary-green text-5xl font-extrabold">SELVO</p>
            <p className="text-primary-green text-lg">Seller.</p>
          </div>

          <div className="flex grow justify-between">
            <div className="grow pl-16">
              <input
                type="text"
                placeholder="Cari Sesuatu..."
                className="w-[600px] rounded-full border-2 border-[#29373D] bg-[#1A2B32] px-5 py-2.5 text-[#9CA3A7] focus:outline-none"
              />
            </div>
            <div className="flex w-fit gap-5">
              <div className="grid place-items-center rounded-xl bg-[#29373D] px-3">
                <MdNotifications size={24} className="text-[#9CA3A7]" />
              </div>
              <div className="grid place-items-center rounded-xl bg-[#29373D] px-3">
                <MdMail size={24} className="text-[#9CA3A7]" />
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-24">
            <div className="mx-auto h-12 w-0.5 rounded-full bg-[#29373D]"></div>
          </div>
          {/* Separator */}

          <div className="">
            <button className="border-primary-green flex items-center gap-3 rounded-full border-2 bg-[#1A2B32] px-3 py-1.5">
              <div className="rounded-full bg-[#204E31] p-1.5">
                <MdPerson size={24} className="text-primary-green" />
              </div>
              <p className="text-primary-green text-sm font-semibold">
                John Doe
              </p>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SellerAppBar;
