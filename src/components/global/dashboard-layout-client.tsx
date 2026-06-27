"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import clsx from "clsx";

interface DashboardLayoutClientProps {
  appBar: React.ReactElement<{ onMenuClick?: () => void }>;
  menu: React.ReactElement<{ variant?: "sidebar" | "drawer" }>;
  children: React.ReactNode;
  bgGradientFromClass?: string;
}

const DashboardLayoutClient = ({
  appBar,
  menu,
  children,
  bgGradientFromClass = "from-primary-blue/34",
}: DashboardLayoutClientProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar drawer whenever the pathname changes (user navigated)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // Inject onMenuClick prop to the AppBar component
  const appBarWithProps = React.cloneElement(appBar, {
    onMenuClick: () => setIsSidebarOpen(true),
  });

  return (
    <main
      className={clsx(
        "custom-scrollbar h-screen overflow-auto bg-[#0F191E] bg-linear-to-b to-[#0F191E]",
        bgGradientFromClass
      )}
    >
      {/* Header */}
      {appBarWithProps}

      <div className="container mx-auto flex flex-col lg:flex-row gap-5 px-4 md:px-6 py-6 lg:py-10">
        {/* Desktop Sidebar (Left side, hidden on mobile/tablet) */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          {React.cloneElement(menu, { variant: "sidebar" })}
        </aside>

        {/* Main Content Area */}
        <div className="min-w-0 grow">{children}</div>
      </div>

      {/* Mobile Drawer Overlay & Content */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-72 bg-[#0F191E] p-6 shadow-xl border-r border-[#29373D] transition-transform duration-300 lg:hidden flex flex-col overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-6 shrink-0">
          <p className="text-xl font-bold text-white">Menu Navigasi</p>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-[#29373D] transition"
            aria-label="Close menu"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Render menu with 'drawer' variant for mobile layout */}
        <div className="grow">
          {React.cloneElement(menu, { variant: "drawer" })}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayoutClient;
