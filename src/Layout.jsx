import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
export default function Layout() {
  return (
    <div className="flex flex-col  mx-auto">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
