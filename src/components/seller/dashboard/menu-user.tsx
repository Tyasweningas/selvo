import { MdPerson } from "react-icons/md";

const MenuUser = () => {
  return (
    <div className="border-primary-blue bg-bg-blue flex items-center gap-3 rounded-3xl border-2 p-5">
      <div className="bg-primary-blue rounded-full p-2">
        <MdPerson size={32} className="text-white" />
      </div>
      <div>
        <p className="font-bold text-white">Bayu Maulana</p>
        <p className="text-xs text-white">bayufransdo@gmail.com</p>
      </div>
    </div>
  );
};

export default MenuUser;
