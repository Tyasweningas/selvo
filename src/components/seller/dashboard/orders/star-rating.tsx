import clsx from "clsx";
import { MdStar, MdStarBorder, MdStarHalf } from "react-icons/md";

interface StarRatingProps {
  value: number;
  size?: number;
  className?: string;
  showNumber?: boolean;
}

/**
 * Tampilan bintang ulasan (read-only).
 * Menerima nilai angka 0-5 (boleh desimal). Mendukung half-star.
 */
const StarRating = ({
  value,
  size = 18,
  className,
  showNumber = false,
}: StarRatingProps) => {
  const safeValue = Math.max(0, Math.min(5, value));

  return (
    <div className={clsx("inline-flex items-center gap-1", className)}>
      <div className="text-primary-yellow flex items-center">
        {[1, 2, 3, 4, 5].map((step) => {
          if (safeValue >= step) {
            return <MdStar key={step} size={size} />;
          }
          if (safeValue >= step - 0.5) {
            return <MdStarHalf key={step} size={size} />;
          }
          return (
            <MdStarBorder
              key={step}
              size={size}
              className="text-primary-yellow/40"
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-white">
          {safeValue.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
