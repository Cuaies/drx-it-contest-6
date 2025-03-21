import { Outlet } from "react-router";
import { GrCode } from "react-icons/gr";
import { Menu, Navbar } from "../components";

const GenericLayout = () => {
  return (
    <div className="sticky top-0 flex bg-white text-black dark:text-white dark:bg-gray-900">
      <div className="sticky top-0 w-1/6 md:w[8%] lg:w-[16%] xl:w-[14%] shadow-xl">
        <a
          className="logo flex items-center justify-center gap-4 !m-4"
          href="/"
        >
          <GrCode size={42} />
          <span className="hidden lg:block">DRX IT Contest 6</span>
        </a>
        <Menu />
      </div>
      <div className="w-5/6 md:w[92%] lg:w-[84%] xl:w-[86%] bg-gray-50 text-black dark:text-white dark:bg-gray-800 !px-2 !py-2">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default GenericLayout;
