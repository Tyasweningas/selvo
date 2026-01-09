import PaymentHeader from "@/components/customer/payment/payment-header";
import AuthPage from "./(seller)/auth/page";
import Footer from "@/components/global/footer";
import ProductCard from "@/components/global/product-card-landing";
import NavbarLanding from "@/components/global/navbar-landing";
import Navbar from "@/components/global/navbar";
import LandingPage from "./landing-page/page";
import { redirect } from 'next/navigation';


// export default function Home() {
//   return (
//     <>
//       redirect('/landing-page');
//     </>
//   )
// }

// app/page.tsx

export default function Home() {
  redirect("/landing-page");
  return null;
}

