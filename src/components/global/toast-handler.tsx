"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

export function ToastHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const message = Cookies.get("toast-message");
    const type = Cookies.get("toast-type") as
      | "success"
      | "error"
      | "info"
      | "warning"
      | undefined;

    if (message) {
      switch (type) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "warning":
          toast.warning(message);
          break;
        case "info":
          toast.info(message);
          break;
        default:
          toast(message);
      }

      Cookies.remove("toast-message");
      Cookies.remove("toast-type");
    }
  }, [pathname]); // Re-check on every route change

  return null;
}
