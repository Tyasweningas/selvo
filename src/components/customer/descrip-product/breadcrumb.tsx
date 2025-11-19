"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

type BreadcrumbProps = {
  items?: string[]; 
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  const [offset, setOffset] = useState(0);

  
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      const updateOffset = () => {
        setOffset(navbar.getBoundingClientRect().height);
      };

      updateOffset();
      window.addEventListener("resize", updateOffset);
      return () => window.removeEventListener("resize", updateOffset);
    }
  }, []);

  
  if (items && items.length > 0) {
    return (
      <div style={{ paddingTop: offset + 16 }}>
        <div className="bg-[#0F1624] mb-8 p-4 rounded-xl flex items-center gap-3 text-gray-400 text-sm shadow-lg">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className={`cursor-pointer ${
                  i === items.length - 1 ? "text-white font-semibold" : ""
                }`}
              >
                {item}
              </span>
              {i < items.length - 1 && <span>›</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const paths = pathSegments.map((segment, i) => ({
    label: decodeURI(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    href: "/" + pathSegments.slice(0, i + 1).join("/")
  }));

  return (
    <div style={{ paddingTop: offset + 16 }}>
      <div className="bg-[#0F1624] mb-8 p-4 rounded-xl flex items-center gap-3 text-gray-400 text-sm shadow-lg">
        {/* Beranda */}
        <Link
          href="/"
          className={`cursor-pointer hover:text-white transition ${
            pathSegments.length === 0 ? "text-white font-semibold" : ""
          }`}
        >
          Beranda
        </Link>

        {pathSegments.length > 0 && <span>›</span>}

        
        {paths.map((seg, index) => (
          <div key={index} className="flex items-center gap-3">
            <Link
              href={seg.href}
              className={`cursor-pointer hover:text-white transition ${
                index === paths.length - 1 ? "text-white font-semibold" : ""
              }`}
            >
              {seg.label}
            </Link>

            {index < paths.length - 1 && <span>›</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
