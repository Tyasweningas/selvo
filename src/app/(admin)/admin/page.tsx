import { redirect, RedirectType } from "next/navigation";

export default function AdminRootPage() {
  return redirect("/admin/dashboard", RedirectType.replace);
}
