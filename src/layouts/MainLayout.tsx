import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Search from "../components/ui/Search";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="bg-blue-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="relative w-full flex justify-end">
        <Search />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
