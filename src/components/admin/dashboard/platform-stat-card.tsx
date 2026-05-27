import { ReactNode } from "react";

interface PlatformStatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  helper?: string;
  accent?: "blue" | "yellow";
}

const PlatformStatCard = ({
  icon,
  title,
  value,
  helper,
  accent = "blue",
}: PlatformStatCardProps) => {
  const accentClass =
    accent === "yellow" ? "text-primary-yellow" : "text-primary-blue";

  return (
    <div className="border-bg-blue from-primary-blue/25 to-bg-nav/70 grow space-y-5 rounded-xl border-2 bg-linear-to-b p-8">
      <div className="flex items-center gap-3">
        <div className="bg-bg-nav rounded-xl p-3">{icon}</div>
        <p className="text-2xl font-bold text-white">{title}</p>
      </div>
      <p className="text-5xl font-bold text-white">
        <span className={`mr-3 ${accentClass}`}>IDR</span>
        {value}
      </p>
      {helper && <p className="text-sm text-[#D9D9D9]">{helper}</p>}
    </div>
  );
};

export default PlatformStatCard;
