import { ReactNode } from "react";

interface props {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
  footerText?: string;
}

const SellerMetricCard = (props: props) => {
  return (
    <div className="border-bg-div bg-bg-nav rounded-xl border-2 p-3 shadow-[0_6px_0_#1a2b32] sm:border-4 sm:p-5 sm:shadow-[0_10px_0_#1a2b32]">
      <div className="flex items-center gap-2 sm:gap-3">
        {props.icon}
        <p className="text-xs font-medium text-white sm:text-base">
          {props.title}
        </p>
      </div>
      <div className="py-2 sm:py-3">{props.children}</div>
      <p className="text-[10px] leading-tight text-[#D9D9D9] sm:text-xs sm:leading-normal">
        {props.footerText}
      </p>
    </div>
  );
};

export default SellerMetricCard;
