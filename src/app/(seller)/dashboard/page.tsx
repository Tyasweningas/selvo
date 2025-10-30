import { redirect, RedirectType } from "next/navigation";

export default function SellerDashboardPage() {
  return redirect("/dashboard/statistic", RedirectType.replace);
}
