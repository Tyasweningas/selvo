"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";

interface DropdownItem {
  name: string;
  path: string;
}

interface props {
  name: string;
  icon: ReactNode;
  open?: boolean;
  path: string;
  currentPath: string;
  dropdownItems?: DropdownItem[];
}

const MenuNavItem = ({
  open = false,
  path,
  name,
  icon,
  dropdownItems = [],
  currentPath,
}: props) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (currentPath.startsWith(path)) {
      setIsOpen(true);
    }
  }, [path, currentPath]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const isButtonNavActive = currentPath.startsWith(path);

  const buttonNav = (
    <button
      className={clsx(
        "flex w-full cursor-pointer items-center justify-between border-l-4 px-5 py-2 transition-colors duration-200",
        isButtonNavActive && "border-primary-green bg-bg-green",
        !isButtonNavActive && "border-transparent",
      )}
      onClick={toggleOpen}
    >
      <div
        className={clsx(
          "flex items-center gap-3",
          isButtonNavActive && "text-primary-green",
        )}
      >
        <div
          className={clsx(
            isButtonNavActive ? "text-primary-green" : "text-white",
          )}
        >
          {icon}
        </div>
        <p
          className={clsx(
            "font-semibold",
            isButtonNavActive ? "text-primary-green" : "text-white",
          )}
        >
          {name}
        </p>
      </div>
      {dropdownItems.length > 0 && (
        <MdArrowDropUp
          className={clsx(
            "size-6 transition-transform duration-200",
            isButtonNavActive ? "text-primary-green" : "text-white",
            isOpen ? "rotate-0" : "rotate-180",
          )}
        />
      )}
    </button>
  );

  const linkNav = (
    <Link
      href={path}
      className={clsx(
        "hover:bg-bg-green group hover:border-primary-green block w-full cursor-pointer items-center justify-between border-l-4 px-5 py-2 transition-colors duration-200",
        currentPath === path && "border-primary-green bg-bg-green",
        currentPath !== path && "border-transparent",
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-3",
          currentPath === path && "text-primary-green",
        )}
      >
        <div
          className={clsx(
            "group-hover:text-primary-green",
            currentPath === path ? "text-primary-green" : "text-white",
          )}
        >
          {icon}
        </div>
        <p
          className={clsx(
            "group-hover:text-primary-green font-semibold",
            currentPath === path ? "text-primary-green" : "text-white",
          )}
        >
          {name}
        </p>
      </div>
    </Link>
  );

  return (
    <div>
      {/* Dropdown Items */}
      {dropdownItems.length > 0 ? buttonNav : linkNav}
      {dropdownItems.length > 0 && (
        <div
          className={clsx(
            "overflow-hidden px-5 transition-all duration-300",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {dropdownItems.map((item, index) => (
            <div key={item.path} className="flex items-center gap-3 pl-3">
              <div className="bg-primary-green relative size-1.5 rounded-full">
                {index < dropdownItems.length - 1 && (
                  <div className="bg-bg-green absolute bottom-0 left-1/2 h-8 w-0.5 -translate-x-1/2 translate-y-full"></div>
                )}
              </div>
              <Link href={item.path}>
                <p
                  className={clsx(
                    "hover:text-primary-green py-2 text-sm transition-colors duration-200",
                    currentPath === item.path
                      ? "text-primary-green"
                      : "text-bg-green",
                  )}
                >
                  {item.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuNavItem;
