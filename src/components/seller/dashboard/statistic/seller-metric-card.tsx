import { ReactNode } from "react";

interface props {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
  footerText?: string;
}

const SellerMetricCard = (props: props) => {
  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-4 p-5 shadow-[0_10px_0_#1a2b32]">
      <div className="flex items-center gap-3">
        {props.icon}
        <p className="text-white">{props.title}</p>
      </div>
      <div className="py-3">{props.children}</div>
      <p className="text-xs text-[#D9D9D9]">{props.footerText}</p>
    </div>
  );
};

export default SellerMetricCard;
